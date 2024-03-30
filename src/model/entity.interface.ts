import { Action } from "./action.model";
import { Effect } from "./effect.model";

export interface Entity {
    getDamage(): number;
    getDefense(): number;
    getAction(): Action;
    getIsAlive(): boolean;
    getMaxLife(): number;
    getLife(): number;
    applyEffect(effect: Effect): void;
}
