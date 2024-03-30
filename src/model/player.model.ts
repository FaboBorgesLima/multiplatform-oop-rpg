import { Action } from "./action.model";
import { Effect } from "./effect.model";
import { Entity } from "./entity.interface";

export class Player implements Entity {
    getDamage(): number {
        throw new Error("Method not implemented.");
    }
    getDefense(): number {
        throw new Error("Method not implemented.");
    }
    getAction(): Action {
        throw new Error("Method not implemented.");
    }
    getIsAlive(): boolean {
        throw new Error("Method not implemented.");
    }
    getMaxLife(): number {
        throw new Error("Method not implemented.");
    }
    getLife(): number {
        throw new Error("Method not implemented.");
    }
    applyEffect(effect: Effect): void {
        throw new Error("Method not implemented.");
    }
}
