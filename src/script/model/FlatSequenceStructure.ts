import { Component, FlatSequenceFrame} from "./Model";
import { ModelFactory } from "./ModelFactory";

export class FlatSequenceStructure extends Component {
    public frameArr: FlatSequenceFrame[];
    constructor(id: string) {
        super(id + "Structure", "FlatSequence");
        this.frameArr = [];
    }
    public parse(jsonObj) {
        super.parse(jsonObj);
        const jsonObjArr = jsonObj.Components;
        for (jsonObj of jsonObjArr) {
            if (jsonObj) {
                const compObj = ModelFactory.createObject(jsonObj.ID, jsonObj.Type);
                compObj.parse(jsonObj);
                this.addComponent(compObj);
            }
        }
    }
    protected addComponent(componentObj: FlatSequenceFrame): void {
        this.frameArr.push(componentObj);
    }
}
