import * as model from "../../src/script/model/Model";

export function generateModel(jsonObj, originPath) {
    const viObj: model.VirtualInstrument = new model.VirtualInstrument();
    model.VirtualInstrument.originPath = originPath;
    viObj.parse(jsonObj.NIDocument);
    return viObj;
}

export function filterModelByType(modelObj, type) {
    let componentObjArr = [];
    const components = getRelatedComponentArr(modelObj);
    if (components) {
        for (const component of components) {
            if (component.type === type) {
                // console.log(component);
                componentObjArr.push(component);
            }
            componentObjArr = componentObjArr.concat(filterModelByType(component, type));
        }
    }
    // console.log(componentObjArr);
    return componentObjArr;
}

export function filterModelByID(modelObj, id) {
    let componentObjArr = [];
    const components = getRelatedComponentArr(modelObj);
    for (const component of components) {
        if (component.id === id) {
            componentObjArr.push(component);
        }
        componentObjArr = componentObjArr.concat(filterModelByType(component, id));
    }
    return componentObjArr;
}

export function filterLVClassFiles(modelObj) {
    let componentObjArr = [];
    const components = getRelatedComponentArr(modelObj);
    if (components) {
        for (const component of components) {
            if (component.type !== "Folder" && component.type !== "Property Definition") {
                componentObjArr.push(component);
            }
            componentObjArr = componentObjArr.concat(filterLVClassFiles(component)); // , type));
        }
    }
    // console.log(componentObjArr);
    return componentObjArr;
}

function getRelatedComponentArr(modelObj) {
    switch (modelObj.type) {
        case "VirtualInstrument": return modelObj.components;
        case "Diagram": return modelObj.componentArr;
        case "Structure": return [modelObj.diagram];
        case "SubVI": return [];
        case "MultiFrameStructure": return modelObj.diagramArr;
        case "FlatSequence": return modelObj.frameArr;
        case "FlatSequenceFrame": return [modelObj.diagram];
        case "DynamicDispatchSubVI": return [];
        case "TabControl": return modelObj.diagramArr;
        case "Enum": return modelObj.components;
        case "LVClass": return modelObj.components;
        // case "Folder": return modelObj.components;
        case "Function": return [];
        default: return modelObj.components;
    }
}
