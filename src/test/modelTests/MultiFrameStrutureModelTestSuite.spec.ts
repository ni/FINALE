import {} from "jasmine";
import { VirtualInstrument } from "../../../src/script/model/Model";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("MultiFrameStrutureModelTestSuite", () => {
    let jsonObj = null;
    let structureObjArr = null;
    let jsonStructureObjArr = null;
    beforeAll( () => {
        jsonObj = JSONTools.fetchJSON("NestedCaseStructure\\NestedCaseStructure.json");
        const niDocObj = generateModel(jsonObj, "testAssets\\json");
        structureObjArr = filterModelByType(niDocObj, "MultiFrameStructure");
        jsonStructureObjArr = JSONTools.filterJSONByType(jsonObj.NIDocument, "MultiFrameStructure");
    });

    it("given key id in Multi-Frame Struture when Opened then ID must match JSON ID", () => {
        for (let i = 0; i < structureObjArr.length; i ++) {
            expect(structureObjArr[i].id).toBe(jsonStructureObjArr[i].ID);
        }
    });

    it("given key type in Multi-Frame Struture when Opened then Type must match JSON Type", () => {
        for (let i = 0; i < structureObjArr.length; i ++) {
            expect(structureObjArr[i].type).toBe(jsonStructureObjArr[i].Type);
        }
    });

    it("given key caseLength in Multi-Frame Struture when Opened then caseLength must match \
    with length of JSON Components", () => {
        for (let i = 0; i < structureObjArr.length; i ++) {
            const componentArr = structureObjArr[i].diagramArr;
            const jsonArr = jsonStructureObjArr[i].Components;
            expect(structureObjArr[i].caseLength).toBe(jsonArr.length);
        }
    });

    it("given key diagramArr in Multi-Frame Struture when Opened then component must match JSON Components", () => {
        for (let i = 0; i < structureObjArr.length; i ++) {
            const componentArr = structureObjArr[i].diagramArr;
            const jsonArr = jsonStructureObjArr[i].Components;
            expect(componentArr.length).toBe(jsonArr.length);
            for (let j = 0; j < componentArr.length; j++) {
                expect(componentArr[j].id).toBe(jsonArr[j].ID);
            }
        }
    });

    it("given key bounds in Multi-Frame Struture when Opened then component must match JSON Bounds", () => {
        for (let i = 0; i < structureObjArr.length; i ++) {
            expect(structureObjArr[i].bounds.x).toBe(jsonStructureObjArr[i].Bounds.x);
            expect(structureObjArr[i].bounds.y).toBe(jsonStructureObjArr[i].Bounds.y);
            expect(structureObjArr[i].bounds.w).toBe(jsonStructureObjArr[i].Bounds.w);
            expect(structureObjArr[i].bounds.h).toBe(jsonStructureObjArr[i].Bounds.h);
        }
    });

    it("given key selector bounds in Multi-Frame Struture when Opened then component must match \
    JSON Selector Bounds", () => {
        for (let i = 0; i < structureObjArr.length; i ++) {
            expect(structureObjArr[i].selectorBounds.x).toBe(jsonStructureObjArr[i].SelectorBounds.x);
            expect(structureObjArr[i].selectorBounds.y).toBe(jsonStructureObjArr[i].SelectorBounds.y);
            expect(structureObjArr[i].selectorBounds.w).toBe(jsonStructureObjArr[i].SelectorBounds.w);
            expect(structureObjArr[i].selectorBounds.h).toBe(jsonStructureObjArr[i].SelectorBounds.h);
        }
    });

    it("given key caseNameArr in Multi-Frame Struture when Opened then caseNameArr must match IDs of \
    JSON Components", () => {
        for (let i = 0; i < structureObjArr.length; i ++) {
            const componentArr = structureObjArr[i].caseNameArr;
            const jsonArr = jsonStructureObjArr[i].Components;
            expect(componentArr.length).toBe(jsonArr.length);
            for (let j = 0; j < componentArr.length; j++) {
                expect(componentArr[j]).toBe(jsonArr[j].ID);
            }
        }
    });
});
