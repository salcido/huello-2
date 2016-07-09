/* jshint node: true */
'use strict';

const electron             = require('electron');
const path                 = require('path');
const {app, BrowserWindow} = electron;
const dirname              = __dirname || path.resolve(path.dirname());
const emberAppLocation     = `file://${dirname}/dist/index.html`;

let mainWindow = null;
let force_quit = false;

// Uncomment the lines below to enable Electron's crash reporter
// For more information, see http://electron.atom.io/docs/api/crash-reporter/

// electron.crashReporter.start({
//     productName: 'YourName',
//     companyName: 'YourCompany',
//     submitURL: 'https://your-domain.com/url-to-submit',
//     autoSubmit: true
// });

app.on('window-all-closed', function onWindowAllClosed() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function onReady() {

    mainWindow = new BrowserWindow({
        width: 400,
        height: 650, //335
        resizable: true,
        maxWidth: 400,
        minWidth: 400,
        minHeight: 335,
        title: 'Huello',

        icon: __dirname + 'file://${dirname}/dist/img/Icon.icns'
    });

    delete mainWindow.module;

    // If you want to open up dev tools programmatically, call
    // mainWindow.openDevTools();

    // By default, we'll open the Ember App by directly going to the
    // file system.
    //
    // Please ensure that you have set the locationType option in the
    // config/environment.js file to 'hash'. For more information,
    // please consult the ember-electron readme.
    mainWindow.loadURL(emberAppLocation);

    // If a loading operation goes wrong, we'll send Electron back to
    // Ember App entry point
    mainWindow.webContents.on('did-fail-load', () => {
        mainWindow.loadURL(emberAppLocation);
    });

    mainWindow.webContents.on('crashed', () => {
        console.log('Your Ember app (or other code) in the main window has crashed.');
        console.log('This is a serious issue that needs to be handled and/or debugged.');
    });

    mainWindow.on('unresponsive', () => {
        console.log('Your Ember app (or other code) has made the window unresponsive.');
    });

    mainWindow.on('responsive', () => {
        console.log('The main window has become responsive again.');
    });

    mainWindow.on('close', function(e) {

      if(!force_quit) {
        e.preventDefault();
        mainWindow.hide();
      }
    });

    /* 'activate' is emitted when the user clicks the Dock icon (OS X) */
    app.on('activate',function() {
      mainWindow.show();
    });

    // You can use 'before-quit' instead of (or with) the close event
    // http://stackoverflow.com/questions/32885657/how-to-catch-the-event-of-clicking-the-app-windows-close-button-in-electron-app
    app.on('before-quit', function (e) {
        // Handle menu-item or keyboard shortcut quit here
        if(!force_quit){
            e.preventDefault();
            mainWindow.hide();
        }
    });

    // Remove mainWindow.on('closed'), as it is redundant

    app.on('activate-with-no-open-windows', function(){
        mainWindow.show();
    });

    // Handle an unhandled error in the main thread
    //
    // Note that 'uncaughtException' is a crude mechanism for exception handling intended to
    // be used only as a last resort. The event should not be used as an equivalent to
    // "On Error Resume Next". Unhandled exceptions inherently mean that an application is in
    // an undefined state. Attempting to resume application code without properly recovering
    // from the exception can cause additional unforeseen and unpredictable issues.
    //
    // Attempting to resume normally after an uncaught exception can be similar to pulling out
    // of the power cord when upgrading a computer -- nine out of ten times nothing happens -
    // but the 10th time, the system becomes corrupted.
    //
    // The correct use of 'uncaughtException' is to perform synchronous cleanup of allocated
    // resources (e.g. file descriptors, handles, etc) before shutting down the process. It is
    // not safe to resume normal operation after 'uncaughtException'.
    process.on('uncaughtException', (err) => {
        console.log('An exception in the main thread was not handled.');
        console.log('This is a serious issue that needs to be handled and/or debugged.');
        console.log(`Exception: ${err}`);
    });
});

// This is another place to handle events after all windows are closed
app.on('will-quit', function () {
    // This is a good place to add tests insuring the app is still
    // responsive and all windows are closed.
    console.log('will-quit');
    mainWindow = null;
});
