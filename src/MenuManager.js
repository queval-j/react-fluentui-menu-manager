import MenuItem from './MenuItem';
import { findElementBy } from './Utils';

export class MenuManager {
    constructor(data) {
        this._items = [];
        this.addItem(data);
    }

    getInstance() {
        return this.copy();
    }

    addItem(menuItem) {
        if (menuItem instanceof MenuItem) {
            this._items.push(menuItem);
        }
        else if (Array.isArray(menuItem)) {
            for (const mi of menuItem) {
                if (mi instanceof MenuItem) {
                    this._items.push(mi);
                }
            }
        }
        return this;
    }
    
    getMenus() {
        return [...this._items];
    }

    findBy(path) {
        const menu = findElementBy(path, this.getMenus());
        return menu;
    }

    copy() {
        const data = this._items.map((e) => e.copy());
        const c = new MenuManager(data);
        return c;
    }

    toFluentMenu() {
        if (!this._memMenu) {
            this.refresh();
        }
        return this._memMenu;
    }

    refresh() {
        this._memMenu = this._items.map((e) => e.toFluentMenu());
        return this
    }
}

export default MenuManager;