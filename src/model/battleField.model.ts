import { Challenger } from "./challenger.model";

export class BattleField {
    protected rounds: number = 0;

    constructor(
        private challenger1: Challenger,
        private challenger2: Challenger
    ) {}

    public getRounds(): number {
        return this.rounds;
    }

    /**
     *  get attack from both sides at the same time and apply it
     *  @returns the winner, "continues" or "tie"
     */
    public battle(): Challenger | "continues" | "tie" {
        const attack1 = this.challenger1.attack(),
            attack2 = this.challenger2.attack();

        this.challenger1.reciveAttack(attack2);
        this.challenger2.reciveAttack(attack1);

        if (this.challenger1.isAlive() && this.challenger2.isAlive())
            return "continues";

        if (!this.challenger1.isAlive() && !this.challenger2.isAlive())
            return "tie";

        if (this.challenger1.isAlive()) return this.challenger1;

        return this.challenger2;
    }

    getChallenger1(): Challenger {
        return this.challenger1;
    }

    getChallenger2(): Challenger {
        return this.challenger2;
    }
}
