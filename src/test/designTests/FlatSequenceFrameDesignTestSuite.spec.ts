import {} from "jasmine";
import { HTMLTools } from "../../../testAssets/tools/HTMLTools";
import { ImageTools } from "../../../testAssets/tools/ImageTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("FlatSequenceFrameDesignTestSuite", () => {
    let viModel = null;
    let viDOM = null;
    let modelArr = null;
    let flatSeqArr = null;
    beforeAll( () => {
        const jsonObj = JSONTools.fetchJSON("FlatSequence/FlatSequence.json");
        expect(jsonObj).toBeDefined();
        viModel = generateModel(jsonObj, "testAssets\\json");
        expect(viModel).not.toBeNull();
        modelArr = filterModelByType(viModel, "FlatSequenceFrame");
        viDOM = HTMLTools.getHTMLDOM(viModel);
        flatSeqArr = HTMLTools.filterByType(viDOM, "FlatSequenceFrame");
    });

    it("Given flat sequence model when div is created then div must have corresponding position", () => {
        for (let i = 0; i < flatSeqArr.length; i++) {
            expect(flatSeqArr[i].style.left.slice(0, -2)).toBe(modelArr[i].bounds.x.toString());
            expect(flatSeqArr[i].style.top.slice(0, -2)).toBe(modelArr[i].bounds.y.toString());
        }
    });

    it("Given flat sequence model when div is created then div must have corresponding size", () => {
        for (let i = 0; i < flatSeqArr.length; i++) {
            expect(flatSeqArr[i].style.width.slice(0, -2)).toBe(modelArr[i].bounds.w.toString());
            expect(flatSeqArr[i].style.height.slice(0, -2)).toBe(modelArr[i].bounds.h.toString());
        }
    });

    it("Given flat sequence model when div is created then div must have corresponding id and type", () => {
        for (let i = 0; i < flatSeqArr.length; i++) {
            expect(flatSeqArr[i].className).toBe(modelArr[i].id + " " + modelArr[i].type);
        }
    });

    it("Given flat sequence model when div is created then div must have corresponding similar components", () => {
        for (let i = 0; i < flatSeqArr.length; i++) {
            const subDiagramArr = flatSeqArr[i].childNodes;
            const componentArr = [modelArr[i].diagram];
            for (let j = 0; j < subDiagramArr.length; j++) {
                expect(subDiagramArr[j].className).toBe(componentArr[j].id + " " + componentArr[j].type);
            }
        }
    });
});
