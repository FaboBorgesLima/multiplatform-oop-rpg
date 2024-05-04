import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Player } from "./player.model";
import { PlayerStorageI } from "./playerStorage.interface";
import { PlayerInStorage } from "./playerInStorage.model";
import { PlayerInMysql } from "./playerInMysql.model";
import { Challenger } from "./challenger.model";
import { Resources } from "./resources.model";
import { Trench } from "./trench.model";
import { CardDeck } from "./cardDeck.model";
import { createHmac, randomBytes } from "crypto";
import { PlayerMysqlSchemaI } from "./playerMysqlScrema.interface";

export class PlayerMysql implements PlayerStorageI {
    constructor(private conn: Connection) {}

    async readAPIKey(apiKey: string): Promise<PlayerInStorage | undefined> {
        const [[player]] = await this.conn.query<PlayerMysqlSchemaI[]>(
            "SELECT * FROM player WHERE api_key=? LIMIT 1",
            apiKey
        );

        if (player == undefined) return;

        // TODO : make it get all challenger data
        return new PlayerInMysql(
            player.id_player,
            player.api_key,
            player.last_logged_in,
            new Player(
                player.player_name,
                player.player_email,
                new Challenger(
                    new Resources(0, 0, 0, 0),
                    new Trench(),
                    new CardDeck()
                )
            )
        );
    }
    async create(player: Player): Promise<PlayerInStorage | undefined> {
        const name = player.getName(),
            hashPassword = player.getHashPassword(),
            email = player.getEmail();

        if (!name || !hashPassword || !email) return;

        const alreadyExists = await this.isAlreadyRegister(email, name);

        if (alreadyExists) return;

        const createResources = await this.createNewResources();

        const [createChallenger] = await this.conn.query<ResultSetHeader>(
            "INSERT INTO challenger (id_resources) VALUES (?)",
            [createResources[0].insertId]
        );

        const trench = await this.createNewTrench(createChallenger.insertId);

        const challenger = new Challenger(
            createResources[1],
            trench,
            new CardDeck()
        );

        const apiKey = this.random256Hash();

        const [createPlayer] = await this.conn.query<ResultSetHeader>(
            "INSERT INTO player (player_name, player_password, player_email, id_challenger, last_logged_in ,api_key) VALUES (?,?,?,?,?,?)",
            [
                name,
                hashPassword,
                email,
                createChallenger.insertId,
                new Date(),
                apiKey,
            ]
        );

        return new PlayerInMysql(
            createPlayer.insertId,
            apiKey,
            new Date(),
            new Player(name, email, challenger)
        );
    }

    private random256Hash(): string {
        return createHmac("sha256", randomBytes(256).toString("hex")).digest(
            "base64"
        );
    }

    private async isAlreadyRegister(
        email: string,
        name: string
    ): Promise<boolean> {
        const [result] = await this.conn.query<RowDataPacket[]>(
            "SELECT player_name FROM player WHERE player_name = ? OR player_email = ?",
            [name, email]
        );

        return result.length > 0;
    }

    private async createNewResources(): Promise<[ResultSetHeader, Resources]> {
        const [createResources] = await this.conn.query<ResultSetHeader>(
            "INSERT INTO resources (meat,bones,blood,souls) VALUES (0,0,0,0)"
        );

        return [createResources, new Resources(0, 0, 0, 0)];
    }

    private async createNewTrench(challengerId: number): Promise<Trench> {
        const query: [number, number, number, string, number][] = [];

        const trench = new Trench();

        for (let col = 0; col < trench.getCardSet().length; col++) {
            for (let row = 0; row < trench.getCardSet()[col].length; row++) {
                const card = trench.getCardSet()[col][row];
                query.push([
                    row,
                    col,
                    challengerId,
                    card.getName(),
                    card.getLife(),
                ]);
            }
        }

        const [createTrench] = await this.conn.query<ResultSetHeader>(
            "INSERT INTO trench (card_row,card_col,id_challenger,card_name,life) VALUES ? ",
            [query]
        );

        return trench;
    }

    update(player: PlayerInStorage): Promise<PlayerInStorage | undefined> {
        throw new Error("Method not implemented.");
    }
    read(
        email: string,
        password: string
    ): Promise<PlayerInStorage | undefined> {
        throw new Error("Method not implemented.");
    }
    delete(player: PlayerInStorage): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
