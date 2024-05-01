import { Request, Response } from "express";
import { Player } from "../model/player.model";
import { Challenger } from "../model/challenger.model";
import { Resources } from "../model/resources.model";
import { Trench } from "../model/trench.model";
import { CardDeck } from "../model/cardDeck.model";
import { PlayerStorageI } from "../model/playerStorage.interface";

export class PlayerController {
    constructor(private storage: PlayerStorageI) {}

    async create(req: Request, res: Response) {
        const body: { [k: string]: unknown } = req.body;

        if (!body.password || typeof body.password != "string") {
            res.json({ message: "no password" });

            return;
        }

        if (!body.name || typeof body.name != "string") {
            res.json({ message: "no name" });

            return;
        }
        if (!body.email || typeof body.email != "string") {
            res.json({ message: "no email" });

            return;
        }

        const player = new Player(
            body.name,
            body.email,
            new Challenger(
                new Resources(0, 0, 0, 0),
                new Trench(),
                new CardDeck()
            ),
            body.password
        );

        if (!player.allOk()) {
            res.json({ message: "invalid email , passoword or name" });
            return;
        }

        this.storage.create(player);

        res.json({ message: "all okay" });
    }
}
