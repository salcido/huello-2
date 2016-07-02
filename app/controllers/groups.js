import Ember from 'ember';

export default Ember.Controller.extend({

  currentGroup: Ember.computed('currentGroup', function() {

    return this.get('currentGroup');
  }),

  actions: {

    changeMode: function(value) {

      this.send('updateModel', value.id);
    }
  }
});
