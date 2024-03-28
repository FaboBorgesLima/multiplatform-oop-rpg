import { Action } from "./action.model";

export interface Entity {
    getDamage(): number;
    getDefense(): number;

    getAction(): Action;
}
