import { findElementBy, deepDataCopy } from './Utils';

export class MenuItem {
    constructor(id, label, opts, subMenus) {
        this._id = id;
        this._data = {};
        this.initialize(id, label, opts);
        this.addItem(subMenus);
    }

    getId() {
        return this._id;
    }

    set(key, value) {
        this._data[key] = value;
        return this;
    }
    get(key) {
        return this._data[key];
    }

    initialize(id, label, opts) {
        const options = opts || {};
        this._data = {
            options,
            key: id,
            name: label,
            menuItems: []
        };
    }

    getMenus() {
        const { menuItems } = this._data;
        return [...menuItems];
    }

    addItem(elementOrArray) {
        const { menuItems } = this._data;
        if (!Array.isArray(elementOrArray)) {
            elementOrArray = [elementOrArray];
        }
        for (const m of elementOrArray) {
            if (m instanceof MenuItem) {
                menuItems.push(m);
            }
        }
        return this;
    }

    findBy(path) {
        const menu = findElementBy(path, this.getMenus());
        return menu;
    }

    toFluentMenu() {
        const { menuItems } = this._data;
        let data = {...this._data};
        delete data.menuItems;
        data = deepDataCopy(data);
        const menus = [];
        for (const m of menuItems) {
            menus.push(m.toFluentMenu());
        }
        return {
            ...data,
            subMenuProps: {
                items: menus
            }
        };
    }

    copy() {
        const { menuItems } = this._data;
        let d = {...this._data};
        delete d.menuItems;
        d = deepDataCopy(d);
        const { key, name } = d;
        const menus = [];
        for (const m of menuItems) {
            menus.push(m.copy());
        }
        return new MenuItem(key, name, d, menus);
    }
}

export default MenuItem;