import Ember from 'ember';


/**
 * Group Controller
 * @method   extend
 */

export default Ember.Component.extend({

  lightsService: Ember.inject.service('lights'),

  actions: {

    togglePower: function() {

      let groupId = this.get('group.id'),
          lights = this.get('lightsService');

      lights.toggleGroupPower(groupId);

      Ember.run.later(() => {
          this.sendAction('update');
      }, 500);
    },

    changeColor: function() {

      let value = event.target.value,
          groupId = event.target.id,
          lights = this.get('lightsService');

      lights.setGroupState(groupId, {hue: value});
    },

    changeBrightness: function() {

      let value = event.target.value,
          groupId = event.target.id,
          lights = this.get('lightsService');

      lights.setGroupState(groupId, {bri: value});
    },

    changeSaturation: function() {

      let value = event.target.value,
          groupId = event.target.id,
          lights = this.get('lightsService');

      lights.setGroupState(groupId, {sat: value});
    },

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
