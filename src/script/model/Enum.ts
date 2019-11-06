import { Component, Diagram} from "./Model";
import { ModelFactory } from "./ModelFactory";

export class Enum extends Component {
    public values: string[];
    constructor(id: string) {
        super(id, "Enum");
        this.values = [];
    }
    public parse(jsonObj) {
        super.parse(jsonObj);
        this.values = jsonObj.Values;
    }
}
