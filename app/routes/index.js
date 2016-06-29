import Ember from 'ember';

export default Ember.Route.extend({


  /**
   * Inject Lights Service
   *
   * @class Route.index
   * @constructor
   * @extends Ember.Route
   */
  lightsService: Ember.inject.service('lights'),

  /**
   * Index's model
   *
   * @method model
   */
  // model: function() {
  //
  //   return this.get('lightsService').getLights();
  // },

  model: function() {

    let temp = {
      "lights": [
        {
          "id": "1",
          "state": {
            "on": true,
            "bri": 159,
            "hue": 65186,
            "sat": 253,
            "effect": "none",
            "xy": [
              0.6642,
              0.3169
            ],
            "ct": 500,
            "alert": "none",
            "colormode": "hs",
            "reachable": true
          },
          "type": "Extended color light",
          "name": "Left Turntable",
          "modelid": "LCT001",
          "manufacturername": "Philips",
          "uniqueid": "00:17:88:01:00:fd:4d:8b-0b",
          "swversion": "5.23.1.13452"
        },
        {
          "id": "2",
          "state": {
            "on": true,
            "bri": 86,
            "hue": 14468,
            "sat": 251,
            "effect": "none",
            "xy": [
              0.5229,
              0.4322
            ],
            "ct": 488,
            "alert": "none",
            "colormode": "hs",
            "reachable": true
          },
          "type": "Extended color light",
          "name": "TV Lamp",
          "modelid": "LCT001",
          "manufacturername": "Philips",
          "uniqueid": "00:17:88:01:00:fd:47:45-0b",
          "swversion": "5.23.1.13452"
        },
        {
          "id": "3",
          "state": {
            "on": true,
            "bri": 159,
            "hue": 65186,
            "sat": 253,
            "effect": "none",
            "xy": [
              0.6642,
              0.3169
            ],
            "ct": 500,
            "alert": "none",
            "colormode": "hs",
            "reachable": true
          },
          "type": "Extended color light",
          "name": "Right Turntable",
          "modelid": "LCT001",
          "manufacturername": "Philips",
          "uniqueid": "00:17:88:01:00:fd:4c:97-0b",
          "swversion": "5.23.1.13452"
        },
        {
          "id": "4",
          "state": {
            "on": true,
            "bri": 86,
            "hue": 14468,
            "sat": 251,
            "effect": "none",
            "xy": [
              0.5229,
              0.4322
            ],
            "ct": 488,
            "alert": "none",
            "colormode": "hs",
            "reachable": true
          },
          "type": "Extended color light",
          "name": "Tall Lamp",
          "modelid": "LCT001",
          "manufacturername": "Philips",
          "uniqueid": "00:17:88:01:00:fd:6a:f1-0b",
          "swversion": "5.23.1.13452"
        },
        {
          "id": "6",
          "state": {
            "on": false,
            "bri": 1,
            "hue": 14468,
            "sat": 251,
            "effect": "none",
            "xy": [
              0.5229,
              0.4322
            ],
            "ct": 488,
            "alert": "none",
            "colormode": "hs",
            "reachable": true
          },
          "type": "Extended color light",
          "name": "Computer Lamp",
          "modelid": "LCT001",
          "manufacturername": "Philips",
          "uniqueid": "00:17:88:01:00:f6:1f:9c-0b",
          "swversion": "5.23.1.13187"
        },
        {
          "id": "7",
          "state": {
            "on": true,
            "bri": 253,
            "hue": 239,
            "sat": 253,
            "effect": "none",
            "xy": [
              0.7011,
              0.2981
            ],
            "alert": "none",
            "colormode": "hs",
            "reachable": true
          },
          "type": "Color light",
          "name": "DJ Booth Flood",
          "modelid": "LLC011",
          "manufacturername": "Philips",
          "uniqueid": "00:17:88:01:00:c2:b1:95-0b",
          "swversion": "5.23.1.13452"
        },
        {
          "id": "8",
          "state": {
            "on": true,
            "bri": 158,
            "hue": 14468,
            "sat": 251,
            "effect": "none",
            "xy": [
              0.5307,
              0.4518
            ],
            "alert": "none",
            "colormode": "hs",
            "reachable": true
          },
          "type": "Color light",
          "name": "Bookshelf Bloom",
          "modelid": "LLC011",
          "manufacturername": "Philips",
          "uniqueid": "00:17:88:01:00:c2:b1:9a-0b",
          "swversion": "5.23.1.13452"
        },
        {
          "id": "9",
          "state": {
            "on": true,
            "bri": 159,
            "hue": 65187,
            "sat": 253,
            "effect": "none",
            "xy": [
              0.6976,
              0.2942
            ],
            "alert": "none",
            "colormode": "hs",
            "reachable": true
          },
          "type": "Color light",
          "name": "Tall Record Shelf",
          "modelid": "LST001",
          "manufacturername": "Philips",
          "uniqueid": "00:17:88:01:00:cc:19:a8-0b",
          "swversion": "5.23.1.13452"
        },
        {
          "id": "10",
          "state": {
            "on": true,
            "bri": 80,
            "hue": 239,
            "sat": 253,
            "effect": "none",
            "xy": [
              0.6714,
              0.324
            ],
            "ct": 153,
            "alert": "none",
            "colormode": "hs",
            "reachable": true
          },
          "type": "Extended color light",
          "name": "Bedside Lamp",
          "modelid": "LCT007",
          "manufacturername": "Philips",
          "uniqueid": "00:17:88:01:10:31:04:50-0b",
          "swversion": "5.38.1.14919"
        },
        {
          "id": "11",
          "state": {
            "on": true,
            "bri": 253,
            "alert": "none",
            "reachable": true
          },
          "type": "Dimmable light",
          "name": "Fireplace",
          "modelid": "LWB006",
          "manufacturername": "Philips",
          "uniqueid": "00:17:88:01:10:46:23:4a-0b",
          "swversion": "5.38.1.15095"
        },
        {
          "id": "12",
          "state": {
            "on": true,
            "bri": 254,
            "alert": "none",
            "reachable": false
          },
          "type": "Dimmable light",
          "name": "Bathroom",
          "modelid": "ZLL Light",
          "manufacturername": "GE_Appliances",
          "uniqueid": "7c:e5:24:00:00:03:8c:e5-01",
          "swversion": "1.3.4.0"
        }
      ]
    };

    return temp;
  },

  actions: {

    /**
     * Updates the model with all lights' current state
     */

    updateModel: function() {

      return Ember.run.later(() => {
          this.refresh();
      }, 500);
    }
  }
});
