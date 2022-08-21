var { app, BrowserWindow, Tray, Menu } = require('electron')
var path = require('path')
var url = require('url')
var iconpath = path.join(__dirname, 'icon.png') // path of y
function createWindow() {
    
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      icon:iconpath,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },
      show:false
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
    }))

    var tray = new Tray(iconpath)

    //

 	/*const template = [{
 	    label: 'File',
 	    submenu : [
 	    {
			label: 'Exit', click : function () {
			app.exit()
        	}
    	}
 	    ]
 	}]

 	const menu = Menu.buildFromTemplate(template)
 	Menu.setApplicationMenu(menu)*/

    //

    var contextMenu = Menu.buildFromTemplate([

        {
            label: 'Show App', click: function () {
                mainWindow.show()
            }
        },
        {
            label: 'Quit', click: function () {
                app.isQuiting = true
                app.exit()
            }
        }
    ])

    hide = true

    tray.setContextMenu(contextMenu)

    mainWindow.on('close', function (event) {
        
        app.exit()
        // event.preventDefault()
        // hide=true
        // mainWindow.hide()
    })

    mainWindow.on('minimize', function (event) {
        event.preventDefault()
        hide=true
        mainWindow.hide()
    })

	tray.on('click', function(event, bounds) {
		if(hide)
		{mainWindow.show();hide=false}
		else
		{mainWindow.hide();hide=true}
	});

    mainWindow.on('show', function () {
       tray.setToolTip("Server Started")
    })

}

app.on('ready', createWindow)
