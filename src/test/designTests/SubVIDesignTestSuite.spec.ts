import {} from "jasmine";
import { HTMLTools } from "../../../testAssets/tools/HTMLTools";
import { ImageTools } from "../../../testAssets/tools/ImageTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("SubVIDesignTestSuite", () => {
    let viModel = null;
    let viDOM = null;
    let modelArr = null;
    let subVIArr = null;
    beforeAll( () => {
        const jsonObj = JSONTools.fetchJSON("fibonacci/fibonacci.json");
        expect(jsonObj).toBeDefined();
        viModel = generateModel(jsonObj, "\\testAssets\\json");
        expect(viModel).not.toBeNull();
        modelArr = filterModelByType(viModel, "SubVI");
        viDOM = HTMLTools.getHTMLDOM(viModel);
        subVIArr = HTMLTools.filterByType(viDOM, "SubVI");
    });

    it("Given SubVI model when div is created then div must have corresponding position", () => {
        for (let i = 0; i < subVIArr.length; i++) {
            expect(subVIArr[i].style.left.slice(0, -2)).toBe(modelArr[i].bounds.x.toString());
            expect(subVIArr[i].style.top.slice(0, -2)).toBe(modelArr[i].bounds.y.toString());
        }
    });

    it("Given SubVI model when div is created then div must have corresponding size", () => {
        for (let i = 0; i < subVIArr.length; i++) {
            expect(subVIArr[i].style.width.slice(0, -2)).toBe(modelArr[i].bounds.w.toString());
            expect(subVIArr[i].style.height.slice(0, -2)).toBe(modelArr[i].bounds.h.toString());
        }
    });

    it("Given SubVI model when div is created then div must have corresponding id and type", () => {
        for (let i = 0; i < subVIArr.length; i++) {
            expect(subVIArr[i].className).toBe(modelArr[i].id + " " + modelArr[i].type);
        }
    });
});
