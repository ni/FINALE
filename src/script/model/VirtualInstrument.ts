import { Component, Diagram } from "./Model";
import { ModelFactory } from "./ModelFactory";

export class VirtualInstrument extends Component {
    public static originPath: string;
    public static isStandAlone: boolean = false;
    public viName: string;
    public components: Diagram[];
    constructor() {
        super("", "VirtualInstrument");
        this.components = [];
    }
    public parse(jsonObj) {
        this.id = jsonObj.ID;
        this.viName = this.id;
        for (jsonObj of jsonObj.Components) {
            if (jsonObj.ID !== "Password Protected") {
                const compObj = ModelFactory.createObject(jsonObj.ID, jsonObj.Type);
                compObj.parse(jsonObj);
                this.components.push(compObj);
            }
        }
    }
}
