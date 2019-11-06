import { readJSON } from "karma-read-json";

export class JSONTools {
    public static fetchJSON(jsonFileName) {
        const jsonObj = readJSON("testAssets/json/" + jsonFileName);
        if (jsonObj == null) {
            return undefined;
        } else {
            return jsonObj;
        }
    }

    public static filterJSONByType(jsonObj, type) {
        let jsonObjArr = [];
        if (jsonObj.hasOwnProperty("Components") ) {
            for (const component of jsonObj.Components) {
                if (component.Type === type) {
                    // console.log(component);
                    jsonObjArr.push(component);
                }
                jsonObjArr = jsonObjArr.concat(this.filterJSONByType(component, type));
            }
        }
        return jsonObjArr;
    }

    public static filterLVClassFiles(jsonObj) {
        let jsonObjArr = [];
        if (jsonObj.hasOwnProperty("Components") ) {
            for (const component of jsonObj.Components) {
                if (!(component.Components)) {
                    jsonObjArr.push(component);
                }
                jsonObjArr = jsonObjArr.concat(this.filterLVClassFiles(component));
            }
        }
        return jsonObjArr;
    }

    public static filterJSONByID(jsonObj, id) {
        const jsonObjArr = [];
        if (jsonObj.hasOwnProperty("Components") ) {
            for (const component of jsonObj.Components) {
                if (component.ID === id) {
                    jsonObjArr.push(component);
                }
                jsonObjArr.concat(this.filterJSONByID(component, id));
            }
        }
        return jsonObjArr;
    }

    public static filterFiles(jsonObj) {
        let jsonObjArr = [];
        for (const child of jsonObj.children) {
            if (child.type === "file") {
                jsonObjArr = jsonObjArr.concat(child);
            } else {
                jsonObjArr = jsonObjArr.concat(this.filterFiles(child));
            }
        }
        return jsonObjArr;
    }

    public static filterFolders(jsonObj, type) {
        let jsonObjArr = [];
        if (jsonObj.type === type) {
            jsonObjArr = jsonObjArr.concat(jsonObj);
        }
        if (jsonObj.children) {
            for (const child of jsonObj.children) {
                jsonObjArr = jsonObjArr.concat(this.filterFolders(child, type));
            }
        }
        return jsonObjArr;
    }

    public static filterJSONNames(jsonObj) {
        let jsonObjArr = [];
        for (const child of jsonObj.children) {
            jsonObjArr = jsonObjArr.concat(child.name);
            if (child.children) {
                jsonObjArr = jsonObjArr.concat(this.filterJSONNames(child));
            }
        }
        return jsonObjArr;
    }

    public static filterDOMNames(jsonObj) {
        let jsonObjArr = [];
        for (const child of jsonObj.childNodes) {
            jsonObjArr = jsonObjArr.concat(child.id);
            if (child.childNodes) {
                jsonObjArr = jsonObjArr.concat(this.filterDOMNames(child));
            }
        }
        return jsonObjArr;
    }

    public static filterByKeys(jsonObj, filterType) {
        let jsonKeys = [];
        for (const child of jsonObj.children) {
            jsonKeys = jsonKeys.concat(child[filterType]);
            if (child.children) {
                jsonKeys = jsonKeys.concat(this.filterByKeys(child, filterType));
            }
        }
        return jsonKeys;
    }

    public static filterChildren(jsonObj) {
        let JSONChildren = [];
        if (jsonObj.hasOwnProperty("children")) {
            for (const child of jsonObj.children) {
                JSONChildren = JSONChildren.concat(this.filterChildren(child));
                JSONChildren = JSONChildren.concat(jsonObj.children);
            }
        }
        return JSONChildren;
    }
}
