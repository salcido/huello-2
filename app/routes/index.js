import Ember from 'ember';

export default Ember.Route.extend({


  /**
   * Injecting Lights Service
   *
   * @class Route.index
   * @constructor
   * @extends Ember.Route
   */
  lightsService: Ember.inject.service('lights'),

  /**
   * Index's model
   *
   * @method model
   */
  model: function() {

    return this.get('lightsService').getLights();
  },

  actions: {

    updateModel: function() {
      console.log('updateModel called...');
      return this.refresh();
    }
  }
});
