import Ember from 'ember';

// ember-browserify
import hue from 'npm:node-hue-api';

let
    HueApi = hue.HueApi,
    hostname,
    username,
    api;

export default Ember.Service.extend({

  /**
   * Applies a scene to a group of lights
   *
   * @param    {string} id [the ID of the scene]
   * @return   {method}
   */

  activateScene(id) {

    return api.activateScene(id);
  },

  /**
   * Configures a new HueApi instance
   *
   * @return   {object}
   */

  config() {

    hostname = localStorage.getItem('hostname');
    username = localStorage.getItem('username');

    api = new HueApi(hostname, username);

    return api.config().then(res => {

      return res;
    });
  },

  /**
   * Deletes a user from the hub
   *
   * @param    {user} user [the unique user id]
   * @return   {object}
   */

  deleteUser(user) {

    return api.deleteUser(user).then(res => {

      return res;

    }).fail(res => {

      return 'Error deleting user: ' + res;
    });
  },

  /**
   * Returns the IP Address of the Bridge
   *
   * @return   {object}
   */

  logBridge() {

    return hue.nupnpSearch().then(res => {

      return res[0];
    });
  },

  /*
  *
  * /////////////////
  * Individual lights
  * /////////////////
  *
   */

  /**
   * Returns all lights and statuses
   *
   * @return   {object}
   */

  getLights() {

    return api.lights().then(res => {

      return res;
    });
  },


  /**
   * Returns all scenes on the hub
   *
   * @return   {object}
   */

  getScenes() {

    return api.getScenes().then(res => {

       return res;
    });
  },

  /**
   * Returns the stats for a particular light
   *
   * @param    {string} id [the light's id]
   * @return   {object}
   */

  getStatus(id) {

    return api.lightStatus(id).then(res => {

      return res;
    });
  },

  /**
   * Sets the state of a particular light
   *
   * @param    {String} id    [the light's id]
   * @param    {object} state [an object representing the new state]
   * @return   {method}
   */

  setState(id, state) {

    return api.setLightState(id, state);
  },

  /**
   * Turns a light on or off
   *
   * @param    {String} id [the light's id]
   * @return   {method}
   */

  togglePower(id, context) {

    this.getStatus(id).then(res => {

      if (res.state.on) {

        this.setState(id, {on: false});

        return context.setProperties({
                  power: false,
                  sat: 0,
                  bri: 0,
                  hue: 0
                });

      } else {

        return this.setState(id, {on: true});
      }
    });
  },

  /**
   * Renames a light
   *
   * @param    {String} id      [The light's id]
   * @param    {String} newName [The new name of the light]
   * @return   {method}
   */

  rename(id, newName) {

    return api.setLightName(id, newName).done();
  },

  /*

    Light Groups

   */

   /**
    * Returns an object with all light groups
    *
    * @return   {object}
    */

   getGroups() {

     return api.groups().then(res => {

       return res;
     });
   },

   /**
    * Returns various attributes of the group state
    *
    * @param    {String} groupId [the ID of the group]
    * @return   {object}
    */

   getGroupInfo(groupId) {

     return api.getGroup(groupId).then(res => {

       return res;
     });
   },

   /**
    * Toggles the power state for the group
    *
    * @param    {String} groupId [the group's ID]
    * @return   {method}
    */

   toggleGroupPower(groupId) {

     this.getGroupInfo(groupId).then(res => {

       return res.lastAction.on ? this.setGroupState(groupId, {on: false}) : this.setGroupState(groupId, {on: true});

     }).done();
   },

   /**
    * Sets the state of the group
    *
    * @param    {String} groupId [The group's ID]
    * @param    {Object} state   [An object representing the new state]
    * @return   {method}
    */

   setGroupState(groupId, state) {

     return api.setGroupLightState(groupId, state);
   },

   /**
    * Renames a group
    *
    * @param    {String} groupId [the ID of the group]
    * @param    {String} newName [the new name of the group]
    * @return   {method}
    */

   renameGroup(groupId, newName) {

     return api.updateGroup(groupId, newName).done();
   }
});
