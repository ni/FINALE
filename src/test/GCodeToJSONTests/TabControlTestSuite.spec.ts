import {} from "jasmine";
import { ImageTools } from "../../../testAssets/tools/ImageTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";

describe("TabControlTestSuite", () => {
    let viObj = null;
    let tabControlArr = null;
    beforeAll( () => {
        viObj = JSONTools.fetchJSON("tabTest/metadata.json");
        expect(viObj).toBeDefined();
        tabControlArr = JSONTools.filterJSONByType(viObj.NIDocument, "TabControl");
    });

    it("given TabControl in JSON when Opened then the Object must contain required keys ", () => {
        const niKeysArr = ["ID", "Type", "Bounds", "TabLocation", "Components"];
        for (const component of tabControlArr) {
            for (const key of niKeysArr) {
                expect(component[key]).toBeDefined();
            }
        }
    });

    it("given TabControl when Opened then ID must be of type string ", () => {
        for (const component of tabControlArr) {
            expect(typeof(component.ID)).toBe("string");
        }
    });

    it("given key Image in TabControl when Opened then Image must exist and must have same bounds", () => {
        for (const component of tabControlArr) {
            if (component.Image !== "") {
                const diagramImage = ImageTools.fetchImage(component.Image);
                diagramImage.onload = () => {
                    expect(component.Bounds.w).toBe(diagramImage.width);
                    expect(component.Bounds.h).toBe(diagramImage.height);
                };
            }
        }
    });

    it("given TabControl when Opened then Components must be of type Array", () => {
        for (const component of tabControlArr) {
            expect(typeof(component.Components)).toBe("object");
        }
    });

    it("given TabControl when Opened then Components may have diagrams", () => {
        const diagramArr = [];
        for (const tabObj of tabControlArr) {
            for (const component of tabObj.Components) {
                if (component.Type === "Diagram") {
                    diagramArr.push(component.ID);
                }
            }
        }
        expect(diagramArr).not.toEqual([]);
    });
});
