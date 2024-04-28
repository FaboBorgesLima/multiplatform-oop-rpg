import { Player } from "./player.model";

export interface StoragePlayerI {
    create(player: Player): Promise<Player | undefined>;
    update(player: Player): Promise<Player | undefined>;
    read(email: string, password: string): Promise<Player | undefined>;
    delete(player: Player): Promise<Player | undefined>;
}
