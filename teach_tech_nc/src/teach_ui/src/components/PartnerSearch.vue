<template>
    <div>
        <b-button variant="outline-primary" @click="displayAllPartners">
            View all student partners
        </b-button>
        &nbsp;

        <b-button v-b-modal="'partner-search'" variant="outline-success">
            Search for a student partner
        </b-button>
        <b-modal id="partner-search" @ok="searchForPartners" @hidden="resetPartnerData">
            <h2>Feature in progress! Check back soon :)</h2>
            <!-- wasn't worth enabling this feature yet with only four student partners -->
            <!-- <div>
                <label for="major-select">Major</label>
                <multiselect
                    v-model="majorValue"
                    :options="majorOptions"
                    :multiple="true"
                    :close-on-select="false"
                    id="major-select">
                </multiselect>
            </div>
            <div>
                <label for="minor-select">Minor</label>
                <multiselect
                    v-model="minorValue"
                    :options="majorOptions"
                    :multiple="true"
                    :close-on-select="false"
                    id="minor-select">
                </multiselect>
            </div>
            <div>
                <label for="year-select">Year</label>
                <multiselect
                    v-model="yearValue"
                    :options="yearOptions"
                    :multiple="true"
                    :close-on-select="false"
                    id="year-select">
                </multiselect>
            </div> -->
        </b-modal>
        <br><br>
        <div v-if="displayStudents">
            <b-overlay :show="pageLoading" rounded="sm">
                <b-list-group id="student-display">
                    <b-list-group-item
                        button
                        v-for="(student, x) in students"
                        :key="x"
                        v-b-modal="'my-modal'+x"
                        @click="getBio(student.netID)"
                    >
                        <strong>Student name:</strong> {{student.name}}
                        <br>
                        <strong>Student email:</strong> {{student.email}}
                        <br>

                        <b-modal
                            :id="'my-modal'+x"
                            @hidden="resetBio"
                        >
                            <b-overlay :show="studentLoading" rounded="sm">
                                <div class="center">
                                    <h3>{{currentStudent.name}}</h3>
                                    <h5>{{currentStudent.year}}</h5>
                                    "{{currentStudent.valueStatement}}"
                                </div>
                                <br>
                                <strong> Area(s) of study: </strong>{{currentStudent.major}} <br>
                                <strong> Fun fact: </strong>{{currentStudent.funFact}} <br>
                            </b-overlay>
                        </b-modal>
                    </b-list-group-item>
                </b-list-group>
            </b-overlay>
            <br><br>
        </div>
    </div>
</template>

<script>
// from resource 1
// import Multiselect from 'vue-multiselect'
// import Vue from 'vue'
// register globally
// Vue.component('multiselect', Multiselect)

export default {
    // components: { Multiselect },
    data() {
        return {
            useRemoteServer: true,
            students: [],
            displayStudents: false,
            majorValue: null,
            minorValue: null,
            yearValue: null,
            currentStudent: '',
            majorOptions: ['Computer Science', 'Political Science', 'Public Policy'],
            yearOptions: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate Student'],
            pageLoading: false,
            studentLoading: false,
        };
    },
    methods: {
        // called when someone exits out of partner search modal without clicking okay
        resetPartnerData() {
            this.majorValue = null;
            this.minorValue = null;
            this.yearValue = null;
        },
        // called when someone hits okay on partner search modal
        searchForPartners() {
            // **TO DO**
            // console.log('Will implement this using backend data');
        },
        // display all student partners - uses netids and duke api
        async displayAllPartners() {
            this.pageLoading = true;
            const SERVER_URL = this.useRemoteServer ? 'https://stormy-caverns-94672.herokuapp.com/' : '';
            const response = await fetch(`${SERVER_URL}api/get_students`);
            const serverData = await response.json();
            this.students = serverData;
            this.displayStudents = true;
            this.pageLoading = false;
            // console.log('The students are ', this.students);
        },
        async getBio(netID) {
            this.studentLoading = true;
            const SERVER_URL = this.useRemoteServer ? 'https://stormy-caverns-94672.herokuapp.com/' : '';
            const url = `${SERVER_URL}api/get_student_bio?netid=${netID}`;
            // console.log('about to go fetch student bio information');
            const response = await fetch(url);
            const serverData = await response.json();
            this.currentStudent = serverData;
            this.studentLoading = false;
            // console.log('this is the student bio information ', serverData);
        },
        resetBio() {
            this.currentStudent = '';
        },
    },

};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

#student-display {
    margin-right: 20%;
    margin-left: 20%;
}

.center {
    text-align: center;
}
</style>
