import { DynamicDispatchImplementation } from "./DynamicDispatchImplementation";
import { Component } from "./Model";

export class DynamicDispatch extends Component {
    public NearestImplementation: string;
    public Hierarchy: DynamicDispatchImplementation[];
    constructor(id: string) {
        super(id, "DynamicDispatchSubVI");
        this.Hierarchy = [];
    }
    public parse(jsonObj) {
        super.parse(jsonObj);
        const implementations = jsonObj.Implementations;
        this.NearestImplementation = implementations.Nearest;
        for (const item of implementations.Hierarchy) {
            this.Hierarchy.push(DynamicDispatchImplementation.Create(item));
        }
    }
}
