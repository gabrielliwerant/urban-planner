import Vue from 'vue';
import App from './App.vue';

describe('App', () => {
  it('has a created hook', () => {
    expect(typeof App.created).toBe('function');
  });

  it('sets the correct amount of default data for activities', () => {
    expect(typeof App.computed.setInitialActivities).toBe('function');
    expect(typeof App.data().maxDays).toBe('number');

    // Mount a new instance for testing
    const app = new Vue(App);
    const vm = app.$mount();

    expect(vm.$data.activities.length).toEqual(vm.$data.maxDays);
  });
});
