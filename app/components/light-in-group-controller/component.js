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

  // color temperature value
  ct: null,

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

      this.setProperties({
        power: res.state.on,
        lightName: res.name,
        hue: res.state.hue,
        bri: res.state.bri,
        sat: res.state.sat,
        ct: res.state.ct,
        satOpacity: percentage
      });
    });
  },

  // update light states when model refreshes
  didReceiveAttrs: function() {

    let
        lights = this.get('lightsService'),
        id = this.get('light'),
        positionVal,
        rangeVal = Ember.$('.powered .range-hue.' + id).val(),
        spectrum = Ember.$('.powered .individual-spectrum-bg.' + id);

    this.set('lightState', lights.getStatus(id)).then( res => {

      let initial = Number(254 / res.state.sat),
          percentage = (100 / initial) / 100;

      this.set('power', res.state.on);

      this.set('lightName', res.name);

      // use colorTemp max val of 500 if colorTemp is selected
      positionVal = (this.get('colorTemp') ? res.state.ct : res.state.hue);

      // Animate Hue range when new values are received
      this.animateRange(rangeVal, positionVal, '.range-hue' + '.' + id);

      // Animate Sat range when new values are received
      this.animateRange(this.get('sat'), res.state.sat, '.range-sat' + '.' + id);

      // Animate Bri range when new values are received
      this.animateRange(this.get('bri'), res.state.bri, '.range-bri' + '.' + id);

      Ember.run.later(() => {

        // Update props to new values
        this.setProperties({
          hue: res.state.hue,
          sat: res.state.sat,
          bri: res.state.bri,
          ct: res.state.ct
        });
      }, 600);

      // Fade spectrum to new opacity
      spectrum.fadeTo('slow', percentage);
    });
  },

  /**
   * Animates an input range from it's current position to a new one
   *
   * @method   function
   * @param    {Number} currPos [the current range position]
   * @param    {Number} newPos  [the new range position]
   * @param    {String} target  [element target]
   * @return   {undefined}
   */
  animateRange: function(currPos, newPos, target) {

    Ember.$({position: currPos}).animate({position: newPos}, {

      duration: 500,

      step: function() {

        Ember.$(target).val(Math.ceil(this.position));
      }
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
