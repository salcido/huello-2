import Ember from 'ember';

// ember-browserify
import hue from 'npm:node-hue-api';

let
    HueApi = hue.HueApi,
    hostname = '10.0.1.2',
    username = 'mbRWI0ncjZbp2pRH89KeId2-ocSansGrD0eRY12o',
    api;

api = new HueApi(hostname, username);

export default Ember.Service.extend({

  displayBridges: function(bridge) {

    console.log('Hue Bridges Found: ' + JSON.stringify(bridge));
  },

  logBridge: function() {

    return hue.nupnpSearch().then(this.get('displayBridges')).done();
  },

  displayResult: function(result) {

    console.log(JSON.stringify(result, null, 2));
  },

  /*

    Individual lights

   */

  // Get all lights and status
  getLights: function() {

    return api.lights().then(res => {

      return res;
    });
  },

  // Get light status
  getStatus: function(id) {

    return api.lightStatus(id).then(res => {

      //console.log('Light Status: ', res.state);

      return res.state;
    });
  },

  // Set light state
  setState: function(id, state) {

    return api.setLightState(id, state);
  },

  // Power on/off lights
  togglePower: function(id) {

    this.getStatus(id).then(res => {

      return res.on ? this.setState(id, {on: false}) : this.setState(id, {on: true});

    }).done();
  },

  // Rename a light
  rename: function(id, newName) {

    return api.setLightName(id, newName).done();
  },

  /*

    Light Groups

   */

   // Get ALL light groups
   getGroups: function() {

     return api.groups().then(res => {

       return res;
     });
   },

   getGroupState: function(groupId) {

     return api.getGroup(groupId).then(res => {

       return res.lastAction;
     });
   },

   toggleGroupPower: function(groupId) {

     this.getGroupState(groupId).then(res => {

       return res.on ? this.setGroupState(groupId, {on: false}) : this.setGroupState(groupId, {on: true});

     }).done();
   },

   setGroupState: function(groupId, state) {

    //console.log('setting group ' + groupId + ' with state: ' + JSON.stringify(state));

     return api.setGroupLightState(groupId, state);
   },

   // Rename a light
   renameGroup: function(groupId, newName) {

     return api.updateGroup(groupId, newName).done();
   }
});
