import { 
    MenuManager,
    MenuItem
} from '../index.js';

import { generateMenu } from './fake.data.js';

test('Menu::InitializeMenu', () => {
    const menuManager = generateMenu();
    expect(menuManager instanceof MenuManager).toBeTruthy();
});

test('Menu::GetInstance', () => {
    const x = new MenuManager();
    const a = x.getInstance();
    const b = x.getInstance();
    expect(a === b).toBeFalsy();
});

test('Menu::SearchItem', () => {
    const menuManager = generateMenu();
    const validItem = menuManager.findBy('mView.mAppearance.fullscreenMode');
    const invalidItem = menuManager.findBy('wrong.path');
    expect(validItem).not.toBeNull();
    expect(invalidItem).toBeNull();
});

test('Menu::CopyInstanceState', () => {
    const a = generateMenu();
    const b = a.copy();
    expect(a === b).toBeFalsy();
    const menuItemA = a.findBy('mView.mAppearance.fullscreenMode');
    const menuItemB = b.findBy('mView.mAppearance.fullscreenMode');
    // Must exist
    expect(menuItemA).not.toBeNull();
    expect(menuItemB).not.toBeNull();
    // Must be the same BUT different
    expect(menuItemA.getId() === menuItemB.getId()).toBeTruthy();
    expect(menuItemA === menuItemB).toBeFalsy();
});

test('Menu::ToFluentUIMenu', () => {
    const menuManager = generateMenu();
    const mAppearance = menuManager.findBy('mView.mAppearance');
    const menuItemA = menuManager.findBy('mView.mAppearance.fullscreenMode');
    const menuObj = mAppearance.toFluentMenu();
    expect(menuObj).not.toBeNull();
    expect(menuObj.key === mAppearance.getId()).toBeTruthy();
    expect(typeof menuObj.subMenuProps === 'object').toBeTruthy();
    expect(Array.isArray(menuObj.subMenuProps.items)).toBeTruthy();
    expect(menuObj.subMenuProps.items.length > 0).toBeTruthy();
    // Check Element
    const fullscreenModeMenu = menuObj.subMenuProps.items[0];
    expect(fullscreenModeMenu.key === menuItemA.getId()).toBeTruthy();
});