import { createHmac } from "crypto";
import { Challenger } from "./challenger.model";

export class Player {
    protected name?: string;
    protected password?: string;
    protected email?: string;
    private readonly hash =
        "0Qu53RRQ1I93b1GkTkkLtmzLxDMW3OUoLMGF0fVl4eMwiJrcY9sIWyaU540zYrzpM71mo3I3op9RYMeRo01wKedYTKa5DUPMYDBI";

    constructor(
        name: string,
        email: string,
        protected challenger: Challenger,
        password?: string
    ) {
        this.setName(name);
        if (password) this.setPassword(password);
        this.setEmail(email);
    }

    getName(): string | undefined {
        return this.name;
    }

    getEmail(): string | undefined {
        return this.email;
    }

    allOk(): boolean {
        return (
            this.password != undefined &&
            this.name != undefined &&
            this.email != undefined
        );
    }

    protected hasSpecialChars(str: string): boolean {
        return /[^A-Za-z0-9]/g.test(str);
    }

    protected isEmail(email: string): boolean {
        return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
            email
        );
    }

    setName(name: string): boolean {
        if (name.length < 3) return false;
        if (this.hasSpecialChars(name)) return false;

        this.name = name;
        return true;
    }

    getHashPassword(): string | undefined {
        if (this.password)
            return createHmac("sha256", this.hash)
                .update(this.password)
                .digest("base64");
    }

    setPassword(password: string): boolean {
        if (password.length < 8) return false;
        if (this.hasSpecialChars(password)) return false;

        this.password = password;

        return true;
    }

    setEmail(email: string): boolean {
        if (!this.isEmail(email)) return false;

        this.email = email;

        return true;
    }

    getChallenger(): Challenger {
        return this.challenger;
    }
}
