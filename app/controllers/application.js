import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    changeMode: function(value) {

      console.log(value.id);
    }
  }
});
