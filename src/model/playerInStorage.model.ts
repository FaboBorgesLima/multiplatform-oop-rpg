import { Player } from "./player.model";

export abstract class PlayerInStorage {
    constructor(protected id: number, protected player: Player) {}

    getPlayer(): Player {
        return this.player;
    }

    getId(): number {
        return this.id;
    }
}
