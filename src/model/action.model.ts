import { Effect } from "./effect.model";
import { ElementsT, NatureElement } from "./natureElement.model";
import { Entity } from "./entity.interface";

export interface Action {
    readonly element: NatureElement;
    readonly type: ActionsT;
    receive(action: Action): Effect;
    apply(action: Action): Effect;
}
export type ActionsT = "defense" | "attack" | "counter-attack";
