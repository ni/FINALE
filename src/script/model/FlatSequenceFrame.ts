import { Component, Diagram} from "./Model";
import { ModelFactory } from "./ModelFactory";

export class FlatSequenceFrame extends Component {
    public diagram: Diagram;
    constructor(id: string) {
        super(id, "FlatSequenceFrame");
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
