export class Player {
    protected name?: string;
    protected password?: string;
    protected email?: string;

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
}
