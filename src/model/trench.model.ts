import { BaseCard } from "./baseCard.model";
import { CarcassCard } from "./cards/carcassCard.model";
import { Resources } from "./resources.model";

export class Trench {
    readonly N_ROWS = 2;
    readonly N_COLS = 4;
    private cardSet: CardSet = [];

    constructor() {
        this.cardSet = this.createEmptyCardSet();
    }

    public toString(): string {
        return `${this.getLiveCards()} live cards`;
    }

    public toTable(): string[][] {
        const table: string[][] = [];

        for (let col = 0; col < this.cardSet.length; col++) {
            const rowArray: string[] = [];

            for (let row = 0; row < this.cardSet[col].length; row++)
                rowArray.push(this.cardSet[col][row].getName());

            table.push(rowArray);
        }

        return table;
    }

    public getCardSet(): BaseCard[][] {
        return this.cardSet;
    }

    private getLiveCards(): number {
        let liveCards = 0;

        for (let col = 0; col < this.cardSet.length; col++) {
            for (let row = 0; row < this.cardSet[col].length; row++) {
                if (this.cardSet[col][row].getIsAlive()) liveCards++;
            }
        }

        return liveCards;
    }

    private createEmptyCardSet(): CardSet {
        const deck: CardSet = [];

        for (let i = 0; i < this.N_COLS; i++) {
            const row: BaseCard[] = [];

            for (let j = 0; j < this.N_ROWS; j++) {
                row.push(new CarcassCard());
            }

            deck.push(row);
        }

        return deck;
    }

    /**
     *
     * @returns
     */

    attack(): number[] {
        const damages: number[] = [];

        for (let col = 0; col < this.cardSet.length; col++) {
            damages.push(this.getAttackOnCol(col));
        }

        return damages;
    }

    /**
     *
     * @param col the col that you want to get the attack
     * @returns the amount of damage that the col do
     */
    private getAttackOnCol(col: number): number {
        let attack: number = 0;

        for (let row = 0; row < this.cardSet[col].length; row++) {
            const card = this.cardSet[col][row];

            if (card.getIsAlive()) return card.getDamage();
        }

        return attack;
    }

    /**
     *
     * @param col
     * @returns the leftover attack and dead cards num
     *
     */
    private reciveAttackOnCol(col: number, attack: number): [number, number] {
        let leftoverAttack = attack,
            deadCards = 0;

        for (let row = 0; row < this.cardSet[col].length; row++) {
            const card = this.cardSet[col][row];

            const initialAttack = leftoverAttack;

            leftoverAttack = card.reciveDamage(leftoverAttack);

            if (!card.getIsAlive() && initialAttack != leftoverAttack) {
                this.cardSet[col][row] = new CarcassCard();
                deadCards++;
            }
        }

        return [leftoverAttack, deadCards];
    }

    /**
     *
     * @returns  the amount of leftover damage and the number of cards that died
     * @param attack is an array with the attacks by col
     */
    reciveAttack(attack: number[]): [number, number] {
        let leftoverAttack = 0,
            deads = 0;

        for (let col = 0; col < this.cardSet.length; col++) {
            const attackOnCol = attack[col];

            const [leftoverFromCol, deadsFromCol] = this.reciveAttackOnCol(
                col,
                attackOnCol
            );
            leftoverAttack += leftoverFromCol;
            deads += deadsFromCol;
        }

        return [leftoverAttack, deads];
    }

    hasAliveCard(): boolean {
        for (let col = 0; this.cardSet.length > col; col++) {
            for (let row = 0; this.cardSet[col].length > row; row++) {
                if (this.cardSet[col][row].getIsAlive()) return true;
            }
        }

        return false;
    }

    getTotalGeneration(): Resources {
        let rs = new Resources(0, 0, 0, 0);

        for (let col = 0; col < this.cardSet.length; col++) {
            for (let row = 0; row < this.cardSet[col].length; row++) {
                const card = this.cardSet[col][row];

                if (card) rs = Resources.add(rs, card.getGeneration());
            }
        }

        return rs;
    }

    insertCard(card: BaseCard, row: number, col: number): boolean {
        if (row >= this.N_ROWS || row < 0 || col >= this.N_COLS || col < 0) {
            return false;
        }

        if (this.cardSet[col][row].getIsAlive()) return false;

        this.cardSet[col][row] = card;
        return true;
    }

    clear(): void {
        this.cardSet = this.createEmptyCardSet();
    }
}
type CardSet = BaseCard[][];
