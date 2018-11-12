<template>
  <div id="app">
    <h1>{{ message }}</h1>

    <form v-on:submit.prevent="onSubmit">
      <input v-model="dayNum" placeholder="Number of days to plan...">
      <input type="submit">
      <div>{{ formError }}</div>
      <div>{{ formSuccess }}</div>
    </form>

    <ol>
      <li v-for="activity in activities">
        {{ activity.activity }}
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        message: 'Urban Planner',
        dayNum: '',
        formError: '',
        formSuccess: '',
        activities: []
      }
    },
    methods: {
      onSubmit: function() {
        this.activities = [];
        this.dayNum = parseInt(this.dayNum, 10);

        if (
          this.dayNum < 0 ||
          this.dayNum > 31 ||
          isNaN(this.dayNum) ||
          typeof this.dayNum !== 'number'
        ) {
          this.formSuccess = '';
          this.formError = 'Please enter a number between 0 and 31';
          this.dayNum = '';
        } else {
          this.formError = '';
          this.formSuccess = 'Form successfully submitted!';

          // Make all of our requests in a row
          for (var i = 0; i < this.dayNum; i += 1) {
            this.get();
          }
        }
      },
      get: function() {
        let vm = this;

        fetch('http://www.boredapi.com/api/activity/')
          .then(res => {
            if (res.ok) return res.json().then(body => vm.activities.push(body));

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
