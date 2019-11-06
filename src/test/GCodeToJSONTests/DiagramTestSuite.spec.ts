import {} from "jasmine";
import { ImageTools } from "../../../testAssets/tools/ImageTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";

describe("DiagramTestSuite", () => {
    let viObj = null;
    let diagramArr = null;
    beforeAll( () => {
        viObj = JSONTools.fetchJSON("NestedCaseStructure/NestedCaseStructure.json");
        expect(viObj).toBeDefined();
        diagramArr = JSONTools.filterJSONByType(viObj.NIDocument, "Diagram");
    });

    it("given Diagram in JSON when Opened then the Object must contain required keys ", () => {
        const niKeysArr = ["ID", "Type", "Image", "Bounds", "Components"];
        for (const diagram of diagramArr) {
            for (const key of niKeysArr) {
                expect(diagram[key]).toBeDefined();
            }
        }
    });

    it("given Diagram when Opened then ID must be of type string ", () => {
        for (const diagram of diagramArr) {
            expect(typeof(diagram.ID)).toBe("string");
        }
    });

    it("given key Image in Diagram when Opened then Image must exist and must have same bounds", () => {
        for (const diagram of diagramArr) {
            if (diagram.Image !== "") {
                const diagramImage = ImageTools.fetchImage(diagram.Image);
                diagramImage.onload = () => {
                    expect(diagram.Bounds.w).toBe(diagramImage.width);
                    expect(diagram.Bounds.h).toBe(diagramImage.height);
                };
            }
        }
    });

    it("given Diagram when Opened then Components must be of type Array", () => {
        for (const diagram of diagramArr) {
            expect(typeof(diagram.Components)).toBe("object");
        }
    });

    it("given Diagram when Opened then Components may have structures", () => {
        const fibObj = JSONTools.fetchJSON("fibonacci/fibonacci.json");
        expect(fibObj).toBeDefined();
        const fdiagramArr = JSONTools.filterJSONByType(fibObj.NIDocument, "Diagram");
        const structureArr = [];
        for (const diagram of fdiagramArr) {
            for (const component of diagram.Components) {
                if (component.Type === "Structure") {
                    structureArr.push(component.ID);
                }
            }
        }
        expect(structureArr).not.toEqual([]);
    });

    it("given Diagram when Opened then Components may have multi frame structures", () => {
        const structureArr = [];
        for (const diagram of diagramArr) {
            for (const component of diagram.Components) {
                if (component.Type === "MultiFrameStructure") {
                    structureArr.push(component.ID);
                }
            }
        }
        expect(structureArr).not.toEqual([]);
    });

    it("given Diagram when Opened then Components may have Flat Sequence structures", () => {
        const flObj = JSONTools.fetchJSON("FlatSequence/FlatSequence.json");
        expect(flObj).toBeDefined();
        const fdiagramArr = JSONTools.filterJSONByType(flObj.NIDocument, "Diagram");
        const structureArr = [];
        for (const diagram of fdiagramArr) {
            for (const component of diagram.Components) {
                if (component.Type === "FlatSequence") {
                    structureArr.push(component.ID);
                }
            }
        }
        expect(structureArr).not.toEqual([]);
    });
});
