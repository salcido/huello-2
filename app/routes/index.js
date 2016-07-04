import Ember from 'ember';

export default Ember.Route.extend({

  lightsService: Ember.inject.service('lights'),

  init() {

    console.log('initing from index...');

    let lights = this.get('lightsService');

    // get bridge ip:
    lights.logBridge().then(res => {

      console.log('bridge', res.ipaddress);
    });

    // get bridge config
    lights.config().then(res => {

      if (res.mac) {

        this.transitionTo('groups');
      }
    });
  }
});
