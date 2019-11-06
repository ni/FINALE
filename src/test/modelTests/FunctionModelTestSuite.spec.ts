import {  } from "jasmine";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("FunctionModelTestSuite", () => {
    let jsonObj = null;
    let functionArr = null;
    let jsonFunctionArr = null;

    beforeAll( () => {
        jsonObj = JSONTools.fetchJSON("CloseWrapper/metadata.json");
        const niDocObj = generateModel(jsonObj, "testAssets\\json");
        functionArr = filterModelByType(niDocObj, "Function");
        jsonFunctionArr = JSONTools.filterJSONByType(jsonObj.NIDocument, "Function");
    });

    it("Given key id in Function array when opened must match JSON ID", () => {
        for (let i = 0; i < functionArr.length; i++) {
            expect(functionArr[i].id).toEqual(jsonFunctionArr[i].ID);
        }
    });

    it("Given key type in Function array when opened must match JSON Type", () => {
        for (let i = 0; i < functionArr.length; i++) {
            expect(functionArr[i].type).toEqual(jsonFunctionArr[i].Type);
        }
    });

    it("Given key bounds in Function array when opened must match JSON Bounds", () => {
        for (let i = 0; i < functionArr.length; i++) {
            expect(functionArr[i].bounds).toEqual(jsonFunctionArr[i].Bounds);
        }
    });

});
