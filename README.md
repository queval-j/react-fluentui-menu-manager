# Menu Manager for Microsoft Fluent UI (React)

The Menu Manager offers a simple way to manage the state of the CommandBar component provided in Microsoft Fluent UI React library.

You can use ```MenuManager``` to describe your menus. It can be used as is or you can get a copy which can be altered based on the state of your app.

```js
// src/_menu/VisualStudioMainMenu.js
import { MenuManager, MenuItem } from 'react-fluentui-menu-manager';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';

export const AppMenu = new MenuManager();
// File Menu
const fileMenu = new MenuItem('mFile', 'File');
    fileMenu.addItem([
        new MenuItem('mNewFile', 'New File', {
            onClick: function () {
                return 'select file';
            },
            iconProps: { iconName: 'Add' }
        }),
        new MenuItem('mNewWindow', 'New Window', {
            onClick: function () {
                return 'select window';
            },
            iconProps: { iconName: 'OpenInNewWindow' }
        })
    ]);
// View Menu
const viewMenu = new MenuItem('mView', 'View');
viewMenu.addItem([
    new MenuItem('mAppearance', 'Appearance', {
        iconProps: { iconName: 'ViewOriginal' }
    }, [
        new MenuItem('fullscreenMode', 'Fullscreen', {
            iconProps: { iconName: 'RadioBtnOff' }
        }),
        new MenuItem('compactMode', 'Compact', {
            iconProps: { iconName: 'RadioBtnOff' }
        }),
        new MenuItem('zenMode', 'Zen', {
            iconProps: { iconName: 'RadioBtnOff' }
        }),
    ]),
    new MenuItem('mDivider', null, {
        itemType: ContextualMenuItemType.Divider
    }),
    new MenuItem('mAbout', 'About', {
        iconProps: { iconName: 'Info' }
    })
]);
AppMenu.addItem([fileMenu, viewMenu]).refresh();

export default AppMenu;
```

```js
// src/App.js
import React from 'react';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import AppMenu from './_menu/VisualStudioMainMenu.js';

const MODE_NAMES = ['fullscreenMode', 'compactMode', 'zenMode'];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: []
        };
    }

    componentDidMount() {
        this.initMenu();
    }

    initMenu() {
        const menuManager = this.menuManager = AppMenu.copy();
        const AppearanceMenu = menuManager.findBy('mView.mAppearance');
        for (const modeName of MODE_NAMES) {
            AppearanceMenu
                .findBy(modeName)
                .set('onClick', () => {
                  console.log('clicked', modeName);
                    this.handlSelectAppearanceMode(modeName);
                });
        }
        // Persist changes:
        menuManager.refresh()
        // Update State
        console.log('initmenu', menuManager.toFluentMenu());
        this.setState({
            menuItems: menuManager.toFluentMenu()
        });
    }

    handlSelectAppearanceMode(selectedModeName) {
        const AppearanceMenu = this.menuManager.findBy('mView.mAppearance');
        for (const modeName of MODE_NAMES) {
            AppearanceMenu
                .findBy(modeName)
                .set('iconProps', {
                  iconName: (modeName === selectedModeName ? 'RadioBtnOn' : 'RadioBtnOff')
                });
        }
        console.log(selectedModeName);
        this.menuManager.refresh();
        this.setState({
          menuItems: this.menuManager.toFluentMenu()
        })
    }

    render() {
        const { menuItems } = this.state;
        return (
            <CommandBar items={menuItems} style={{ width: '100%' }} />
        );
    }
}

export default App;
```

When you will click on one of the Appearance, it will change the icon in the menu:
![alt text](https://raw.githubusercontent.com/queval-j/react-fluentui-menu-manager/main/doc/asset/menu_clicked.png)