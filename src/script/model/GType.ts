import { Diagram } from "./Diagram";
import { ClassMember as ClassMembers } from "./Model";

export class GType {
    public type: string;
    public data: Diagram;
    public memberComponentId = "Members";
    public classMembers: ClassMembers[];
    public constructor() {
        this.type = "GType";
        this.classMembers = [];
    }
    public parse(jsonObj: { Components: any; }) {
        const jsonComponents = jsonObj.Components;
        for (const elem of jsonComponents) {
            if (elem.Type === "Diagram") {
                this.data = new Diagram(elem.ID);
                this.data.parse(elem);
            } else {
                const members = elem.Components;
                for (const member of members) {
                    const node = new ClassMembers();
                    node.parse(member);
                    this.classMembers.push(node);
                }
            }
        }
    }
}
