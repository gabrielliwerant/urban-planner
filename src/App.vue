<template>
  <div id="app">
    <h1 class="md-display-1 title">{{ title }}</h1>

    <form v-on:submit.prevent="onSubmit">
      <div class="md-layout md-alignment-top-center">
        <md-field class="md-layout-item md-size-25" :class="getFormMsgClass">
          <label>Schedule Days</label>
          <md-input v-model="dayNum" placeholder="Enter number of days to plan"></md-input>
          <span class="md-error">{{ getFormErrorMsg }}</span>
        </md-field>
        <md-button v-on:click="onSubmit" class="md-layout-item md-size-5 md-raised md-primary">Submit</md-button>
      </div>
      <md-snackbar md-position="center" :md-duration="2000" :md-active.sync="hasSuccess" md-persistent>
        <span class="success-msg">{{ formSuccessMsg }}</span>
      </md-snackbar>
    </form>

    <ol class="md-layout md-gutter activity-grid">
      <li v-for="(activity, index) in activities" class="md-layout-item md-size-15 activity-grid-item">
        <md-card md-with-hover v-if="activity.activity">
          <md-ripple class="activity-card">
            <md-card-header>{{ index + 1 }}.</md-card-header>
            <md-card-content>{{ activity.activity }}</md-card-content>
          </md-ripple>
        </md-card>
        <md-card class="activity-card inactive" v-if="!activity.activity">
          <md-card-header>{{ index + 1 }}.</md-card-header>
        </md-card>
      </li>
    </ol>
  </div>
</template>

<script>
  import 'vue-material/dist/vue-material.min.css';
  import 'vue-material/dist/theme/default.css';
  import './styles.scss';

  export default {
    name: 'app',
    data () {
      return {
        title: 'Welcome to Urban Planner!',
        dayNum: '',
        maxDays: 31,
        hasError: false,
        hasSuccess: false,
        formSuccessMsg: 'Form successfully submitted!',
        activities: []
      }
    },
    computed: {
      getFormMsgClass: function() {
        return {
          'md-invalid': this.hasError
        }
      },
      getFormErrorMsg: function() {
        return `Please enter a number, 1 through ${this.maxDays}`;
      }
    },
    created: function() {
      for (var i = 0; i < this.maxDays; i += 1) {
        this.activities.push({});
      }
    },
    methods: {
      onSubmit: function() {
        this.dayNum = parseInt(this.dayNum, 10);

        if (
          this.dayNum < 1 ||
          this.dayNum > this.maxDays ||
          isNaN(this.dayNum) ||
          typeof this.dayNum !== 'number'
        ) {
          this.hasError = true;
          this.hasSuccess = false;
          this.dayNum = '';
        } else {
          this.hasError = false;
          this.hasSuccess = true;

          // Make all of our requests in a row
          for (var i = 0; i < this.dayNum; i += 1) {
            this.get(i);
          }
        }
      },
      get: function(i) {
        let vm = this;

        fetch('http://www.boredapi.com/api/activity/')
          .then(res => {
            if (res.ok) return res.json().then(body => vm.activities.splice(i, 1, body));

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
