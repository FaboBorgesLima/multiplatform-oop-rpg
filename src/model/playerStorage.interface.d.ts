import { Player } from "./player.model";
import { PlayerInStorage } from "./playerInStorage.model";

export interface PlayerStorageI {
    create(player: Player): Promise<PlayerInStorage | undefined>;
    update(player: PlayerInStorage): Promise<PlayerInStorage | undefined>;
    read(email: string, password: string): Promise<PlayerInStorage | undefined>;
    readAPIKey(apiKey: string): Promise<PlayerInStorage | undefined>;
    delete(player: PlayerInStorage): Promise<boolean>;
}
