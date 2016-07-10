import Ember from 'ember';

export default Ember.Component.extend({

  // Light service injection
  lightsService: Ember.inject.service(),

  lightId: null,

  lightName: null,

  power: null,

  // color value
  hue: null,

  // color temperature value
  ct: null,

  // brightness value
  bri: null,

  // sataturation value
  sat: null,

  // The type of light (e.g. Dimmable Light, Color Light, etc...)
  type: null,

  /**
   * The following 4 properties will determine which type of template to render
   */
  dimmableLight: Ember.computed.equal('type', 'Dimmable light'),

  colorTempLight: Ember.computed.equal('type', 'Color temperature light'),

  colorLight: Ember.computed.equal('type', 'Color light'),

  extendedLight: Ember.computed.equal('type', 'Extended color light'),


  // Assign the initial values of each light
  init() {

    let
        lights = this.get('lightsService'),
        id = this.get('light');

    this._super(...arguments);

    // set light id
    this.set('lightId', id);

    // set range positions
    this.set('lightState', lights.getStatus(id)).then( res => {

      this.setProperties({
        power: res.state.on,
        lightName: res.name,
        hue: res.state.hue,
        bri: res.state.bri,
        sat: res.state.sat,
        ct: res.state.ct,
        type: res.type
      });

      if (!res.state.on) {

        // Set values to zero to better represent 'off' state
        this.setProperties({ power: false, sat: 0, bri: 0, hue: 0 });
      }
    });
  },

  // update light states when model refreshes
  didReceiveAttrs() {

    let
        lights = this.get('lightsService'),
        id = this.get('light'),
        overlay = Ember.$('.overlay'),
        spinner = Ember.$('.loader');


    this.set('lightState', lights.getStatus(id)).then(res => {

      this.setProperties({
        power: res.state.on,
        lightName: res.name
      });

      // Only update the component if the light is on
      if (this.get('power')) {

        this.setProperties({
          hue: res.state.hue,
          sat: res.state.sat,
          bri: res.state.bri,
          ct: res.state.ct
        });

        this.updateRanges();

        // hide the overlay
        overlay.fadeOut('fast');
        spinner.fadeOut('fast');

      } else {

        // Set values to zero to better represent 'off' state
        this.setProperties({ power: false, sat: 0, bri: 0, hue: 0 });
      }
    });
  },

  /**
   * Animates an input range from it's current position to a new one
   *
   * @param    {Number} currPos [the current range position]
   * @param    {Number} newPos  [the new range position]
   * @param    {String} target  [element target]
   * @return   {undefined}
   */

  animateRange(currPos, newPos, target) {

    Ember.$({position: currPos}).animate({position: newPos}, {

      duration: 500,

      step() {

        Ember.$(target).val(Math.ceil(this.position));
      }
    });
  },

  updateRanges() {

    let
        id = this.get('light'),
        hueVal = Ember.$('.powered .range-hue.hue.' + id).val(),
        ctVal = Ember.$('.powered .range-hue.color-temp.' + id).val(),
        satVal = Ember.$('.powered .range-sat.' + id).val(),
        briVal = Ember.$('.powered .range-bri.' + id).val(),
        spectrum = Ember.$('.powered .individual-spectrum-bg.' + id),
        brightness = Ember.$('.powered .brightness-wrap.' + id),
        briInitial = Number(254 / this.get('bri')),
        briPercentage = ( (100 / briInitial) / 100 < 0.07 ? 0.07 : (100 / briInitial) / 100 ),
        satInitial = Number(254 / this.get('sat')),
        satPercentage = (100 / satInitial) / 100;


    // Animate ranges
    this.animateRange(hueVal, this.get('hue'), '.range-hue' + '.' + id);
    this.animateRange(ctVal, this.get('ct'), '.range-hue.color-temp' + '.' + id);
    this.animateRange(satVal, this.get('sat'), '.range-sat' + '.' + id);
    this.animateRange(briVal, this.get('bri'), '.range-bri' + '.' + id);

    // Fade spectrum to new opacity
    spectrum.fadeTo('slow', satPercentage);
    brightness.fadeTo('slow', briPercentage);
  },

  actions: {

    /**
     * Toggles the power for an individual light
     *
     * @return   {undefined}
     */

    togglePower() {

      let id = this.get('lightId');

      this.get('lightsService').togglePower(id, this);

      this.sendAction('update');
    },

    /**
     * Changes the color value for an individual light
     *
     * @return   {method}
     */

    changeColor() {

      let
          id = event.target.id,
          value = event.target.value || null,
          colorTemp = this.get('colorTemp'),
          lights = this.get('lightsService');

      return colorTemp ? lights.setState(id, {ct: value}) : lights.setState(id, {hue: value});
    },

    /**
     * Changes the brightness value for an individual light
     *
     * @return   {undefined}
     */

    changeBrightness() {

      let
          value = event.target.value,
          id = event.target.id,
          briInitial = Number(254 / value),
          briPercentage = ( (100 / briInitial) / 100 < 0.07 ? 0.07 : (100 / briInitial) / 100 ),
          brightness = Ember.$('.brightness-wrap.' + id),
          lights = this.get('lightsService');


      lights.setState(id, {bri: value});

      brightness.fadeTo('slow', briPercentage);
    },

    /**
     * Changes the saturation value for an individual light
     *
     * @return   {undefined}
     */

    changeSaturation() {

      let
          value = event.target.value,
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
     * @param    {String} newName [the new name of the light]
     * @param    {String} id      [the id of the light to be updated]
     * @return   {undefined}
     */

    changeName(newName, id) {

      this.get('lightsService').rename(id, newName);

      // update the current model
      Ember.run.later(() => {

          this.sendAction('update');
      }, 500);
    }
  }
});
