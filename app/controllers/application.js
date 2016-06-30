import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    changeMode: function(event) {
      console.log(event.target.value);
    }
  }
});
