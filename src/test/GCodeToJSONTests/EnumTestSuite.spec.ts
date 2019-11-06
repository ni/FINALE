import {  } from "jasmine";
import { JSONTools } from "../../../testAssets/tools/JSONTools";

describe("EnumTestSuite", () => {
    let viObj = null;
    let enumArr = null;
    beforeAll( () => {
        viObj = JSONTools.fetchJSON("BlockDigramToJson/metadata.json");
        expect(viObj).toBeDefined();
        enumArr = JSONTools.filterJSONByType(viObj.NIDocument, "Enum");
    });

    it("given Enum in JSON when Opened then the Object must contain required keys ", () => {
        const niKeysArr = ["ID", "Type", "Bounds", "Values"];
        for (const component of enumArr) {
            for (const key of niKeysArr) {
                expect(component[key]).toBeDefined();
            }
        }
    });

    it("given Enum when Opened then ID must be of type string ", () => {
        for (const component of enumArr) {
            expect(typeof(component.ID)).toBe("string");
        }
    });

    it("given Enum when Opened then Values must be of type Array", () => {
        for (const component of enumArr) {
            expect(typeof(component.Values)).toBe("object");
        }
    });
});
