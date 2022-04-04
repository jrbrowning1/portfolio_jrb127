<template>
  <div id="app">
    <header>
      <h1>Duke Course Lists</h1>
    </header>

    <div id="prose">
      <p>
        This website allows you to select a subject offered at Duke, and then displays
        all the courses that are offered in that subject. Once you have the list of courses,
        you can click on the individual courses for more details. And, for more control over
        the data, you can filter by course level.
      </p>
    </div>

    <div>
      <b-button v-b-toggle.sidebar-1>Choose a subject</b-button>
      <b-sidebar id="sidebar-1" title="Subject List" shadow>
        <div class="px-3 py-2">
          <b-form-group label="Subjects" title="Subjects">
            <b-form-radio-group
              id="subject-radio"
              v-model="selectedSubject"
              :options="subjects"
              name="subject"
              stacked
            ></b-form-radio-group>
          </b-form-group>
        </div>
      </b-sidebar>
      &nbsp;
      <b-button @click="clearCourses">Clear course list</b-button>
      &nbsp;
      <b-button @click="refreshData">Refresh data</b-button>
    </div>
    <br>
    <div v-if="subjectSelected">
      <h3>Your selected subject is {{ selectedSubject }}</h3>
      <h4>There are {{numClasses}} classes in this subject</h4>
      <b-button v-b-toggle.sidebar-2>Filter courses</b-button>
      <b-sidebar id="sidebar-2" title="Filter courses" shadow right>
        <div class="px-3 py-2">
          <b-form-group label="Filter by course number" title="Filters">
            <b-form-radio-group
              id="filter-radio"
              v-model="selectedFilter"
              :options="filterChoices"
              name="filter"
              stacked
            ></b-form-radio-group>
          </b-form-group>
        </div>
      </b-sidebar>
      &nbsp;
      <b-button @click="clearFilter" active>Clear Filter</b-button>
    </div>
    <br>
    <div v-if="subjectSelected">
      <b-list-group>
        <b-list-group-item
          button
          v-for="(course, x) in displayedCourses"
          :key="x"
          v-b-modal="'my-modal'+x"
          @click="getMoreDetails(course.course_id, course.course_offer_nbr)"
        >
          {{selectedSubject + course.course_number}}
          <br>
          {{course.course_title}}
          <br>
          
          <b-modal
            :id="'my-modal'+x"
            @hidden="resetModal"
          >
            {{selectedSubject + course.course_number}} <br>
            {{course.course_title}} <br>
            <strong> Course Description: </strong>{{currCrsDescrip}} <br>
            <strong> Course Requirements: </strong>{{currCrsReqs}} <br>
          </b-modal>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      useRemoteServer: true,
      subjects: [],
      selectedSubject: '',
      subjectSelected: false,
      numClasses: 0,
      displayedCourses: [],
      filterChoices: [
        '0 to 99',
        '100 to 199',
        '200 to 299',
        '300 to 399',
        '400 to 499',
        '500 to 599',
        '600 to 699',
        '700 to 799',
      ],
      selectedFilter: '',
      currCrsDescrip: '',
      currCrsReqs: '',
      currCrsAttrs: '',
    };
  },
  watch: {
    // once the user selects a subject, go and retrieve info for that subject
    async selectedSubject() {
      if (this.selectedSubject.length > 0) {
        await this.getData();
        this.subjectSelected = true;
      }
    },
    // once the user selects a filter, go and do the filtering server side
    async selectedFilter() {
      if (this.selectedFilter.length > 0){
        await this.getData();
      }
    }
  },
  methods: {
    // called when the user wants to clear all course info, resets variables to default values
    clearCourses() {
      this.selectedSubject = '';
      this.subjectSelected = false;
      this.numClasses = 0;
      this.displayedCourses = [];
    },
    // resets modal info so info doesn't carry over to next modal
    resetModal() {
      this.currCrsAttrs = '';
      this.currCrsDescrip = '';
      this.currCrsReqs = '';
    },
    // goes back to the server and retrieves list of subjects again
    async refreshData() {
      this.subjects = [];
      const SERVER_URL = this.useRemoteServer ? 'https://salty-ocean-13479.herokuapp.com/' : '';
      const options = await fetch(`${SERVER_URL}api/get_subjects`);
      this.subjects = await options.json();
    },
    // retrieves courses associated with certain subject
    async getData() {
      // gets data either from local or remote server, depending on hardcoded value
      const SERVER_URL = this.useRemoteServer ? 'https://salty-ocean-13479.herokuapp.com/' : '';
      // puts together request URL
      const url = `${SERVER_URL}api/get_data?sub=${this.selectedSubject}&fil=${this.selectedFilter}`;
      // goes and gets json data
      const response = await fetch(url);
      const serverData = await response.json();
      // adds info to data values 
      this.numClasses = serverData.number;
      this.displayedCourses = serverData.courses;
    },
    // clears filters so all courses displayed once again
    async clearFilter() {
      this.selectedFilter = '';
      await this.getData();      
    },
    // called when user wants more details on particular course
    async getMoreDetails(course_id, course_offer) {
      // gets data either from local or remote server, depending on hardcoded value
      const SERVER_URL = this.useRemoteServer ? 'https://salty-ocean-13479.herokuapp.com/' : '';
      // puts together request URL
      const url = `${SERVER_URL}api/get_details?id=${course_id}&off=${course_offer}`;
      // goes and gets json data
      const response = await fetch(url);
      const serverData = await response.json();
      // adds info to data values 
      this.currCrsDescrip = serverData.descrip;
      this.currCrsReqs = serverData.req;
      this.currCrsAttrs = serverData.attr;
    },
  },
  computed: {
  },
  // when app is mounted, go and get the subject list from the server
  async mounted() {
    const SERVER_URL = this.useRemoteServer ? 'https://salty-ocean-13479.herokuapp.com/' : '';
    const options = await fetch(`${SERVER_URL}api/get_subjects`);
    this.subjects = await options.json();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#prose {
    padding-left: 50px;
    padding-right: 50px;
    line-height: 1.5;  
}
</style>
