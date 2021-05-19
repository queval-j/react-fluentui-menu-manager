export function pathToArray(path) {
    if (Array.isArray(path)) return path;
    return path.split('.');
}

export function findElementBy(path, items) {
    const p = pathToArray(path);
    const max = p.length;
    if (max === 0) return null;
    let i = -1;
    let listOfItems = items;
    let searchItem = null;
    while (++i < max) {
        const id = p[i];
        let found = false;
        for (const item of listOfItems) {
            if (item.getId() === id) {
                searchItem = item;
                listOfItems = item.getMenus();
                found = true;
                break;
            }
        }
        if (found === false) return null;
    }
    return searchItem;
}

export function deepDataCopy(obj) {
    // Need a real deepCopy
    return JSON.parse(JSON.stringify(obj));
}