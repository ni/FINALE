export class ClassMember {
    public id: string;
    public type: string;
    public scope: string;
    public path: string;
    constructor() {
        this.type = "Class Member";
    }
    public parse(jsonObj) {
        this.id = jsonObj.ID;
        this.path = jsonObj.Path;
        this.scope = jsonObj.Scope;
    }
}
