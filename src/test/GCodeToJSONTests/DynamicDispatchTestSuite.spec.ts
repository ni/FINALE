import {} from "jasmine";
import { ImageTools } from "../../../testAssets/tools/ImageTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";

describe("DynamicDispatchTestSuite", () => {
    let viObj = null;
    let subVIArr = null;
    beforeAll( () => {
        // testAssets\json\Dynamic\Dynamic Dispatching\Dynamic Dispatching.json
        viObj = JSONTools.fetchJSON("Dynamic/Dynamic Dispatching/Dynamic Dispatching.json");
        expect(viObj).toBeDefined();
        subVIArr = JSONTools.filterJSONByType(viObj.NIDocument, "DynamicDispatchSubVI");
    });

    it("given Dynamic Dispatch SubVI in JSON when Opened then the Object must contain required keys ", () => {
        const niKeysArr = ["ID", "Type", "Bounds", "BaseVi", "BaseClass", "DerivedVi", "DerivedClass"];
        for (const subVI of subVIArr) {
            for (const key of niKeysArr) {
                expect(subVI[key]).toBeDefined();
            }
        }
    });

    it("given key ID in Dynamic Dispatch SubVI when Opened then ID must be of type string ", () => {
        for (const subVI of subVIArr) {
            expect(typeof(subVI.ID)).toBe("string");
        }
    });

    it("given key Type in Dynamic Dispatch SubVI when Opened then Type must be of type string ", () => {
        for (const subVI of subVIArr) {
            expect(typeof(subVI.Type)).toBe("string");
            expect(subVI.Type).toBe("DynamicDispatchSubVI");
        }
    });

    it("given key BaseVi in Dynamic Dispatch SubVI when Opened then BaseVi must be of type string ", () => {
        for (const subVI of subVIArr) {
            const baseVIID = subVI.BaseVi;
            expect(typeof(baseVIID)).toBe("string");
            const baseVI = baseVIID.split(":")[1];
            const viID: string = subVI.ID;
            const referringVI = viID.split(":")[1];
            expect(baseVI).toBe(referringVI);
        }
    });

    it("given key DerivedVi in Dynamic Dispatch SubVI when Opened then DerivedVi must be of type object ", () => {
        for (const subVI of subVIArr) {
            const baseVIIDs = subVI.DerivedVi;
            expect(typeof(baseVIIDs)).toBe("object");
            const viID: string = subVI.ID;
            const referringVI = viID.split(":")[1];
            for ( const baseVIID of baseVIIDs) {
                const baseVI = baseVIID.split(":")[1];
                expect(baseVI).toBe(referringVI);
            }
        }
    });
});
