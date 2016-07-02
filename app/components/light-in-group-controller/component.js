import Ember from 'ember';

// [{"id":"001788fffe2282ae","ipaddress":"10.0.1.2"}]

export default Ember.Component.extend({

  // Light service injection
  lightsService: Ember.inject.service('lights'),

  // The id of the light
  lightId: null,

  // the current state of the light
  lightState: null,

  // the name of the light
  lightName: null,

  // Assign the initial values of each light
  init: function() {

    this._super(...arguments);

    let lights = this.get('lightsService'),
        id = this.get('light');

    // set light id
    this.set('lightId', id);

    this.set('lightState', lights.getStatus(id)).then( res => {

      this.set('lightState', res.state);

      this.set('lightName', res.name);

      //console.log('res:', res);
    });
  },

  didReceiveAttrs: function() {
    //console.log('didReceiveAttrs')

    let lights = this.get('lightsService'),
        id = this.get('light');

    this.set('lightId', id);

    this.set('lightState', lights.getStatus(id)).then( res => {

      this.set('lightState', res.state);

      this.set('lightName', res.name);
    });
  },

  actions: {

    togglePower: function() {

      let
          id = this.get('lightId'),
          lights = this.get('lightsService');

      lights.togglePower(id);

      Ember.run.later(() => {

          this.sendAction('update');

          lights.getStatus(id).then(res => {

            this.set('lightState', res.state);
          });
      }, 500);
    },

    changeColor: function() {

      let value = event.target.value,
          id = event.target.id,
          lights = this.get('lightsService');

      lights.setState(id, {hue: value});
    },

    changeBrightness: function() {

      let value = event.target.value,
          id = event.target.id,
          lights = this.get('lightsService');

      lights.setState(id, {bri: value});
    },

    changeSaturation: function() {

      let value = event.target.value,
          id = event.target.id,
          lights = this.get('lightsService');

      lights.setState(id, {sat: value});
    },

    changeName: function(newName, id) {

      let lights = this.get('lightsService');

      lights.rename(id, newName);

      // update the current model
      Ember.run.later(() => {
          this.sendAction('update');
      }, 500);
    }
  }
});


//lights.setState(id, { on: true });

// let
//     HueApi = hue.HueApi,
//     hostname = '10.0.1.2',
//     username = 'mbRWI0ncjZbp2pRH89KeId2-ocSansGrD0eRY12o',
//     userDescription = 'Huello 2',
//     api;

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
// api = new HueApi(hostname, username);

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
// api.lights().then(this.get('lights.displayResult')).done();
