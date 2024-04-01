import { BaseCard } from "./baseCard.model";
import { CardPosition } from "./cardPosition.model";
import { Challenger } from "./challenger.model.";

export interface Card extends BaseCard {
    constructor(): Card;
}
