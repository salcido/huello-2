import Ember from 'ember';

// [{"id":"001788fffe2282ae","ipaddress":"10.0.1.2"}]

export default Ember.Component.extend({

  // Light service injection
  lightsService: Ember.inject.service('lights'),

  // The id of the light
  lightId: null,

  // the name of the light
  lightName: null,

  // if the light is on
  power: null,

  // hue value
  hue: null,

  // bri value
  bri: null,

  // sat value
  sat: null,

  // spectrum-bg saturation opacity
  satOpacity: null,

  // Assign the initial values of each light
  init: function() {

    this._super(...arguments);

    let lights = this.get('lightsService'),
        id = this.get('light');

    // set light id
    this.set('lightId', id);

    // set range positions
    this.set('lightState', lights.getStatus(id)).then( res => {

      let initial = Number(254 / res.state.sat),
          percentage = (100 / initial) / 100;
console.log(percentage)
      this.set('power', res.state.on);

      this.set('lightName', res.name);

      this.set('hue', res.state.hue);

      this.set('bri', res.state.bri);

      this.set('sat', res.state.sat);

      this.set('satOpacity', percentage);
    });
  },

  // update light states when model refreshes
  didReceiveAttrs: function() {

    let lights = this.get('lightsService'),
        id = this.get('light'),
        spectrum = Ember.$('.powered .individual-spectrum-bg.' + id);

    this.set('lightState', lights.getStatus(id)).then( res => {

      let initial = Number(254 / res.state.sat),
          percentage = (100 / initial) / 100;

      this.set('power', res.state.on);

      this.set('lightName', res.name);

      this.set('hue', res.state.hue);

      this.set('bri', res.state.bri);

      this.set('sat', res.state.sat);

      spectrum.fadeTo('slow', percentage);

    });
  },

  actions: {

    /**
     * Toggles the power for an individual light
     *
     * @method   function
     * @return   {undefined}
     */
    togglePower: function() {

      let
          id = this.get('lightId'),
          lights = this.get('lightsService');

      lights.togglePower(id);

      Ember.run.later(() => {

          this.sendAction('update');

          lights.getStatus(id).then(res => {

            this.set('lightState', res.state);
          });
      }, 500);
    },

    /**
     * Changes the color value for an individual light
     *
     * @method   function
     * @return   {undefined}
     */
    changeColor: function() {

      let
          colorTemp = this.get('colorTemp'),
          id = event.target.id,
          lights = this.get('lightsService'),
          value = event.target.value;

      if (colorTemp) {

        lights.setState(id, {ct: value});

      } else {

        lights.setState(id, {hue: value});
      }
    },

    /**
     * Changes the brightness value for an individual light
     *
     * @method   function
     * @return   {undefined}
     */
    changeBrightness: function() {

      let value = event.target.value,
          id = event.target.id,
          lights = this.get('lightsService');

      lights.setState(id, {bri: value});
    },

    /**
     * Changes the saturation value for an individual light
     *
     * @method   function
     * @return   {undefined}
     */
    changeSaturation: function() {

      let value = event.target.value,
          id = event.target.id,
          initial = Number(254 / value),
          percentage = (100 / initial) / 100,
          spectrum = Ember.$('.individual-spectrum-bg.' + id),
          lights = this.get('lightsService');

      lights.setState(id, {sat: value});

      spectrum.fadeTo('slow', percentage);
    },

    /**
     * Changes the name of an individual light
     *
     * @method   function
     * @param    {String} newName [the new name of the light]
     * @param    {String} id      [the id of the light to be updated]
     * @return   {undefined}
     */
    changeName: function(newName, id) {

      let lights = this.get('lightsService');

      lights.rename(id, newName);

      // update the current model
      Ember.run.later(() => {
          this.sendAction('update');
      }, 500);
    }
  }
});


//lights.setState(id, { on: true });

// let
//     HueApi = hue.HueApi,
//     hostname = '10.0.1.2',
//     username = 'mbRWI0ncjZbp2pRH89KeId2-ocSansGrD0eRY12o',
//     userDescription = 'Huello 2',
//     api;

// Log id/ipaddress
//this.get('lights').logBridge();

// api = new HueApi();
//
// // create username
// api.registerUser(hostname, userDescription)
//   .then(this.get('lights.displayUserResult'))
//   .fail(this.get('displayError'))
//   .done();

// Log bridge config
// api = new HueApi(hostname, username);

// api.getConfig().then(this.get('lights.displayResult')).done();
//
// api.getConfig(function(err, config) {
//
//     if (err) {
//       throw err;
//     }
//
//     this.get('lights').displayResult(config);
// });

// Log full state of bridge
// api.fullState().then(this.get('lights.displayResult')).done();
//
// api.fullState(function(err, config) {
//   if (err) { throw err; }
//   this.get('lights').displayResult(config);
// });

// Log lights state
// api.lights().then(this.get('lights.displayResult')).done();
