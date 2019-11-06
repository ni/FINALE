import { } from "jasmine";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("EnumModelTestSuite", () => {
    let jsonObj = null;
    let enumArr = null;
    let jsonEnumArr = null;
    beforeAll(() => {
        jsonObj = JSONTools.fetchJSON("BlockDigramToJson/metadata.json");
        const niDocObj = generateModel(jsonObj, "testAssets\\json");
        enumArr = filterModelByType(niDocObj, "Enum");
        jsonEnumArr = JSONTools.filterJSONByType(jsonObj.NIDocument, "Enum");
    });

    it("Given key id in enum array when opened must match JSON ID", () => {
        for (let i = 0; i < enumArr.length; i++) {
            expect(enumArr[i].id).toEqual(jsonEnumArr[i].ID);
        }
    });

    it("Given key type in enum array when opened must match JSON Type", () => {
        for (let i = 0; i < enumArr.length; i++) {
            expect(enumArr[i].type).toEqual(jsonEnumArr[i].Type);
        }
    });

    it("Given key bounds in enum array when opened must match JSON Bounds", () => {
        for (let i = 0; i < enumArr.length; i++) {
            expect(enumArr[i].bounds).toEqual(jsonEnumArr[i].Bounds);
        }
    });

    it("Given key values in enum array when opened must match JSON Values", () => {
        for (let i = 0; i < enumArr.length; i++) {
            for (let j = 0; j < enumArr.values.length; j++) {
                expect(enumArr[i].values[j]).toEqual(jsonEnumArr[i].Values[j]);
            }
        }
    });
});
