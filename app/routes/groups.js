import Ember from 'ember';

export default Ember.Route.extend({

  lightsService: Ember.inject.service('lights'),

  currentGroup: 0,

  colorTemp: false,

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
      allLights: lights.getGroupInfo(group),
      colorTemp: this.get('colorTemp')
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

    // add state object into 'All Lights' group because Philips is inconsistant with their group properties
    for (let i = 0; i < model.lights.lights.length; i++) {

      if (model.lights.lights[i].state.on) {

        model.groups[0].state = {any_on: true};

        break;

      } else {

        model.groups[0].state = {any_on: false};
      }
    }

    Ember.set(controller, 'groups', model.groups[this.get('currentGroup')]);

    Ember.set(controller, 'allLights', model.allLights);

    Ember.set(controller, 'currentGroup', model.groups[this.get('currentGroup')]);

    Ember.set(controller, 'colorTemp', this.get('colorTemp'));
  },

  actions: {

    /**
     * Updates the model with all lights' current state
     */

    updateModel: function(value) {

      value = value || this.get('currentGroup');

      this.set('currentGroup', value);

      return Ember.run.later(() => {

        this.refresh();
      }, 500);
    },

    setColorTemp: function(value) {
      console.log('colortemp from route', value)
       this.set('colorTemp', value);

       this.refresh();
    }
  }
});
