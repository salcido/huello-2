import Ember from 'ember';

import hue from 'npm:node-hue-api';

// [{"id":"001788fffe2282ae","ipaddress":"10.0.1.2"}]

export default Ember.Component.extend({

  lights: Ember.inject.service(),

  actions: {

    displayInfo: function() {

      let
          HueApi = hue.HueApi,
          hostname = '10.0.1.2',
          username = 'mbRWI0ncjZbp2pRH89KeId2-ocSansGrD0eRY12o',
          userDescription = 'Huello 2',
          api;

      // Log id/ipaddress
      //this.get('lights').logBridge();

      // api = new HueApi();
      //
      // // create username
      // api.registerUser(hostname, userDescription)
      //   .then(this.get('lights.displayUserResult'))
      //   .fail(this.get('displayError'))
      //   .done();

      // Log bridge config
      api = new HueApi(hostname, username);

      // api.getConfig().then(this.get('lights.displayResult')).done();
      //
      // api.getConfig(function(err, config) {
      //
      //     if (err) {
      //       throw err;
      //     }
      //
      //     this.get('lights').displayResult(config);
      // });

      // Log full state of bridge
      // api.fullState().then(this.get('lights.displayResult')).done();
      //
      // api.fullState(function(err, config) {
      //   if (err) { throw err; }
      //   this.get('lights').displayResult(config);
      // });

      // Log lights state
      api.lights().then(this.get('lights.displayResult')).done();
    }
  }
});
