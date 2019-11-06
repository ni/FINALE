import {  } from "jasmine";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { generateModel } from "../../../testAssets/tools/ModelTools";
import { PolymorphicVI } from "../../script/model/PolymorphicVI";

describe("PolymorphicVIModelTestSuite", () => {
    let jsonObj = null;
    let polyVI = null;

    beforeAll( () => {
        jsonObj = JSONTools.fetchJSON("PolyType/PolyType.json");
        expect(jsonObj).toBeDefined();
        polyVI = new PolymorphicVI();
        polyVI.parse(jsonObj);
    });

    it("given key id in PolymorphicVI when Opened then ID must match JSON ID", () => {
        expect(polyVI.id).toEqual(jsonObj.ID);
    });

    it("given key type in PolymorphicVI when Opened then ID must match JSON Type", () => {
        expect(polyVI.type).toEqual(jsonObj.Type);
    });

    it("given key path in PolymorphicVI when Opened then ID must match JSON Path", () => {
        expect(polyVI.path).toEqual(jsonObj.Path);
    });

    it("given key components in PolymorphicVI when Opened then ID must match JSON Components", () => {
        for (let i = 0; i < polyVI.components.length; i++) {
            expect(polyVI.components[i].id).toEqual(jsonObj.Components[i].ID);
            expect(polyVI.components[i].type).toEqual(jsonObj.Components[i].Type);
            expect(polyVI.components[i].path).toEqual(jsonObj.Components[i].Path);
        }
    });
});
