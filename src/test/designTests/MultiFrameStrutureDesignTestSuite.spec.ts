import {} from "jasmine";
import { HTMLTools } from "../../../testAssets/tools/HTMLTools";
import { ImageTools } from "../../../testAssets/tools/ImageTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("MultiFrameStructureDesignTestSuite", () => {
    let viModel = null;
    let viDOM = null;
    let modelArr = null;
    let multiFrameArr = null;
    beforeAll( () => {
        const jsonObj = JSONTools.fetchJSON("NestedCaseStructure/NestedCaseStructure.json");
        expect(jsonObj).toBeDefined();
        viModel = generateModel(jsonObj, "testAssets\\json");
        expect(viModel).not.toBeNull();
        modelArr = filterModelByType(viModel, "MultiFrameStructure");
        viDOM = HTMLTools.getHTMLDOM(viModel);
        multiFrameArr = HTMLTools.filterByType(viDOM, "MultiFrameStructure");
    });

    it("Given multi-frame structure model when div is created then div must have corresponding position", () => {
        for (let i = 0; i < multiFrameArr.length; i++) {
            expect(multiFrameArr[i].style.left.slice(0, -2)).toBe(modelArr[i].bounds.x.toString());
            expect(multiFrameArr[i].style.top.slice(0, -2)).toBe(modelArr[i].bounds.y.toString());
        }
    });

    it("Given multi-frame structure model when div is created then div must have corresponding size", () => {
        for (let i = 0; i < multiFrameArr.length; i++) {
            expect(multiFrameArr[i].style.width.slice(0, -2)).toBe(modelArr[i].bounds.w.toString());
            expect(multiFrameArr[i].style.height.slice(0, -2)).toBe(modelArr[i].bounds.h.toString());
        }
    });

    it("Given multi-frame structure model when div is created then div must have \
    corresponding id and type", () => {
        for (let i = 0; i < multiFrameArr.length; i++) {
            expect(multiFrameArr[i].className).toBe(modelArr[i].id + " " + modelArr[i].type);
        }
    });

    it("Given multi-frame structure model when div is created then div must have \
    corresponding similar components", () => {
        for (let i = 0; i < multiFrameArr.length; i++) {
            const subDiagramArr = multiFrameArr[i].childNodes;
            const componentArr = modelArr[i].diagramArr;
            for (let j = 0; j < subDiagramArr.length - 1; j++) {
                expect(subDiagramArr[j].className).toBe(componentArr[j].id + " " + componentArr[j].type);
            }
        }
    });

    it("Given multi-frame structure model when div is created then label must exist", () => {
        for (const multiFrame of multiFrameArr) {
            const multiFrameLabel = multiFrame.getElementsByClassName("CaseStructureSelector")[0];
            expect(multiFrameLabel).toBeDefined();
        }
    });

    it("Given multi-frame structure label when div is created then selector must exist", () => {
        for (const multiFrame of multiFrameArr) {
            const multiFrameLabel = multiFrame.getElementsByClassName("CaseStructureSelector")[0];
            expect(multiFrameLabel).toBeDefined();
            const caseSelector = multiFrame.getElementsByClassName("CaseSelector")[0];
            expect(multiFrameLabel).toBeDefined();
        }
    });

    it("Given multi-frame structure label when div is created then toggles must exist", () => {
        for (const multiFrame of multiFrameArr) {
            const multiFrameLabel = multiFrame.getElementsByClassName("CaseStructureSelector")[0];
            expect(multiFrameLabel).toBeDefined();
            const leftToggle = multiFrame.getElementsByClassName("LeftToggle")[0];
            expect(leftToggle).toBeDefined();
            const rightToggle = multiFrame.getElementsByClassName("RightToggle")[0];
            expect(rightToggle).toBeDefined();
        }
    });

    it("Given multi-frame structure label when div is created then all options must match", () => {
        for (let i = 0; i < multiFrameArr.length; i++) {
            const multiFrameLabel = multiFrameArr[i].getElementsByClassName("CaseStructureSelector")[0];
            expect(multiFrameLabel).toBeDefined();
            const caseSelector = multiFrameArr[i].getElementsByClassName("CaseSelector")[0];
            expect(multiFrameLabel).toBeDefined();
            const caseArr = modelArr[i].caseNameArr;
            const optArr = caseSelector.getElementsByTagName("option");
            expect(optArr.length).toBe(caseArr.length);
            expect(caseSelector.selectedIndex).toBe(0);
            for (const opt of optArr) {
                expect(opt.innerHTML).toBeDefined(caseArr[i]);
            }
        }
    });

    it("Given multi-frame structure label when div is created then check default case is displayed", () => {
        for (const multiFrame of multiFrameArr) {
            const multiFrameLabel = multiFrame.getElementsByClassName("CaseStructureSelector")[0];
            const caseSelector = multiFrameLabel.getElementsByClassName("CaseSelector")[0];
            expect(caseSelector.selectedIndex).toBe(0);
            const subDiagramArr = multiFrame.childNodes;
            expect(subDiagramArr[0].style.display).toBe("inline-block");
            for (let i = 1; i < subDiagramArr.length - 1; i++) {
                expect(subDiagramArr[i].style.display).toBe("none");
            }
        }
    });

    it("Given multi-frame structure label when toggle left is clicked then previous div must be displayed", () => {
        for (const multiFrame of multiFrameArr) {
            const multiFrameLabel = multiFrame.lastChild;
            const toggler = multiFrameLabel.getElementsByClassName("LeftToggle")[0];
            const subDiagramArr = multiFrame.childNodes;
            const patternLen = subDiagramArr.length - 1;
            for (let i = 0; i < patternLen; i++) {
                toggler.click();
                for (let j = 0; j < patternLen; j++) {
                    if (j === (i + patternLen - 1) % patternLen) {
                        expect(subDiagramArr[j].style.display).toBe("inline-block");
                    } else {
                        expect(subDiagramArr[j].style.display).toBe("none");
                    }
                }
            }
        }
    });

    it("Given multi-frame structure label when toggle right is clicked then next div must be displayed", () => {
        for (const multiFrame of multiFrameArr) {
            const multiFrameLabel = multiFrame.lastChild;
            const toggler = multiFrameLabel.getElementsByClassName("RightToggle")[0];
            const subDiagramArr = multiFrame.childNodes;
            const patternLen = subDiagramArr.length - 1;
            for (let i = 0; i < patternLen; i++) {
                toggler.click();
                for (let j = 0; j < patternLen; j++) {
                    if (j === (i + patternLen + 1) % patternLen) {
                        expect(subDiagramArr[j].style.display).toBe("inline-block");
                    } else {
                        expect(subDiagramArr[j].style.display).toBe("none");
                    }
                }
            }
        }
    });
});
