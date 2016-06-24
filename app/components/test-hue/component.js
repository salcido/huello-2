import Ember from 'ember';

export default Ember.Component.extend({

  lights: Ember.inject.service(),

  actions: {

    displayInfo: function() {

      this.get('lights').hue();
    }
  }
});
