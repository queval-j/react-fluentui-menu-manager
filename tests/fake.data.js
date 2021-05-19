import { 
    MenuManager,
    MenuItem
} from '../index.js';

export function generateMenu() {
    const x = new MenuManager();
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
    x
        .addItem(fileMenu)
        .addItem(viewMenu)
        .refresh();
    return x;
}