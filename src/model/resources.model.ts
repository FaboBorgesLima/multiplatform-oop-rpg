export class Resources {
    private souls: number = 0;
    private blood: number = 0;
    private bones: number = 0;
    private meat: number = 0;

    constructor(
        initialSouls: number,
        initialBlood: number,
        initialBones: number,
        initialMeat: number
    ) {
        this.souls = initialSouls;
        this.blood = initialBlood;
        this.bones = initialBones;
        this.meat = initialMeat;
    }

    toString(): string {
        return `\nsouls: ${this.souls}\nblood: ${this.blood}\nbones: ${this.bones}\nmeat: ${this.meat}\n`;
    }

    getSouls(): number {
        return this.souls;
    }

    getBlood(): number {
        return this.blood;
    }

    getBones(): number {
        return this.bones;
    }

    getMeat(): number {
        return this.meat;
    }

    public static add(resouces1: Resources, resouces2: Resources): Resources {
        return new Resources(
            resouces1.getSouls() + resouces2.getSouls(),
            resouces1.getBlood() + resouces2.getBlood(),
            resouces1.getBones() + resouces2.getBones(),
            resouces1.getMeat() + resouces2.getMeat()
        );
    }

    public static subtract(
        resouces1: Resources,
        resouces2: Resources
    ): Resources {
        return new Resources(
            resouces1.getSouls() - resouces2.getSouls(),
            resouces1.getBlood() - resouces2.getBlood(),
            resouces1.getBones() - resouces2.getBones(),
            resouces1.getMeat() - resouces2.getMeat()
        );
    }

    public isSmaller(resouces: Resources): boolean {
        return (
            this.souls < resouces.souls &&
            this.blood < resouces.blood &&
            this.bones < resouces.bones &&
            this.meat < resouces.meat
        );
    }
    public isSmallerOrEqual(resouces: Resources): boolean {
        return (
            this.souls <= resouces.souls &&
            this.blood <= resouces.blood &&
            this.bones <= resouces.bones &&
            this.meat <= resouces.meat
        );
    }
}
