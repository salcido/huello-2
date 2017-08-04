### Huello there!
Huello 2 is the successor to Huello (formally an OS X Dashboard widget) built with Ember and Electron for quickly controlling your Philips Hue bulbs. Huello 2 can be setup as either a desktop or menubar application.

### Group control
![Huello 2](https://dl.dropboxusercontent.com/u/22745901/huello-2/huello-small.png)

Choose a group (default is "All Lights"), apply a Scene or simply click on a color. Use the sliders to control Saturation and Brightness. Pull down on the handle to expose individual light controllers. If you want to only use Color Temperature values, click the "Temp" checkbox.

![Huello 2](https://dl.dropboxusercontent.com/u/22745901/huello-2/Huello.png)

### Simple light state representation

Quickly see each light's current state. Some lights do not support all features, so each light's controller will only render controls for that particular light's abilities. 

![Huello 2](https://dl.dropboxusercontent.com/u/22745901/huello-2/off-state.png)


### Rename lights

Easily rename a light by simply clicking on the name, typing a new value, and clicking "Save". To cancel, click outside of the input or press "Esc".

![Huello 2](https://dl.dropboxusercontent.com/u/22745901/huello-2/rename.png)


## Installation

* `git clone https://github.com/salcido/huello-2.git`
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* As a menubar app:
  * `electron main.js`

* As a desktop app:
  * `ember serve`
  * Visit your app at [http://localhost:4200](http://localhost:4200).


## Building
* As a menubar app:
  * `electron-packager ./dist/ Huello --platform=darwin --arch=x64 --version=0.36.0 --icon=./dist/assets/img/Icon.icns`

* As a desktop app:
 * `ember electron:package --platform mas` (Mac App Store)


