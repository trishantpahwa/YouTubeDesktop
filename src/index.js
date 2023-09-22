const { app, BrowserWindow, Menu, MenuItem } = require('electron');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    fullscreen: true
  });

  // and load the index.html of the app.
  mainWindow.loadURL("https://youtube.com");

  const menu = Menu.getApplicationMenu();

  menu.items.map(item => {
    if (item.label === "View") {
      item.submenu.insert(0,
        new MenuItem({
          id: "backward-navigation",
          label: 'Backward',
          click: () => {
            mainWindow.webContents.goBack();
          },
          accelerator: 'CmdOrCtrl+Left',
          enabled: mainWindow.webContents.canGoBack()
        }));
      item.submenu.insert(1, new MenuItem({
        id: "forward-navigation",
        label: 'Forward',
        click: () => {
          mainWindow.webContents.goForward();
        },
        accelerator: 'CmdOrCtrl+Right',
        enabled: mainWindow.webContents.canGoForward()
      }));
    }
  });

  Menu.setApplicationMenu(menu);

  mainWindow.webContents.on("did-navigate", (event, url) => {
    menu.getMenuItemById("backward-navigation").enabled = mainWindow.webContents.canGoBack();
    menu.getMenuItemById("forward-navigation").enabled = mainWindow.webContents.canGoForward();
  });

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
