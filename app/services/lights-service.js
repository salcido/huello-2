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
   * @method   function
   * @param    {string} id [the ID of the scene]
   * @return   {method}
   */

  activateScene: function(id) {

    return api.activateScene(id);
  },

  /**
   * Configures a new HueApi instance
   *
   * @method   function
   * @return   {object}
   */

  config: function() {

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
   * @method   function
   * @param    {user} user [the unique user id]
   * @return   {object}
   */

  deleteUser: function(user) {

    return api.deleteUser(user).then(res => {

      return res;

    }).fail(res => {

      return 'Error deleting user: ' + res;
    });
  },

  /**
   * Returns the IP Address of the Bridge
   *
   * @method   function
   * @return   {object}
   */

  logBridge: function() {

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
   * @method   function
   * @return   {object}
   */

  getLights: function() {

    return api.lights().then(res => {

      return res;
    });
  },


  /**
   * Returns all scenes on the hub
   *
   * @method   function
   * @return   {object}
   */

  getScenes: function() {

    return api.getScenes().then(res => {

       return res;
    });
  },

  /**
   * Returns the stats for a particular light
   *
   * @method   function
   * @param    {string} id [the light's id]
   * @return   {object}
   */

  getStatus: function(id) {

    return api.lightStatus(id).then(res => {

      return res;
    });
  },

  /**
   * Sets the state of a particular light
   *
   * @method   function
   * @param    {String} id    [the light's id]
   * @param    {object} state [an object representing the new state]
   * @return   {method}
   */

  setState: function(id, state) {

    return api.setLightState(id, state);
  },

  /**
   * Turns a light on or off
   *
   * @method   function
   * @param    {String} id [the light's id]
   * @return   {method}
   */

  togglePower: function(id, context, cb) {

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
   * @method   function
   * @param    {String} id      [The light's id]
   * @param    {String} newName [The new name of the light]
   * @return   {method}
   */

  rename: function(id, newName) {

    return api.setLightName(id, newName).done();
  },

  /*

    Light Groups

   */

   /**
    * Returns an object with all light groups
    *
    * @method   function
    * @return   {object}
    */

   getGroups: function() {

     return api.groups().then(res => {

       return res;
     });
   },

   /**
    * Returns various attributes of the group state
    *
    * @method   function
    * @param    {String} groupId [the ID of the group]
    * @return   {object}
    */

   getGroupInfo: function(groupId) {

     return api.getGroup(groupId).then(res => {

       return res;
     });
   },

   /**
    * Toggles the power state for the group
    *
    * @method   function
    * @param    {String} groupId [the group's ID]
    * @return   {method}
    */

   toggleGroupPower: function(groupId) {

     this.getGroupInfo(groupId).then(res => {

       return res.lastAction.on ? this.setGroupState(groupId, {on: false}) : this.setGroupState(groupId, {on: true});

     }).done();
   },

   /**
    * Sets the state of the group
    *
    * @method   function
    * @param    {String} groupId [The group's ID]
    * @param    {Object} state   [An object representing the new state]
    * @return   {method}
    */

   setGroupState: function(groupId, state) {

     return api.setGroupLightState(groupId, state);
   },

   /**
    * Renames a group
    *
    * @method   function
    * @param    {String} groupId [the ID of the group]
    * @param    {String} newName [the new name of the group]
    * @return   {method}
    */

   renameGroup: function(groupId, newName) {

     return api.updateGroup(groupId, newName).done();
   }
});
