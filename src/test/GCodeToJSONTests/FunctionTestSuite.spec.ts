import {  } from "jasmine";
import { JSONTools } from "../../../testAssets/tools/JSONTools";

describe("FunctionTestSuite", () => {
    let viObj = null;
    let functionArr = null;
    beforeAll( () => {
        viObj = JSONTools.fetchJSON("CloseWrapper/metadata.json");
        expect(viObj).toBeDefined();
        functionArr = JSONTools.filterJSONByType(viObj.NIDocument, "Function");

        // jsonObj = JSONTools.fetchJSON("CloseWrapper/metadata.json");
        // const niDocObj = generateModel(jsonObj, "testAssets\\json");
        // functionArr = filterModelByType(niDocObj, "Function");
        // jsonFunctionArr = JSONTools.filterJSONByType(jsonObj.NIDocument, "Function");
    });

    it("given Enum in JSON when Opened then the Object must contain required keys ", () => {
        const niKeysArr = ["ID", "Type", "Bounds"];
        for (const component of functionArr) {
            for (const key of niKeysArr) {
                expect(component[key]).toBeDefined();
            }
        }
    });

    it("given key ID in SubVI when Opened then ID must be of type string ", () => {
        for (const component of functionArr) {
            expect(typeof(component.ID)).toBe("string");
        }
    });
});
