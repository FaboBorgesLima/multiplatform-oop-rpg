import { Action, ActionsT } from "./action.model";
import { Entity } from "./entity.interface";

export interface NatureElement {
    factory(actionType: ActionsT): Action;
    isWeak(elementT: ElementsT): boolean;
    type: ElementsT;
}
export type ElementsT = "air" | "water" | "earth" | "fire";
