import Ember from 'ember';

import hue from 'npm:node-hue-api';

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

  displayUserResult: function(result) {

    console.log('Created user: ' + JSON.stringify(result));
  },

  displayError: function(err) {
    console.log(err);
  },

  hueApi: function() {

    return hue.HueApi;
  }
});
