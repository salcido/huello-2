import Ember from 'ember';

/**
 * Group Controller
 *
 * @constructor
 * @extends App.Component
 * @return   {undefined}
 */

export default Ember.Component.extend({

  lightsService: Ember.inject.service(),

  /**
   * Hide the App overlay after updating
   *
   * @return   {undefined}
   */

  didReceiveAttrs() {

    let modeOverlay = Ember.$('.mode-overlay');

    if (modeOverlay) {

      Ember.run.later(function() {

        modeOverlay.fadeOut('fast');
      }, 300);
    }
  },

  /**
   * Calculate the opacity for a spectrum element
   *
   * @param    {Number} value [The initial value to start with]
   * @return   {Number}
   */

  opacityVal(value, useLimiter) {

    let
        initial = Number(254 / value),
        limiter = 0.25,
        percentage = ( (100 / initial) / 100 );

    if (useLimiter) {

      return percentage < limiter ? limiter : percentage;

    } else {

      return percentage;
    }
  },

  actions: {

    /**
     * Toggles the power state for the light group
     *
     * @return   {undefined}
     */

    togglePower() {

      let
          groupId = this.get('group.id'),
          lights = this.get('lightsService');

      lights.toggleGroupPower(groupId);

      Ember.run.later(() => {

          this.sendAction('update');
      }, 500);
    },

    /**
     * Sets the color temp value on the model
     *
     * @param    {object} event
     * @return   {undefined}
     */

      toggleColorTemp(event) {

      this.sendAction('useColorTemp', event.target.checked);
    },

    /**
     * Sets the color value for the light group
     *
     * @return   {undefined}
     */

    changeColor() {

      let
          colorTemp = this.get('colorTemp'),
          groupId = event.target.id,
          lights = this.get('lightsService'),
          overlay = Ember.$('.overlay'),
          spinner = Ember.$('.loader'),
          value = event.target.value;

      // Display the overlay/spinner
      overlay.fadeIn('fast');
      spinner.fadeIn('fast');

      if (colorTemp) {

        lights.setGroupState(groupId, {ct: value});

      } else {

        lights.setGroupState(groupId, {hue: value});
      }

      Ember.run.later(() => {

          this.sendAction('update');
          this.sendAction('resetScenes');
      }, 500);
    },

    /**
     * Sets the brightness for the light group
     *
     * @return   {undefined}
     */

    changeBrightness() {

      let
          value = event.target.value,
          groupId = event.target.id,
          lights = this.get('lightsService'),
          brightness = Ember.$('.group-brightness-wrap'),
          briPercentage = briPercentage = this.opacityVal(value, true),
          overlay = Ember.$('.overlay'),
          spinner = Ember.$('.loader');

      overlay.fadeIn('fast');
      spinner.fadeIn('fast');

      lights.setGroupState(groupId, {bri: value});

      brightness.fadeTo('slow', briPercentage);

      Ember.run.later(() => {

          this.sendAction('update');
      }, 500);
    },

    /**
     * Sets the saturation value for the light group
     *
     * @return   {undefined}
     */

    changeSaturation() {

      let
          value = event.target.value,
          groupId = event.target.id,
          satInitial = Number( 254 / value ),
          lights = this.get('lightsService'),
          satPercentage = (100 / satInitial) / 100,
          spectrum = Ember.$('.group-spectrum-bg'),
          overlay = Ember.$('.overlay'),
          spinner = Ember.$('.loader'),
          colorTemp = this.get('colorTemp');

      overlay.fadeIn('fast');
      spinner.fadeIn('fast');

      lights.setGroupState(groupId, {sat: value});

      // Color temp lights respond to saturation the same as hue
      // so don't bother fading the spectrum.
      if (!colorTemp) {

        spectrum.fadeTo('slow', satPercentage);
      }

      Ember.run.later(() => {
          this.sendAction('update');
      }, 500);
    },

    /**
     * Sets a new group name
     *
     * @param    {String} newName [the new name of the group]
     * @param    {String} groupId [the id of the group that will be updated]
     * @return   {undefined}
     */

    changeGroupName(newName, groupId) {

      this.get('lightsService').renameGroup(groupId, newName);

      // update the current model
      Ember.run.later(() => {
          this.sendAction('update');
      }, 500);
    }
  }
});
