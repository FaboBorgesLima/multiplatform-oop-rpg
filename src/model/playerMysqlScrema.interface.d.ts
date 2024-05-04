import { RowDataPacket } from "mysql2";

export interface PlayerMysqlSchemaI extends RowDataPacket {
    id_player: number;
    player_name: string;
    player_password: string;
    player_email: string;
    id_challenger: number;
    api_key: string;
    last_logged_in: Date;
}
