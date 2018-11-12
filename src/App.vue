<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <p>{{ activity }}</p>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        message: 'Urban Planner',
        activity: {}
      }
    },
    created: function() {
      this.get();
    },
    methods: {
      get: function() {
        let vm = this;

        fetch('http://www.boredapi.com/api/activity/')
          .then(res => {
            if (res.ok) return res.json().then(body => vm.activity = body);

            throw new Error('Got a not-ok response.');
          })
          .catch(function(error) {
            console.log('Fetch data has failed: ', error.message);
            vm.activity = 'Error fetching data.';
          });
      }
    }
  }
</script>
