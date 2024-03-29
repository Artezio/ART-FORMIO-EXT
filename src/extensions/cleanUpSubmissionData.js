const arrayComponents = ['datagrid'];

function saveToResult(key, result) {
    if (Array.isArray(result)) {
        result.push({ [key]: true });
    } else if (typeof result === 'object') {
        result[key] = true;
    }
}

function extendResult(componentType, key, result) {
    if (arrayComponents.includes(componentType)) {
        result[key] = [{}];
        return result[key][0]
    }
    result[key] = {};
    return result[key];
}

function makeSchema(component, result) {
    if (Array.isArray(component)) {
        component.forEach(subComponent => makeSchema(subComponent, result));
    } else if (component !== null && typeof component === 'object') {
        if (component.tree && Array.isArray(component.components)) {
            const link = extendResult(component.type, component.key, result);
            if (Array.isArray(link)) {
                link.push({});
                component.components.forEach((component, i) => {
                    makeSchema(component, link[0])
                });
            } else {
                component.components.forEach(component => makeSchema(component, link));
            }
        } else if (component.input) {
            saveToResult(component.key, result);
        } else {
            for (let key in component) {
                if (typeof component[key] === 'object') {
                    makeSchema(component[key], result);
                }
            }
        }
    }
}

function ArrayHasArray(parentArray, childArray) {
    return childArray.every(element => parentArray.includes(element));
}

function clearArrayOfPrimitiveTypes(array) {
    const filteredArray = array.filter(element => typeof element === 'object' && element !== null);
    array.splice(0, array.length, ...filteredArray);
}

function removeUnmatchedObjects(array, schema) {
    const filteredArray = array.filter(element => {
        const keys = Object.keys(element);
        return schema.some(el => ArrayHasArray(Object.keys(el), keys));
    })
    filteredArray.forEach((element, i) => {
        if (typeof element === "object") {
            stripUnknown(element, schema[i]);
        }
    })
    array.splice(0, array.length, ...filteredArray);
}

function stripUnknown(data, schema) {
    if (typeof data !== 'object' || data === null || typeof schema !== 'object' || schema === null) return;
    if (Array.isArray(data)) {
        if (!Array.isArray(schema)) {
            data.splice(0, data.length);
        }
        clearArrayOfPrimitiveTypes(data);
        removeUnmatchedObjects(data, schema);
    } else {
        for (let key in data) {
            if (!(key in schema)) {
                delete data[key];
            }
            if (data[key] !== null && typeof data[key] === 'object') {
                if (typeof schema[key] !== 'object' || schema[key] === null) {
                    delete data[key];
                } else {
                    stripUnknown(data[key], schema[key]);
                }
            }
        }
    }
}

module.exports = function cleanUpSubmissionData(form, { data }) {
    const result = {};
    makeSchema(form, result);
    stripUnknown(data, result);
    return data;
}