import { Action, ActionsT } from "./action.model";
import { Effect } from "./effect.model";
import { NatureElement } from "./natureElement.model";
import { Entity } from "./entity.interface";

export class Attack implements Action {
    public type: ActionsT = "attack";
    public element: NatureElement;
    constructor(element: NatureElement, private entity: Entity) {
        this.element = element;
    }

    /**
     *
     * @param action
     * @returns the effect is what the entity that used the action will suffer
     */
    receive(action: Action): Effect {
        switch (action.type) {
            case "defense":
                return {
                    getDamage() {
                        return 0;
                    },
                };
            case "attack":
                return action.apply(action);
            case "counter-attack":
                if (this.element.isWeak(action.element.type))
                    return action.apply(action);
                else {
                    return {
                        getDamage() {
                            return 0;
                        },
                    };
                }
        }
    }
    apply(action: Action): Effect {
        const damage = this.entity.getDamage();

        return {
            getDamage() {
                return damage;
            },
        };
    }
}
