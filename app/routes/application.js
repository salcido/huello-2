import Ember from 'ember';

export default Ember.Route.extend({

  lightsService: Ember.inject.service('lights'),

  currentGroup: 1,

  /**
   * Index's model
   *
   * @method model
   */
  // model: function() {
  //
  //   let lights = this.get('lightsService');
  //
  //   return Ember.RSVP.hash({
  //     lights: lights.getLights(),
  //     groups: lights.getGroups()
  //     //allLights: lights.getGroupState(1)
  //   });
  // },
  //
  // setupController(controller, model) {
  //
  //   console.log('model', model);
  //
  //   this._super(...arguments);
  //
  //   Ember.set(controller, 'lights', model.lights);
  //
  //   model.groups[0].name = 'All lights';
  //
  //   // just get all lights from group array
  //   Ember.set(controller, 'groups', model.groups);
  //
  //   Ember.set(controller, 'allLights', model.allLights);
  // }
  //
  // actions: {
  //
  //   /**
  //    * Updates the model with all lights' current state
  //    */
  //
  //   updateModel: function() {
  //
  //     return Ember.run.later(() => {
  //
  //       this.refresh();
  //     }, 500);
  //   }
  //}
});
