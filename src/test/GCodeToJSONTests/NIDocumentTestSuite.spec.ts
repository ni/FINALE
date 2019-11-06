import {} from "jasmine";
import { ImageTools } from "../../../testAssets/tools/ImageTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";

describe("NIDocumentTestSuite", () => {
    let viObj = null;
    beforeAll( () => {
        viObj = JSONTools.fetchJSON("NestedCaseStructure/NestedCaseStructure.json");
        expect(viObj).toBeDefined();
    });
    it("given a JSON when Opened then the JSON must contain a NIDocument ", () => {
        const niDocObj = viObj.NIDocument;
        expect(niDocObj).toBeDefined();
    });

    it("given NIDocument in JSON when Opened then the Object must contain required keys ", () => {
        const niDocObj = viObj.NIDocument;
        const niKeysArr = ["ID", "Type", "Components"];
        for (const key of niKeysArr) {
            expect(niDocObj[key]).toBeDefined();
        }
    });

    it("given key ID in NIDocument when Opened then ID must be of type string ", () => {
        const niDocObj = viObj.NIDocument;
        expect(typeof(niDocObj.ID)).toBe("string");
    });

    it("given key Type in NIDocument when Opened then Type must be of type string and value VirtualInstrument", () => {
        const niDocObj = viObj.NIDocument;
        expect(typeof(niDocObj.Type)).toBe("string");
        expect(niDocObj.Type).toBe("VirtualInstrument");
    });

    it("given key Components in NIDocument when Opened then Components must be of type Array", () => {
        const niDocObj = viObj.NIDocument;
        expect(typeof(niDocObj.Components)).toBe("object");
    });

    it("given blank VI when Opened then verify NIDocument Components", () => {
        const blankVIObj = JSONTools.fetchJSON("empty/empty.json");
        const niDocObj = blankVIObj.NIDocument;
        expect(niDocObj).toBeDefined();
        const niComponentArr = niDocObj.Components;
        expect(niComponentArr).toBeDefined();
    });

    it("given blank VI with NIDocument when Opened then verify front panel and block diagram", () => {
        const blankVIObj = JSONTools.fetchJSON("empty/empty.json");
        const niDocObj = blankVIObj.NIDocument;
        expect(niDocObj).toBeDefined();
        const niComponentArr = niDocObj.Components;
        expect(niComponentArr).toBeDefined();
        for (const niComponent of niComponentArr) {
            if (niComponent.ID === "FrontPanel") {
                const fPanelImage = ImageTools.fetchImage(niComponent.Image);
                fPanelImage.onload = () => {
                    expect(fPanelImage.width).toBe(niComponent.Bounds.w);
                    expect(fPanelImage.height).toBe(niComponent.Bounds.h);
                };
            } else {
                expect(niComponent.Image).toBe("");
            }
        }
    });

    it("given non-blank VI with NIDocument when Opened then verify front panel and block diagram", () => {
        const niDocObj = viObj.NIDocument;
        expect(niDocObj).toBeDefined();
        const niComponentArr = niDocObj.Components;
        expect(niComponentArr).toBeDefined();
        for (const niComponent of niComponentArr) {
            if (niComponent.ID === "FrontPanel") {
                const fPanelImage = ImageTools.fetchImage(niComponent.Image);
                fPanelImage.onload = () => {
                    expect(fPanelImage.width).toBe(niComponent.Bounds.w);
                    expect(fPanelImage.height).toBe(niComponent.Bounds.h);
                };
            } else {
                const bDiagramImage = ImageTools.fetchImage(niComponent.Image);
                bDiagramImage.onload = () => {
                    expect(bDiagramImage.width).toBe(niComponent.Bounds.w);
                    expect(bDiagramImage.height).toBe(niComponent.Bounds.h);
                };
            }
        }
    });

});
