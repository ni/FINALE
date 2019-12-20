import { Component } from "./Model";

export class Node extends Component {
    public helpID: string;
    constructor(id: string) {
        super(id, "Node");
    }
    public parse(jsonObj: any) {
        super.parse(jsonObj);
        this.setBounds(jsonObj.Bounds);
        if (jsonObj.HelpID) {
            this.helpID = jsonObj.HelpID;
        } else {
            this.helpID = "";
        }
    }
}
