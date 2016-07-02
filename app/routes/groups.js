import Ember from 'ember';

export default Ember.Route.extend({

  lightsService: Ember.inject.service('lights'),

  currentGroup: 0,

  /**
   * Index's model
   *
   * @method model
   */
  model: function() {

    let lights = this.get('lightsService'),
        group = Number(this.get('currentGroup'));

    return Ember.RSVP.hash({
      lights: lights.getLights(),
      groups: lights.getGroups(group),
      allLights: lights.getGroupInfo(group)
    });
  },

  setupController(controller, model) {

    console.log('model from route', model);

    this._super(...arguments);

    Ember.set(controller, 'lights', model.lights);

    // Rename `name` prop so it's not listed as "Lightset 0"
    model.groups[0].name = 'All Lights';

    // map all lights ids into 'All Lights' group (why Philips doesn't do this, I will never know)
    model.groups[0].lights = model.lights.lights.map(function(light) {
      return light.id;
    });

    // just get all lights from group array
    Ember.set(controller, 'groups', model.groups[this.get('currentGroup')]);

    Ember.set(controller, 'allLights', model.allLights);

    Ember.set(controller, 'currentGroup', model.groups[this.get('currentGroup')]);
  },

  actions: {

    /**
     * Updates the model with all lights' current state
     */

    updateModel: function(value) {
      value = value || 0;
      this.set('currentGroup', value);

      return Ember.run.later(() => {

        this.refresh();
      }, 500);
    }
  }
});
