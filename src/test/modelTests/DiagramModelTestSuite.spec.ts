import {} from "jasmine";
import { VirtualInstrument } from "../../../src/script/model/Model";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("DiagramModelTestSuite", () => {
    let jsonObj = null;
    let diagramObjArr = null;
    let jsondiagramObjArr = null;
    beforeAll( () => {
        jsonObj = JSONTools.fetchJSON("NestedCaseStructure\\NestedCaseStructure.json");
        const niDocObj = generateModel(jsonObj, "testAssets\\json");
        diagramObjArr = filterModelByType(niDocObj, "Diagram");
        jsondiagramObjArr = JSONTools.filterJSONByType(jsonObj.NIDocument, "Diagram");
    });

    it("given key id in Diagram when Opened then ID must match JSON ID", () => {
        for (let i = 0; i < diagramObjArr.length; i ++) {
            expect(diagramObjArr[i].id).toBe(jsondiagramObjArr[i].ID);
        }
    });

    it("given key type in Diagram when Opened then Type must match JSON Type", () => {
        for (let i = 0; i < diagramObjArr.length; i ++) {
            expect(diagramObjArr[i].type).toBe(jsondiagramObjArr[i].Type);
        }
    });

    it("given key components in Diagram when Opened then component must match JSON Components", () => {
        for (let i = 0; i < diagramObjArr.length; i ++) {
            const componentArr = diagramObjArr[i].componentArr;
            const jsonArr = jsondiagramObjArr[i].Components;
            expect(componentArr.length).toBe(jsonArr.length);
            for (let j = 0; j < componentArr.length; j++) {
                expect(componentArr[j].id).toBe(jsonArr[j].ID);
            }
        }
    });

    it("given key imagePath in Diagram when Opened then component must match JSON Image", () => {
        for (let i = 0; i < diagramObjArr.length; i ++) {
            expect(diagramObjArr[i].imagePath).toBe("testAssets\\json" + jsondiagramObjArr[i].Image);
        }
    });

    it("given key bounds in Diagram when Opened then component must match JSON Bounds", () => {
        for (let i = 0; i < diagramObjArr.length; i ++) {
            expect(diagramObjArr[i].bounds.x).toBe(jsondiagramObjArr[i].Bounds.x);
            expect(diagramObjArr[i].bounds.y).toBe(jsondiagramObjArr[i].Bounds.y);
            expect(diagramObjArr[i].bounds.w).toBe(jsondiagramObjArr[i].Bounds.w);
            expect(diagramObjArr[i].bounds.h).toBe(jsondiagramObjArr[i].Bounds.h);
        }
    });

});
