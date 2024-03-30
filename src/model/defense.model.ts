import { Action, ActionsT } from "./action.model";
import { Effect } from "./effect.model";
import { Entity } from "./entity.interface";
import { NatureElement } from "./natureElement.model";

export class Defense implements Action {
    element: NatureElement;
    type: ActionsT = "defense";

    constructor(element: NatureElement, private entity: Entity) {
        this.element = element;
    }

    receive(action: Action): Effect {
        const thisAction = this;

        switch (action.type) {
            case "counter-attack":
            case "defense":
                return {
                    getDamage() {
                        return 0;
                    },
                };
            case "attack":
                return {
                    getDamage() {
                        return (
                            action.apply(thisAction).getDamage() -
                            action.apply(thisAction).getDamage() *
                                (thisAction.entity.getDefense() / 100)
                        );
                    },
                };
        }
    }
    apply(action: Action): Effect {
        return {
            getDamage() {
                return 0;
            },
        };
    }
}
