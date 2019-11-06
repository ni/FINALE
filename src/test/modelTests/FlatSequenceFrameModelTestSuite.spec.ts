import {} from "jasmine";
import { VirtualInstrument } from "../../../src/script/model/Model";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("FlatSequenceFrameModelTestSuite", () => {
    let jsonObj = null;
    let structureObjArr = null;
    let jsonStructureObjArr = null;
    beforeAll( () => {
        jsonObj = JSONTools.fetchJSON("FlatSequence\\FlatSequence.json");
        const niDocObj = generateModel(jsonObj, "testAssets\\json");
        structureObjArr = filterModelByType(niDocObj, "FlatSequenceFrame");
        jsonStructureObjArr = JSONTools.filterJSONByType(jsonObj.NIDocument, "FlatSequenceFrame");
    });

    it("given key id in Structure when Opened then ID must match JSON ID", () => {
        for (let i = 0; i < structureObjArr.length; i ++) {
            expect(structureObjArr[i].id).toBe(jsonStructureObjArr[i].ID);
        }
    });

    it("given key type in Structure when Opened then Type must match JSON Type", () => {
        for (let i = 0; i < structureObjArr.length; i ++) {
            expect(structureObjArr[i].type).toBe(jsonStructureObjArr[i].Type);
        }
    });

    it("given key components in Structure when Opened then component must match JSON Components", () => {
        for (let i = 0; i < structureObjArr.length; i ++) {
            const componentArr = [structureObjArr[i].diagram];
            const jsonArr = jsonStructureObjArr[i].Components;
            expect(componentArr.length).toBe(jsonArr.length);
            for (let j = 0; j < componentArr.length; j++) {
                expect(componentArr[j].id).toBe(jsonArr[j].ID);
            }
        }
    });

    it("given key bounds in Structure when Opened then component must match JSON Bounds", () => {
        for (let i = 0; i < structureObjArr.length; i ++) {
            expect(structureObjArr[i].bounds.x).toBe(jsonStructureObjArr[i].Bounds.x);
            expect(structureObjArr[i].bounds.y).toBe(jsonStructureObjArr[i].Bounds.y);
            expect(structureObjArr[i].bounds.w).toBe(jsonStructureObjArr[i].Bounds.w);
            expect(structureObjArr[i].bounds.h).toBe(jsonStructureObjArr[i].Bounds.h);
        }
    });

});
