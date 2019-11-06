import { Component, Diagram} from "./Model";
import { ModelFactory } from "./ModelFactory";

export class Structure extends Component {
    public diagram: Diagram;
    constructor(id: string) {
        super(id, "Structure");
    }
    public addDiagram(diagramObj: Diagram): void {
        this.diagram = diagramObj;
    }
    public parse(jsonObj) {
        super.parse(jsonObj);
        const childJsonObj = jsonObj.Components[0];
        const compObj = ModelFactory.createObject(childJsonObj.ID, childJsonObj.Type);
        compObj.parse(childJsonObj);
        this.addDiagram(compObj);
    }
}
