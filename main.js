const {
	app,
	BrowserWindow
} = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({
		show: false,
		frame: true,
		transparent: true,
		title: "SWEDISHFAMILY",
		width: 685,
		height: 545,
		resizable: false,
		maximazable: false,
		icon: path.join(__dirname, 'assets/icon/icon.ico'),
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'assets/js/preload.js')
		}
	})
	mainWindow.setFullScreenable(false);
	mainWindow.setMaximizable(false);
	mainWindow.isResizable(false);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	})

	checkInternet(function (isConnected) {
		if (isConnected) {
			mainWindow.loadFile('assets/index.html')
		} else {
			mainWindow.loadFile('assets/no-internet.html')
		}
	})
	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
	if (mainWindow === null) createWindow()
})

function checkInternet(cb) {
	require('dns').lookup('google.com', function (err) {
		if (err && err.code == "ENOTFOUND") {
			cb(false);
		} else {
			cb(true);
		}
	})
}