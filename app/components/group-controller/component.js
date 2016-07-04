import Ember from 'ember';


/**
 * Group Controller
 * @method   extend
 */

export default Ember.Component.extend({

  lightsService: Ember.inject.service('lights'),

  actions: {

    /**
     * Toggles the power state for the light group
     *
     * @method   function
     * @return   {undefined}
     */
    togglePower: function() {

      let groupId = this.get('group.id'),
          lights = this.get('lightsService');

      lights.toggleGroupPower(groupId);

      Ember.run.later(() => {
          this.sendAction('update');
      }, 500);
    },

    /**
     * Sets the color temp value on the model
     *
     * @method   function
     * @param    {object} event
     * @return   {undefined}
     */
    toggleColorTemp: function(event) {

      this.sendAction('useColorTemp', event.target.checked);
    },

    /**
     * Sets the color value for the light group
     *
     * @method   function
     * @return   {undefined}
     */
    changeColor: function() {

      let
          colorTemp = this.get('colorTemp'),
          groupId = event.target.id,
          lights = this.get('lightsService'),
          value = event.target.value;

      if (colorTemp) {

        lights.setGroupState(groupId, {ct: value});

      } else {

        lights.setGroupState(groupId, {hue: value});
      }

      Ember.run.later(() => {
          this.sendAction('update');
      }, 500);
    },

    /**
     * Sets the brightness for the light group
     *
     * @method   function
     * @return   {undefined}
     */
    changeBrightness: function() {

      let value = event.target.value,
          groupId = event.target.id,
          lights = this.get('lightsService');

      lights.setGroupState(groupId, {bri: value});

      Ember.run.later(() => {
          this.sendAction('update');
      }, 500);
    },

    /**
     * Sets the saturation value for the light group
     *
     * @method   function
     * @return   {undefined}
     */
    changeSaturation: function() {

      let
          value = event.target.value,
          groupId = event.target.id,
          initial = Number(254 / value),
          lights = this.get('lightsService'),
          percentage = (100 / initial) / 100,
          spectrum = Ember.$('.group-spectrum-bg');

      lights.setGroupState(groupId, {sat: value});

      spectrum.fadeTo('slow', percentage);

      Ember.run.later(() => {
          this.sendAction('update');
      }, 500);
    },

    /**
     * Sets a new group name
     *
     * @method   function
     * @param    {String} newName [the new name of the group]
     * @param    {String} groupId [the id of the group that will be updated]
     * @return   {undefined}
     */
    changeGroupName: function(newName, groupId) {

      let lights = this.get('lightsService');

      lights.renameGroup(groupId, newName);

      // update the current model
      Ember.run.later(() => {
          this.sendAction('update');
      }, 500);
    }
  }
});
