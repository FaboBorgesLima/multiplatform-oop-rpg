import { ActionsT, Action } from "./action.model";
import { Attack } from "./attack.model";
import { CounterAttack } from "./counterAtack.model";
import { Defense } from "./defense.model";
import { Entity } from "./entity.interface";
import { ElementsT, NatureElement } from "./natureElement.model";

export class AirElement implements NatureElement {
    readonly type: ElementsT = "air";

    constructor(private entity: Entity) {}

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
    isWeak(elementT: ElementsT): boolean {
        return elementT == "earth";
    }
}
