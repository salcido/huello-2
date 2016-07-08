import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    changeMode: function(value) {

      this.send('updateModel', value.id);

      // Show app overlay
      Ember.$('.mode-overlay').fadeIn('fast');

      // Reset Group control positions/opacities
      Ember.$('.group-controller .range-hue').prop('value', 32640);
  		Ember.$('.group-controller .range-bri').prop('value', 128);
  		Ember.$('.group-controller .range-sat').prop('value', 128);
      Ember.$('.group-spectrum-bg, .group-brightness-wrap').css('opacity', 1);
    },

    changeScene: function(scene) {

      this.send('applyScene', scene);
    }
  }
});
