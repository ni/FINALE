import { VIInstance } from "./Model";

export class PolymorphicVI {
    public id: string;
    public type: string;
    public components: VIInstance[];
    constructor() {
        this.type = "Polymorphic VI";
        this.components = [];
    }
    public parse(jsonObj) {
        this.id = jsonObj.ID;
        for (jsonObj of jsonObj.Components) {
            if (jsonObj) {
                const compObj = new VIInstance();
                compObj.parse(jsonObj);
                this.components.push(compObj);
            }
        }
    }
}
