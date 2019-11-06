import {} from "jasmine";
import { ImageTools } from "../../../testAssets/tools/ImageTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";

describe("MultiFrameStrutureTestSuite", () => {
    let viObj = null;
    let structureArr = null;
    beforeAll( () => {
        viObj = JSONTools.fetchJSON("NestedCaseStructure/NestedCaseStructure.json");
        expect(viObj).toBeDefined();
        structureArr = JSONTools.filterJSONByType(viObj.NIDocument, "MultiFrameStructure");
    });

    it("given Multi Frame Structure in JSON when Opened then the Object must contain required keys ", () => {
        const niKeysArr = ["ID", "Type", "Bounds", "SelectorBounds", "Components"];
        for (const structure of structureArr) {
            for (const key of niKeysArr) {
                expect(structure[key]).toBeDefined();
            }
        }
    });

    it("given key ID in Multi Frame Structure when Opened then ID must be of type string ", () => {
        for (const structure of structureArr) {
            expect(typeof(structure.ID)).toBe("string");
        }
    });

    it("given key Components in Multi Frame Structure when Opened then Components must be of type Array", () => {
        for (const structure of structureArr) {
            expect(typeof(structure.Components)).toBe("object");
            for (const pattern of structure.Components) {
                expect(pattern.Type).toBe("Diagram");
                expect(pattern.ID).not.toBe("");
                const diagramImage = ImageTools.fetchImage(pattern.Image);
                diagramImage.onload = () => {
                    expect(pattern.Bounds.w).toBe(diagramImage.width);
                    expect(pattern.Bounds.h).toBe(diagramImage.height);
                };
            }
        }
    });

    it("given Event Structure in JSON when Opened then the JSON must be valid with double quotes ", () => {
        const evtViObj = JSONTools.fetchJSON("Specialized/Event_Structures/Event_Structures.json");
        expect(evtViObj).toBeDefined();
    });

    it("given Sequence Structure in JSON when Opened then verify pattern ", () => {
        const seqViObj = JSONTools.fetchJSON("Specialized/Stacked_Sequence/Stacked_Sequence.json");
        expect(seqViObj).toBeDefined();
        const seqArr = JSONTools.filterJSONByID(seqViObj.NIDocument, "Sequence");
        for (const structure of seqArr) {
            expect(typeof(structure.Components)).toBe("object");
            // for (const pattern of structure.Components) {
            for (let i = 0; i < structure.Components.length; i++) {
                expect(structure.Components[i].Type).toBe("Diagram");
                expect(structure.Components[i].ID).toBe(i + " [0.." + structure.Components.length + "]");
                const diagramImage = ImageTools.fetchImage(structure.Components[i].Image);
                diagramImage.onload = () => {
                    expect(structure.Components[i].Bounds.w).toBe(diagramImage.width);
                    expect(structure.Components[i].Bounds.h).toBe(diagramImage.height);
                };
            }
        }
    });

});
