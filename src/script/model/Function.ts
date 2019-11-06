import { Component, VirtualInstrument } from "./Model";

export class FunctionNode extends Component {
    constructor(id: string) {
        super(id, "Function");
    }
    public parse(jsonObj) {
        super.parse(jsonObj);
    }
}
