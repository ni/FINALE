import {} from "jasmine";
import { VirtualInstrument } from "../../../src/script/model/Model";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("NIDocumentModelTestSuite", () => {
    let jsonObj = null;
    let niDocObj = null;
    let jsonNIDocObj = null;
    beforeAll( () => {
        jsonObj = JSONTools.fetchJSON("NestedCaseStructure/NestedCaseStructure.json");
        niDocObj = generateModel(jsonObj, "testAssets/json/");
        jsonNIDocObj = jsonObj.NIDocument;
    });

    it("given a JSON when Opened then the JSON must contain a VirtualInstrument object ", () => {
        expect(jsonNIDocObj).not.toBe([]);
    });

    it("given key id in VirtualInstrument when Opened then ID must match JSON ID", () => {
        expect(niDocObj.id).toBe(jsonNIDocObj.ID);
        expect(niDocObj.viName).toBe(jsonNIDocObj.ID);
    });

    it("given key type in VirtualInstrument when Opened then Type must match JSON Type", () => {
        expect(niDocObj.type).toBe(jsonNIDocObj.Type);
    });

    it("given key components in VirtualInstrument when Opened then component must match JSON Components", () => {
        const componentArr = niDocObj.components;
        const jsonArr = jsonNIDocObj.Components;
        expect(componentArr.length).toBe(jsonArr.length);
        for (let j = 0; j < componentArr.length; j++) {
            expect(componentArr[j].id).toBe(jsonArr[j].ID);
        }
    });

    it("given key originPath in VirtualInstrument when Opened then originPath must reflected path of JSON", () => {
        expect(VirtualInstrument.originPath).toBe("testAssets/json/");
    });

});
