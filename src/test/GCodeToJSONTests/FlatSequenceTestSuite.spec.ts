import {} from "jasmine";
import { ImageTools } from "../../../testAssets/tools/ImageTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";

describe("FlatSequenceTestSuite", () => {
    let viObj = null;
    let structureArr = null;
    beforeAll( () => {
        viObj = JSONTools.fetchJSON("FlatSequence/FlatSequence.json");
        expect(viObj).toBeDefined();
        structureArr = JSONTools.filterJSONByType(viObj.NIDocument, "FlatSequence");
    });

    it("given Flat Sequence in JSON when Opened then the Object must contain required keys ", () => {
        const niKeysArr = ["ID", "Type", "Bounds", "Components"];
        for (const structure of structureArr) {
            for (const key of niKeysArr) {
                expect(structure[key]).toBeDefined();
            }
        }
    });

    it("given Flat Sequence in JSON when Opened then the Flat Sequence Frame must contain required keys ", () => {
        const niKeysArr = ["ID", "Type", "Bounds", "Components"];
        for (const structure of structureArr) {
            expect(typeof(structure.Components)).toBe("object");
            for (const frame of structure.Components) {
                expect(frame.Type).toBe("FlatSequenceFrame");
                for (const key of niKeysArr) {
                    expect(frame[key]).toBeDefined();
                }
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
            for (const frame of structure.Components) {
                expect(frame.Type).toBe("FlatSequenceFrame");
                expect(frame.Components.length).toBe(1);
                expect(frame.Components[0].Type).toBe("Diagram");
            }
        }
    });
});
