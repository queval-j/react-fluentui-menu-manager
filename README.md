# Menu Manager for Microsoft Fluent UI (React)

The Menu Manager offers a simple way to manage the state of the CommandBar component provided in Microsoft Fluent UI React library.

You can use ```MenuManager``` to describe your menus. It can be used as is or you can get a copy which can be altered based on the state of your app.

```js
// src/_menu/VisualStudioMainMenu.js
import { MenuManager, MenuItem } from 'react-fluentui-menu-manager';

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
        itemType: 1
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
import AppMenu from 'src/_menu/VisualStudioMainMenu.js';

const MODE_NAMES = ['fullscreenMode', 'compactMode', 'zenMode'];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: []
        };
    }

    componentDidMount() {
        this.setState({
            menuItems: {}
        });
    }

    initMenu() {
        const menu = this.menuManager = AppMenu.copy();
        const AppearanceMenu = menuManager.findBy('mView.mAppearance');
        for (const modeName of MODE_NAMES) {
            AppearanceMenu
                .findBy(modeName)
                .set('onClick', () => {
                    this.handlSelectAppearanceMode(modeName);
                });
        }
        // Persist changes:
        menu.refresh()
        // Update State
        this.setState({
            menuItems: menu.toFluentMenu()
        });
    }

    handlSelectAppearanceMode(selectedModeName) {
        const AppearanceMenu = this.menuManager.findBy('mView.mAppearance');
        for (const modeName of MODE_NAMES) {
            AppearanceMenu
                .findBy(modeName)
                .set('disabled', (modeName !== selectedModeName ? true : false));
        }
        this.menuManager.refresh();
        this.setState()
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