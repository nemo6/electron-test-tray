var { app, BrowserWindow, Tray, Menu } = require('electron')
var path = require('path')
var url = require('url')
var iconpath = path.join(__dirname, 'icon.jpg') // path of y
var win
function createWindow() {
    win = new BrowserWindow({ width: 600, height: 600, icon: iconpath })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
    }))

    var appIcon = new Tray(iconpath)

    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: function () {
                win.show()
            }
        },
        {
            label: 'Quit', click: function () {
                app.isQuiting = true
                app.quit()
            }
        }
    ])

    hide = true

    appIcon.setContextMenu(contextMenu)

    win.on('close', function (event) {
        event.preventDefault()
        hide=true
        win.hide()
    })

    win.on('minimize', function (event) {
        event.preventDefault()
        hide=true
        win.hide()
    })

	appIcon.on('click', function(event, bounds) {
		if(hide)
		{win.show();hide=false}
		else
		{win.hide();hide=true}
	});

    win.on('show', function () {
       appIcon.setToolTip("Server Started")
    })

}

app.on('ready', createWindow)