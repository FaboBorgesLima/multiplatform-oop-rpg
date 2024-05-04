import { CardDeck } from "./cardDeck.model";
import { Challenger } from "./challenger.model";
import { Player } from "./player.model";
import { PlayerInFakeStorage } from "./playerInFakeStorage.model";
import { PlayerInStorage } from "./playerInStorage.model";
import { PlayerStorageI } from "./playerStorage.interface";
import { Resources } from "./resources.model";
import { Trench } from "./trench.model";

export class PlayerFakeStorage implements PlayerStorageI {
    async readAPIKey(apiKey: string): Promise<PlayerInStorage | undefined> {
        return new PlayerInFakeStorage(
            0,
            "",
            new Date(),
            new Player(
                "fake",
                "fake@fake.com",
                new Challenger(
                    new Resources(0, 0, 0, 0),
                    new Trench(),
                    new CardDeck()
                )
            )
        );
    }
    async create(player: Player): Promise<PlayerInStorage | undefined> {
        console.log("create", player);

        return new PlayerInFakeStorage(0, "fake", new Date(), player);
    }
    async update(
        player: PlayerInStorage
    ): Promise<PlayerInStorage | undefined> {
        console.log("update", player);

        return player;
    }
    async read(
        email: string,
        password: string
    ): Promise<PlayerInStorage | undefined> {
        return new PlayerInFakeStorage(
            0,
            "",
            new Date(),
            new Player(
                "fake",
                "fake@fake.com",
                new Challenger(
                    new Resources(0, 0, 0, 0),
                    new Trench(),
                    new CardDeck()
                )
            )
        );
    }
    async delete(player: PlayerInStorage): Promise<boolean> {
        return true;
    }
}
