import {} from "jasmine";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("DynamicDispatchModelTestSuite", () => {
    let jsonObj = null;
    let dynamicDispatchArr = null;
    let jsonDynamicDispatchArr = null;

    beforeAll( () => {
        jsonObj = JSONTools.fetchJSON("Dynamic Dispatching\\Dynamic Dispatching.json");
        const niDocObj = generateModel(jsonObj, "testAssets\\json");
        dynamicDispatchArr = filterModelByType(niDocObj, "DynamicDispatchSubVI");
        jsonDynamicDispatchArr = JSONTools.filterJSONByType(jsonObj.NIDocument, "DynamicDispatchSubVI");
    });

    it("Given key id in DynamicDispatchSubVI array when opened must match JSON ID", () => {
        for (let i = 0; i < dynamicDispatchArr.length; i++) {
            expect(dynamicDispatchArr[i].id).toEqual(jsonDynamicDispatchArr[i].ID);
        }
    });

    it("Given key type in DynamicDispatchSubVI array when opened must match JSON Type", () => {
        for (let i = 0; i < dynamicDispatchArr.length; i++) {
            expect(dynamicDispatchArr[i].type).toEqual(jsonDynamicDispatchArr[i].Type);
        }
    });

    it("given key bounds in DynamicDispatchSubVI array when opened must match JSON Bounds", () => {
        for (let i = 0; i < dynamicDispatchArr.length; i ++) {
            expect(dynamicDispatchArr[i].bounds.x).toBe(jsonDynamicDispatchArr[i].Bounds.x);
            expect(dynamicDispatchArr[i].bounds.y).toBe(jsonDynamicDispatchArr[i].Bounds.y);
            expect(dynamicDispatchArr[i].bounds.w).toBe(jsonDynamicDispatchArr[i].Bounds.w);
            expect(dynamicDispatchArr[i].bounds.h).toBe(jsonDynamicDispatchArr[i].Bounds.h);
        }
    });

    it("Given key baseVI in DynamicDispatchSubVI array when opened must match JSON BaseVi", () => {
        for (let i = 0; i < dynamicDispatchArr.length; i++) {
            expect(dynamicDispatchArr[i].baseVI).toEqual(jsonDynamicDispatchArr[i].BaseVi);
        }
    });

    it("Given key baseClass in DynamicDispatchSubVI array when opened must match JSON BaseClass", () => {
        for (let i = 0; i < dynamicDispatchArr.length; i++) {
            expect(dynamicDispatchArr[i].baseClass).toEqual(jsonDynamicDispatchArr[i].BaseClass);
        }
    });

    it("Given key derivedVI in DynamicDispatchSubVI array when opened must match JSON DerivedVi", () => {
        for (let i = 0; i < dynamicDispatchArr.length; i++) {
            expect(dynamicDispatchArr[i].derivedVI).toEqual(jsonDynamicDispatchArr[i].DerivedVi);
        }
    });

    it("Given key derivedClass in DynamicDispatchSubVI array when opened must match JSON DerivedClass", () => {
        for (let i = 0; i < dynamicDispatchArr.length; i++) {
            expect(dynamicDispatchArr[i].derivedClass).toEqual(jsonDynamicDispatchArr[i].DerivedClass);
        }
    });
});
