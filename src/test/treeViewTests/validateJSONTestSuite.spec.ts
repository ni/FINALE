import {  } from "jasmine";
import { JSONTools } from "../../../testAssets/tools/JSONTools";

describe("validateJSONTestSuite", () => {
  it("check if JSON reflects directory structure", () => {
    const testJSON = JSONTools.fetchJSON("testFiles.json");
    expect(testJSON).toBeDefined();
    let testJSONfileArr = [];
    testJSONfileArr = testJSONfileArr.concat(JSONTools.filterFiles(testJSON));
    let testJSONFileNames = [];
    for (const file of testJSONfileArr) {
        testJSONFileNames = testJSONFileNames.concat(file.name);
    }
    testJSONFileNames = testJSONFileNames.sort();
    // console.log(JSONFileNames);
    const fileStructure = (JSONTools.fetchJSON("filesInDir.json"));
    expect(fileStructure).toBeDefined();
    let filesInDir = fileStructure.files;
    filesInDir = filesInDir.sort();
    // console.log(filesInDir);

    expect(testJSONFileNames).toEqual(filesInDir);
    // const filesInDir = JSONTools.filterFiles(fileNames);
  });
});
