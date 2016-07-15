import Ember from 'ember';

export default Ember.Route.extend({

  lightsService: Ember.inject.service(),

  // The id of the group that will be controlled by the Group Controller Component
  currentGroup: 0,

  // Whether to use color temperature values
  colorTemp: false,

  // last applied scene (if any)
  currentScene: null,

  /**
   * Configure the api instance & poll for updates
   *
   * @method   init
   * @return   {undefined}
   */

  init() {

    let timer = 5 * (60 * 1000);

    this._super(...arguments);

    this.get('lightsService').config();

    // Long poll for light updates
    setInterval(() => { this.refresh(); }, timer);
  },

  /**
   * The Group model
   *
   * @method model
   * @return {object}
   */

  model() {

    let
        lights = this.get('lightsService'),
        group = Number(this.get('currentGroup'));

    return Ember.RSVP.hash({
      lights: lights.getLights(),
      groups: lights.getGroups(group),
      allLights: lights.getGroupInfo(group),
      colorTemp: this.get('colorTemp'),
      scenes: lights.getScenes()
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

    this._super(...arguments);

    Ember.set(controller, 'lights', model.lights);

    // Rename `name` prop of Group 0 so it's not listed as "Lightset 0"
    model.groups[0].name = 'All Lights';

    // Map every light id into the 'All Lights' group so that Group 0
    // has the same properties as the subsequent groups
    model.groups[0].lights = model.lights.lights.map(function(light) {

      return light.id;
    });

    // Add state object into 'All Lights' group because
    // Philips is inconsistant with their group properties
    for (let i = 0; i < model.lights.lights.length; i++) {

      if (model.lights.lights[i].state.on) {

        model.groups[0].state = {any_on: true};
        break;

      } else {

        model.groups[0].state = {any_on: false};
      }
    }

    // Alphabetize Scenes
    model.scenes.sort(function(a, b) {

      let thisScene = a.name,
          thatScene = b.name;

      return thisScene > thatScene ? 1 : (thisScene < thatScene ? -1 : 0);
    });

    // Insert a unique `sceneId` for the ember-power-select add-on
    // to latch on to
    model.scenes.forEach(function(scene, i) {

      scene.sceneId = i;
    });

    // Set props on controller object
    Ember.set(controller, 'groups', model.groups[this.get('currentGroup')]);

    Ember.set(controller, 'allLights', model.allLights);

    Ember.set(controller, 'currentGroup', model.groups[this.get('currentGroup')]);

    Ember.set(controller, 'colorTemp', this.get('colorTemp'));

    Ember.set(controller, 'scenes', model.scenes);

    Ember.set(controller, 'currentScene', model.scenes[this.get('currentScene')]);

    // Draxx them sklounst
    console.info('[Huello 2] Model:', model);
  },

  actions: {

    /**
     * Applies a scene to the lights
     *
     * @param    {object} scene [the selected scene object]
     * @return   {undefined}
     */

    applyScene(scene) {

      this.get('lightsService').activateScene(scene.id);

      this.set('currentScene', scene.sceneId);

      return Ember.run.later(() => {

        this.refresh();
      }, 1000);
    },

    /**
     * Resets `currentScene` to `null` after
     * the group controller is used to change
     * hue or color temperature.
     *
     * @return   {undefined}
     */

    resetScenes() {

      this.set('currentScene', null);
    },

    /**
     * Sets colorTemp boolean
     *
     * @param    {boolean} value [whether to use color temperature values]
     * @return   {undefined}
     */

    setColorTemp(value) {

      this.set('colorTemp', value);

      this.refresh();
    },

    /**
     * Updates the model with all lights' current state
     *
     * @param    {number} value [the group number that will be controlled by the group controller component]
     * @return   {undefined}
     */

    updateModel(value) {

      value = value || this.get('currentGroup');

      this.set('currentGroup', value);

      return Ember.run.later(() => {

        this.refresh();
      }, 500);
    }
  }
});
