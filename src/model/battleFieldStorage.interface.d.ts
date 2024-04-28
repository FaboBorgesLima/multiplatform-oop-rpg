import { BattleField } from "./battleField.model";

export interface BattleFieldStorageI {
    create(battleField: BattleField): Promise<BattleField | undefined>;
    load(id: number): Promise<BattleField | undefined>;
    update(battleField: BattleField): Promise<BattleField | undefined>;
    delete(battleField: BattleField): Promise<BattleField | undefined>;
}
