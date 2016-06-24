import Ember from 'ember';

import hue from 'npm:node-hue-api';

export default Ember.Service.extend({

  displayBridges: function(bridge) {

    console.log('Hue Bridges Found: ' + JSON.stringify(bridge));
  },

  hue: function() {

    return hue.nupnpSearch().then(this.get('displayBridges')).done();
  }
});
