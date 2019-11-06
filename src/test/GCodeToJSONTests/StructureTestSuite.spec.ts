import {} from "jasmine";
import { ImageTools } from "../../../testAssets/tools/ImageTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";

describe("StructureTestSuite", () => {
    let viObj = null;
    let structureArr = null;
    beforeAll( () => {
        viObj = JSONTools.fetchJSON("fibonacci/fibonacci.json");
        expect(viObj).toBeDefined();
        structureArr = JSONTools.filterJSONByType(viObj.NIDocument, "Structure");
    });

    it("given Structure in JSON when Opened then the Object must contain required keys ", () => {
        const niKeysArr = ["ID", "Type", "Bounds", "Components"];
        for (const structure of structureArr) {
            for (const key of niKeysArr) {
                expect(structure[key]).toBeDefined();
            }
        }
    });

    it("given key ID in Structure when Opened then ID must be of type string ", () => {
        for (const structure of structureArr) {
            expect(typeof(structure.ID)).toBe("string");
        }
    });

    it("given key Components in Structure when Opened then Components must be of type Array", () => {
        for (const structure of structureArr) {
            expect(typeof(structure.Components)).toBe("object");
            expect(structure.Components.length).toBe(1);
            expect(structure.Components[0].Type).toBe("Diagram");
        }
    });
});
