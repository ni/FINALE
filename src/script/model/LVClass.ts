import { File } from "./File";

export class LVClass extends File {
    public components: File[];
    public constructor() {
        super("LVClass");
        this.components = [];
    }
    public parse(jsonObj) {
        super.parse(jsonObj);
        const jsonComponents = jsonObj.Components;
        for (const elem of jsonComponents) {
            const node = this.createObject(elem.Type);
            node.parse(elem);
            this.components.push(node);
        }
    }
}
