# Huello 2

[Huello project page](https://salcido.github.io/huello-2/)

The successor to Huello (formally an OS X Dashboard widget) built with Ember and Electron for quickly controlling your Philips Hue bulbs. Huello 2 can be setup as either a desktop or menubar application.

![Huello](https://user-images.githubusercontent.com/12960237/88605539-11dda480-d02f-11ea-8655-4f0682a1fc97.png)

### Group control

Choose a group (default is "All Lights"), apply a Scene or simply click on a color. Use the sliders to control Saturation and Brightness. Pull down on the handle to expose individual light controllers. If you want to only use Color Temperature values, click the "Temp" checkbox.

![huello-small](https://user-images.githubusercontent.com/12960237/88605538-10ac7780-d02f-11ea-906d-b69feb484f0e.png)

### Simple light state representation

Quickly see each light's current state. Some lights do not support all features, so each light's controller will only render controls for that particular light's abilities.

![off-state](https://user-images.githubusercontent.com/12960237/88605540-12763b00-d02f-11ea-878d-6f1452c975a2.png)

### Quickly rename individual lights

Easily rename a light by simply clicking on the name, typing a new value, and clicking "Save". To cancel, click outside of the input or press "Esc".

![rename](https://user-images.githubusercontent.com/12960237/88605541-130ed180-d02f-11ea-9628-f4acb768001b.png)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* [Electron](http://electron.atom.io/)

## Installation

* `git clone https://github.com/salcido/huello-2.git` this repository
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

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

<a href="https://www.buymeacoffee.com/salcido" rel="nofollow">
 <img src="https://github.com/salcido/Discogs-Enhancer/blob/master/img/learn/coffee-btn.png" alt="Buy Me A Coffee" style="max-width: 100%;">
</a>
