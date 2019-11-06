import {} from "jasmine";
import { VirtualInstrument } from "../../../src/script/model/Model";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("SubVIModelTestSuite", () => {
    let jsonObj = null;
    let subVIObjArr = null;
    let jsonSubVIObjArr = null;
    beforeAll( () => {
        jsonObj = JSONTools.fetchJSON("SubVI\\SubVI.json");
        const niDocObj = generateModel(jsonObj, "testAssets\\json");
        subVIObjArr = filterModelByType(niDocObj, "SubVI");
        jsonSubVIObjArr = JSONTools.filterJSONByType(jsonObj.NIDocument, "SubVI");
    });

    it("given key id in Structure when Opened then ID must match JSON ID", () => {
        for (let i = 0; i < subVIObjArr.length; i ++) {
            expect(subVIObjArr[i].id).toBe(jsonSubVIObjArr[i].ID);
        }
    });

    it("given key type in Structure when Opened then Type must match JSON Type", () => {
        for (let i = 0; i < subVIObjArr.length; i ++) {
            expect(subVIObjArr[i].type).toBe(jsonSubVIObjArr[i].Type);
        }
    });

    it("given key bounds in Structure when Opened then component must match JSON Bounds", () => {
        for (let i = 0; i < subVIObjArr.length; i ++) {
            expect(subVIObjArr[i].bounds.x).toBe(jsonSubVIObjArr[i].Bounds.x);
            expect(subVIObjArr[i].bounds.y).toBe(jsonSubVIObjArr[i].Bounds.y);
            expect(subVIObjArr[i].bounds.w).toBe(jsonSubVIObjArr[i].Bounds.w);
            expect(subVIObjArr[i].bounds.h).toBe(jsonSubVIObjArr[i].Bounds.h);
        }
    });

    it("given key jsonPath in Structure when Opened then jsonPath must match JSON File_path", () => {
        for (let i = 0; i < subVIObjArr.length; i ++) {
            expect(subVIObjArr[i].jsonPath).toBe(jsonSubVIObjArr[i].File_path);
        }
    });

});
