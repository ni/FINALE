import { PathHelper } from "../pathHelper";
import { Component } from "./Model";
import { ModelFactory } from "./ModelFactory";

export class Diagram extends Component {
    public imagePath: string;
    public componentArr: Component[];
    constructor(id: string) {
        super(id, "Diagram");
        this.imagePath = "";
        this.componentArr = [];
    }
    public parse(jsonObj) {
        super.parse(jsonObj);
        const jsonObjArr = jsonObj.Components;
        if (jsonObj.Image) {
            this.imagePath = PathHelper.getSourcePath(jsonObj.Image);
        }
        for (jsonObj of jsonObjArr) {
            if (jsonObj) {
                const compObj = ModelFactory.createObject(jsonObj.ID, jsonObj.Type);
                compObj.parse(jsonObj);
                this.addComponent(compObj);
            }
        }
    }
    protected addComponent(componentObj: Component): void {
        this.componentArr.push(componentObj);
    }
}
