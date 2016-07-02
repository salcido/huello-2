import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    changeMode: function(value) {

      this.send('updateModel', value.id);
    }
  }
});
