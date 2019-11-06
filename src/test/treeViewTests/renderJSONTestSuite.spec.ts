import { } from "jasmine";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { TreeHelper } from "../../script/treeView/lib/aimaratree";
import { File } from "../../script/treeView/lib/file";

describe("renderJSONTestSuite", () => {
    it("given JSON when rendered must equal the parsed JSON", () => {
        const json = JSONTools.fetchJSON("file.json");
        File.jsonObj = json;
        expect(json).toBeDefined();
        const dirTree = new TreeHelper("divTree", "white", null, "tree");
        const rootNode = dirTree.directoryTreeView(json);
        expect(rootNode.id).toEqual(json.name);
        const treeFileNames = JSONTools.filterDOMNames(rootNode).sort();
        const JSONFileNames = JSONTools.filterJSONNames(json).sort();
        for (let i = 0; i < treeFileNames.length; i++) {
            expect(treeFileNames[i]).toEqual(JSONFileNames[i]);
        }
    });
});
