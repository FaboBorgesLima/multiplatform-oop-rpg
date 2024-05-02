import express from "express";
import { PlayerController } from "./controller/playerController";
import { PlayerMysql } from "./model/playerMysql.model";
import { createConnection } from "mysql2/promise";
import { Player } from "./model/player.model";
import { Challenger } from "./model/challenger.model";
import { Resources } from "./model/resources.model";
import { Trench } from "./model/trench.model";
import { CardDeck } from "./model/cardDeck.model";
import { PlayerFakeStorage } from "./model/playerFakeStorage.model";

const app = express();

app.use(express.json());

app.all("/player", async (req, res) => {
    const storage = new PlayerFakeStorage();

    const playerController = new PlayerController(storage);

    playerController.create(req, res);
});

app.listen(8080, () => {
    console.log("server started");
});
