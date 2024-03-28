import { Action, ActionsT } from "./action.model";
import { Effect } from "./effect.model";
import { Entity } from "./entity.interface";
import { NatureElement } from "./natureElement.model";

export class CounterAttack implements Action {
    public type: ActionsT = "counter-attack";
    public element: NatureElement;
    constructor(element: NatureElement, private entity: Entity) {
        this.element = element;
    }
    receive(action: Action): Effect {
        if (
            action.type == "attack" &&
            action.element.isWeak(this.element.type)
        ) {
            return {
                getDamage() {
                    return 0;
                },
            };
        }
        return action.apply(this);
    }
    apply(action: Action): Effect {
        const thisAction = this;

        if (
            action.type == "attack" &&
            action.element.isWeak(this.element.type)
        ) {
            return {
                getDamage() {
                    return (
                        thisAction.entity.getDamage() +
                        action.apply(thisAction).getDamage()
                    );
                },
            };
        }

        return {
            getDamage() {
                return 0;
            },
        };
    }
}
