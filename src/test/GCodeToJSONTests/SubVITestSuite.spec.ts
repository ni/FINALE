import {} from "jasmine";
import { ImageTools } from "../../../testAssets/tools/ImageTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";

describe("SubVITestSuite", () => {
    let viObj = null;
    let subVIArr = null;
    beforeAll( () => {
        viObj = JSONTools.fetchJSON("SubVI/SubVI.json");
        expect(viObj).toBeDefined();
        subVIArr = JSONTools.filterJSONByType(viObj.NIDocument, "SubVI");
    });

    it("given SubVI in JSON when Opened then the Object must contain required keys ", () => {
        const niKeysArr = ["ID", "Type", "Bounds", "File_path"];
        for (const subVI of subVIArr) {
            for (const key of niKeysArr) {
                expect(subVI[key]).toBeDefined();
            }
        }
    });

    it("given key ID in SubVI when Opened then ID must be of type string ", () => {
        for (const subVI of subVIArr) {
            expect(typeof(subVI.ID)).toBe("string");
        }
    });
});
