import { Action, ActionsT } from "./action.model";
import { Attack } from "./attack.model";
import { ElementsT, NatureElement } from "./natureElement.model";
import { Entity } from "./entity.interface";
import { CounterAttack } from "./counterAtack.model";
import { Defense } from "./defense.model";

export class WaterElement implements NatureElement {
    constructor(private entity: Entity) {}

    readonly type: ElementsT = "water";

    isWeak(elementT: ElementsT): boolean {
        return elementT == "fire";
    }

    actionFactory(actionType: ActionsT): Action {
        switch (actionType) {
            case "attack":
                return new Attack(this, this.entity);
            case "counter-attack":
                return new CounterAttack(this, this.entity);
            case "defense":
                return new Defense(this, this.entity);
        }
    }
}
