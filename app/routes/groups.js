import Ember from 'ember';

export default Ember.Route.extend({

  lightsService: Ember.inject.service(),

  // The id of the group that will be controlled by the Group Controller Component
  currentGroup: 0,

  // Whether to use color temperature values
  colorTemp: false,

  init() {

    let lights = this.get('lightsService');

    this._super(...arguments);

    lights.config();
  },

  /**
   * The Group model
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

  /**
   * Configure controller with model properties
   *
   * @method   setupController
   * @param    {object}        controller [the controller object]
   * @param    {object}        model      [the model]
   * @return   {undefined}
   */

  setupController(controller, model) {

    console.info('[Huello 2] Model:', model);

    this._super(...arguments);

    Ember.set(controller, 'lights', model.lights);

    // Rename `name` prop of Group 0 so it's not listed as "Lightset 0"
    model.groups[0].name = 'All Lights';

    // Map all lights ids into 'All Lights' group so that Group 0 has the same properties/structure as subsequent groups
    model.groups[0].lights = model.lights.lights.map(function(light) {

      return light.id;
    });

    // Add state object into 'All Lights' group because Philips is inconsistant with their group properties
    for (let i = 0; i < model.lights.lights.length; i++) {

      if (model.lights.lights[i].state.on) {

        model.groups[0].state = {any_on: true};

        break;

      } else {

        model.groups[0].state = {any_on: false};
      }
    }

    // Set props on controller object
    Ember.set(controller, 'groups', model.groups[this.get('currentGroup')]);

    Ember.set(controller, 'allLights', model.allLights);

    Ember.set(controller, 'currentGroup', model.groups[this.get('currentGroup')]);

    Ember.set(controller, 'colorTemp', this.get('colorTemp'));
  },

  actions: {

    /**
     * Updates the model with all lights' current state
     *
     * @method   function
     * @param    {number} value [the group number that will be controlled by the group controller component]
     * @return   {undefined}
     */

    updateModel: function(value) {

      value = value || this.get('currentGroup');

      this.set('currentGroup', value);

      return Ember.run.later(() => {

        this.refresh();
      }, 500);
    },

    /**
     * Sets colorTemp boolean
     *
     * @method   function
     * @param    {boolean} value [whether to use color temperature values]
     * @return   {undefined}
     */

    setColorTemp: function(value) {

      this.set('colorTemp', value);

      this.refresh();
    }
  }
});
