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

  getLights: function() {

    return api.lights().then(res => {
      return res;
    });
  },

  getStatus: function(id) {

    return api.lightStatus(id).then(res => {
      console.log('Light Status: ', res.state);
      return res.state;
    });
  },

  setState: function(id, state) {

    return api.setLightState(id, state);
  },

  togglePower: function(id) {

    this.getStatus(id).then(res => {

      return res.on ? this.setState(id, {on: false}) : this.setState(id, {on: true});
    }).done();
  }
});
