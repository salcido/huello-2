import Ember from 'ember';

// [{"id":"001788fffe2282ae","ipaddress":"10.0.1.2"}]

export default Ember.Component.extend({

  // Light service injection
  lightsService: Ember.inject.service(),

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

  // The type of light (e.g. Dimmable Light, Color Light, etc...)
  type: null,

  // Whether the component has rendered once already.
  // Used to determine if updateRanges() should be run
  hasRendered: false,

  /**
   * The following 4 properties will determine which type of template to render
   */
  dimmableLight: Ember.computed.equal('type', 'Dimmable light'),

  colorTempLight: Ember.computed.equal('type', 'Color temperature light'),

  colorLight: Ember.computed.equal('type', 'Color light'),

  extendedLight: Ember.computed.equal('type', 'Extended color light'),

  // Assign the initial values of each light
  init: function() {

    this._super(...arguments);

    let lights = this.get('lightsService'),
        id = this.get('light');

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
    });
  },

  // update light states when model refreshes
  didReceiveAttrs: function() {

    let
        lights = this.get('lightsService'),
        id = this.get('light'),
        overlay = Ember.$('.overlay'),
        positionVal,
        hueVal = Ember.$('.powered .range-hue.' + id).val(),
        satVal = Ember.$('.powered .range-sat.' + id).val(),
        briVal = Ember.$('.powered .range-bri.' + id).val(),
        spectrum = Ember.$('.powered .individual-spectrum-bg.' + id),
        brightness = Ember.$('.powered .brightness-wrap.' + id),
        spinner = Ember.$('.loader');


    // Only update the component if the light is on
    this.set('lightState', lights.getStatus(id)).then( res => {

      // These vars are used to tell the specturm what percentage to fade to
      let
          briInitial = Number(254 / res.state.bri),
          briPercentage = ( (100 / briInitial) / 100 < 0.07 ? 0.07 : (100 / briInitial) / 100 ),
          satInitial = Number(254 / res.state.sat),
          satPercentage = (100 / satInitial) / 100;

      this.set('power', res.state.on);

      if (this.get('power')) {

        this.set('lightName', res.name);

        // use colorTemp max val of 500 if colorTemp is selected
        positionVal = (this.get('colorTemp') ? res.state.ct : res.state.hue);

        // Animate Hue/Sat/Bri ranges when new values are received
        this.animateRange(hueVal, positionVal, '.range-hue' + '.' + id);
        this.animateRange(satVal, res.state.sat, '.range-sat' + '.' + id);
        this.animateRange(briVal, res.state.bri, '.range-bri' + '.' + id);

        Ember.run.later(() => {

          // Update props to new values
          this.setProperties({
            hue: res.state.hue,
            sat: res.state.sat,
            bri: res.state.bri,
            ct: res.state.ct
          });
        }, 600);

        // hide the overlay
        overlay.fadeOut('fast');
        spinner.fadeOut('fast');

        // Fade spectrum to new opacity
        spectrum.fadeTo('slow', satPercentage);
        brightness.fadeTo('slow', briPercentage);
      }
    });
  },

  /**
   * Ensure the ranges move to their correct positions
   * when first rendered into the DOM
   *
   * @method   function
   * @return   {undefined}
   */

  didRender: function() {

    if (!this.get('hasRendered')) {

      Ember.run.later(() => {

        this.updateRanges();
      }, 500);
    }
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

  updateRanges: function() {

    let
        positionVal = (this.get('colorTemp') ? this.get('ct') : this.get('hue')),
        id = this.get('light'),
        hueVal = Ember.$('.powered .range-hue.' + id).val(),
        satVal = Ember.$('.powered .range-sat.' + id).val(),
        briVal = Ember.$('.powered .range-bri.' + id).val(),
        spectrum = Ember.$('.powered .individual-spectrum-bg.' + id),
        brightness = Ember.$('.powered .brightness-wrap.' + id),
        briInitial = Number(254 / this.get('bri')),
        briPercentage = ( (100 / briInitial) / 100 < 0.07 ? 0.07 : (100 / briInitial) / 100 ),
        satInitial = Number(254 / this.get('sat')),
        satPercentage = (100 / satInitial) / 100;

    // Animate ranges
    this.animateRange(hueVal, positionVal, '.range-hue' + '.' + id);
    this.animateRange(satVal, this.get('sat'), '.range-sat' + '.' + id);
    this.animateRange(briVal, this.get('bri'), '.range-bri' + '.' + id);

    // Fade spectrum to new opacity
    spectrum.fadeTo('slow', satPercentage);
    brightness.fadeTo('slow', briPercentage);

    this.set('hasRendered', true);
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
          brightness = Ember.$('.brightness-wrap.' + id),
          briInitial = Number(254 / value),
          briPercentage = ( (100 / briInitial) / 100 < 0.07 ? 0.07 : (100 / briInitial) / 100 ),
          lights = this.get('lightsService');

      lights.setState(id, {bri: value});

      brightness.fadeTo('slow', briPercentage);
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
