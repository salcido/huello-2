import Ember from 'ember';

// ember-browserify
import hue from 'npm:node-hue-api';

let HueApi = hue.HueApi,
    api = new HueApi();

export default Ember.Route.extend({

  /**
   * Inject the light service
   *
   * @method   service
   * @return   {undefined}
   */

  lightsService: Ember.inject.service('lights'),

  /**
   * Registers a new user on the hub
   *
   * @method   function
   * @return   {undefined}
   */

  registerUser: function() {

    let
        hostname = localStorage.getItem('hostname'),
        int,
        lights = this.get('lightsService'),
        userDescription = localStorage.getItem('userDescription');

    int = setInterval(() => {

      // Attempt to connect to the hub...
      api.registerUser(hostname, userDescription).then(res => {

        clearInterval(int);

        // Store the returned username
        localStorage.setItem('username', res);

        // configure the lightsService to use the new username/hostname values
        lights.config().then(resp => {

          if (resp.mac) {

            this.transitionTo('groups');
          }
        });

      }).fail(res => {

        Ember.$('.output').text('Please press the link button on the hub.').fadeIn('slow');

        console.info('[Huello 2]', res.message);
      });
    }, 1000);
  },

  /**
   * Sets the `hostname` in localStorage
   *
   * @method   function
   * @return   {undefined}
   */

  setHostname: function() {

    let lights = this.get('lightsService');

    lights.logBridge().then(res => {

      console.info('[Huello 2] Setting hostname');

      localStorage.setItem('hostname', res.ipaddress);

      localStorage.setItem('userDescription', 'Huello 2');

      console.log(localStorage.getItem('hostname'), localStorage.getItem('userDescription'));

      return this.registerUser();
    });
  },

  /**
   * Checks for an existing username/hostname value
   *
   * @method   init
   * @return   {undefined}
   */

  init() {

    this._super(...arguments);

    let
        hostname = localStorage.getItem('hostname'),
        lights = this.get('lightsService'),
        username = localStorage.getItem('username');

    // Existing user
    if (username && hostname) {

      Ember.run.next(function() {

        Ember.$('.output').text('Connecting to Hue...').fadeIn('slow');
      });

      lights.config().then(res => {

        if (res.mac) {

          this.transitionTo('groups');
        }
      });

    // A new user needs to be created
    } else {

      this.setHostname();
    }
  }
});
