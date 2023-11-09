const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 800,
    backgroundColor: "#ffffff",
    icon: `file://${__dirname}/dist/wordle-game/favicon.ico`,
    fullscreen: false,
    title: "Wordle Game",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/wordle-game/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );

  win.on("closed", () => (win = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
