import { Resources } from "./resources.model";

export class Challenger {
    protected resources: Resources;

    constructor(resources: Resources) {
        this.resources = resources;
    }
}
