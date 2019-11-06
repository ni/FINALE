import { Component, Diagram, IRect} from "./Model";
import { ModelFactory } from "./ModelFactory";

export class MultiFrameStructure extends Component {
    public caseNameArr: string[];
    public diagramArr: Diagram[];
    public caseLength: number;
    public selectorBounds: IRect;
    public visibleFrame: number = 0;
    constructor(id: string) {
        super(id, "MultiFrameStructure");
        this.caseNameArr = [];
        this.diagramArr = [];
        this.caseLength = 0;
    }
    public addCase(caseName: string, diagramObj: Diagram): void {
        if (caseName) {
            this.caseNameArr.push(caseName);
        } else {
            this.caseNameArr.push("Default");
        }
        this.diagramArr.push(diagramObj);
        this.caseLength ++;
    }
    public parse(jsonObj) {
        super.parse(jsonObj);
        this.selectorBounds = jsonObj.SelectorBounds;
        const jsonObjArr = jsonObj.Components;
        for (jsonObj of jsonObjArr) {
            if (jsonObj) {
                const compObj = ModelFactory.createObject(jsonObj.ID, jsonObj.Type);
                compObj.parse(jsonObj);
                this.addCase(jsonObj.ID, compObj);
            }
        }
    }
}
