<template>
    <div>
        <div v-if="!optionSelected">
            <h2>First let's figure out how you want to search</h2>
            <br>
            <div class="search-selection">
                <label for="search-subject">
                    <h4>Click here if you want to search by subject (e.g. English)</h4></label>
                <br>
                <b-button id="search-subject" @click="displaySearch('subject')">
                    Subject search</b-button>
            </div>
            <br><br>
            <div class="search-selection">
                <label for="search-topic">
                    <h4>
                        Click here if you want to search by topic (e.g. artificial intelligence)
                    </h4>
                </label>
                <br>
                <b-button id="search-topic" @click="displaySearch('topic')">Topic search</b-button>
            </div>
        </div>

        <div class="search-selection" v-if="optionSelected">
            <div v-if="searchSelection == 'subject'">
                <label for="subject-select"><strong>Browse by subject standards</strong></label>
                <div class="flex">
                    <multiselect
                        v-model="subjectValues"
                        :options="subjectOptions"
                        :multiple="true"
                        :close-on-select="false"
                        :disabled="topicSelected"
                        id="subject-select">
                    </multiselect>
                    <b-button
                        @click="subjectSearch"
                        :disabled="subjectValues===''"
                    >
                        Search
                    </b-button>
                </div>
            </div>
            <div v-if="searchSelection == 'topic'">
                <label for="topic-select"><strong>Browse by tech ed topic</strong></label>
                <div class="flex">
                    <multiselect
                    v-model="topicValues"
                    :options="topicOptions"
                    :multiple="true"
                    :close-on-select="false"
                    :disabled="subjectSelected"
                    id="topic-select">
                </multiselect>
                <b-button
                    @click="topicSearch"
                    :disabled="topicValues===''"
                >
                    Search
                </b-button>
                </div>
            </div>
        </div>
        <br>
        <div>
            <b-overlay :show="pageLoading" rounded="sm">
                <div v-if="topicContent.length > 0" class="content">
                    <b-button v-b-toggle.sidebar-1>Filter resources</b-button>
                    <b-sidebar id="sidebar-1" title="Filter by subject" shadow backdrop>
                        <b-form-group class="subject-filters">
                            <b-form-checkbox-group
                                id="checkbox-group-1"
                                v-model="subjectFilter"
                                :options="subjectOptions"
                                stacked
                            >
                            </b-form-checkbox-group>
                        </b-form-group>
                        <b-button
                            v-b-toggle.sidebar-1
                            class="subject-filter-button"
                            @click="filterBySubject"
                        >
                            Apply Filter
                        </b-button>
                        <b-button
                            v-b-toggle.sidebar-1
                            class="subject-filter-button"
                            @click="clearSubjectFilter"
                        >
                            Clear Filter
                        </b-button>
                    </b-sidebar>
                    <resource-cards
                        :topicContent="topicContent"
                    >
                    </resource-cards>
                </div>
                <div v-if="subjectContent.length > 0" class="content">
                    <b-button v-b-toggle.sidebar-2>Filter resources</b-button>
                    <b-sidebar id="sidebar-2" title="Filter by topic" shadow backdrop>
                        <b-form-group class="topic-filters">
                            <b-form-checkbox-group
                                id="checkbox-group-2"
                                v-model="topicFilter"
                                :options="topicOptions"
                                stacked
                            >
                            </b-form-checkbox-group>
                        </b-form-group>
                        <b-button
                            v-b-toggle.sidebar-2
                            class="topic-filter-button"
                            @click="filterByTopic"
                        >
                            Apply Filter
                        </b-button>
                        <b-button
                            v-b-toggle.sidebar-2
                            class="topic-filter-button"
                            @click="clearTopicFilter"
                        >
                            Clear Filter
                        </b-button>
                    </b-sidebar>
                    <resource-cards
                        :topicContent="subjectContent"
                    >
                    </resource-cards>
                </div>
                <div v-if="noContent.length > 0" class="content">
                    <div
                        v-for="(header, index) in noContent"
                        :key="index"
                    >
                        <br>
                        <h3 class="underline">
                            <strong>{{header}}</strong>
                        </h3>
                        <h4>
                            No content for this {{searchSelection}} yet. Check back
                            again soon!
                        </h4>
                    </div>
                    <br><br>
                </div>
            </b-overlay>
        </div>
    </div>
</template>

<script>
// from resource 1
import Multiselect from 'vue-multiselect';
import Vue from 'vue';
// eslint-disable-next-line import/no-unresolved
import ResourceCards from '@/components/ResourceCards.vue';
// register globally
Vue.component('multiselect', Multiselect);

export default {
    components: {
        Multiselect,
        ResourceCards,
    },
    data() {
        return {
            useRemoteServer: true,
            optionSelected: false,
            searchSelection: '',
            subjectValues: '',
            topicValues: '',
            subjectSelected: false,
            topicSelected: false,
            subjectOptions: ['9-10th grade English', '11-12th grade English', 'Civics', 'Computer Science'],
            topicOptions: ['Artificial Intelligence', 'Misinformation', 'Ethical Tech'],
            topicContent: '',
            allTopicContent: '',
            subjectContent: '',
            allSubjectContent: '',
            noContent: '',
            pageLoading: false,
            subjectFilter: [],
            topicFilter: [],
        };
    },
    methods: {
        displaySearch(toSearchFor) {
            this.optionSelected = true;
            // if we're searching by topic
            if (toSearchFor === 'topic') {
                console.log('topic selected');
                this.searchSelection = 'topic';
            }
            // if we're searching by subject
            if (toSearchFor === 'subject') {
                console.log('subject selected');
                this.searchSelection = 'subject';
            }
        },
        clearSubjectFilter() {
            // reset the filter
            this.subjectFilter = [];
            // reset content to all original content
            this.topicContent = this.allTopicContent;
        },
        clearTopicFilter() {
            // reset the filter
            this.topicFilter = [];
            // reset content to all original content
            this.subjectContent = this.allSubjectContent;
        },
        filterBySubject() {
            // console.log('the topic content is ', this.allTopicContent);
            // console.log('the subjects i am going to be filtering for are ', this.subjectFilter);
            // use all content as starting point rather than current stuff being displayed
            this.topicContent = this.allTopicContent.map((topic) => {
                const tempArray = topic.resources.filter((resource) => {
                    // keeps track of whether a resource contains a certain subject
                    let contains = false;
                    // have to apply against each subject selected
                    this.subjectFilter.forEach((subjectFilter) => {
                        // if any of the resource subjects match the one we're currently looking at
                        if (resource.subjects.includes(subjectFilter)) {
                            contains = true;
                        }
                    });
                    // console.log('found a match ', contains);
                    return contains;
                });
                // console.log('this is the tempArray ', tempArray);
                // create new object to be returned
                return {
                    resources: tempArray,
                    title: topic.title,
                };
            });
            // console.log('the new topic content is ', this.topicContent);
            // console.log('the og topic content is ', this.allTopicContent);
        },
        filterByTopic() {
            // console.log('the topic content is ', this.allSubjectContent);
            // console.log('the subjects i am going to be filtering for are ', this.topicFilter);
            // use all content as starting point rather than current stuff being displayed
            this.subjectContent = this.allSubjectContent.map((subject) => {
                const tempArray = subject.resources.filter((resource) => {
                    // keeps track of whether a resource contains a certain subject
                    let contains = false;
                    // have to apply against each subject selected
                    this.topicFilter.forEach((topicFilter) => {
                        // if any of the resource subjects match the one we're currently looking at
                        if (resource.topics.includes(topicFilter)) {
                            contains = true;
                        }
                    });
                    // console.log('found a match ', contains);
                    return contains;
                });
                // console.log('this is the tempArray ', tempArray);
                // create new object to be returned
                return {
                    resources: tempArray,
                    title: subject.title,
                };
            });
            // console.log('the new topic content is ', this.subjectContent);
            // console.log('the og topic content is ', this.allSubjectContent);
        },
        async topicSearch() {
            // set up variable for overlay
            this.pageLoading = true;
            // console.log('The topics that I am going to be searching for are ', this.topicValues);
            // decide what server i am going to use (heroku when deployed)
            const SERVER_URL = this.useRemoteServer ? 'https://stormy-caverns-94672.herokuapp.com/' : '';
            // set up the url
            const url = `${SERVER_URL}api/get_resources?topic=${this.topicValues}`;
            // console.log('about to go fetch');
            const response = await fetch(url);
            const serverData = await response.json();
            // console.log('this is the server data ', serverData);
            // add data to variables
            this.topicContent = serverData.content;
            this.allTopicContent = serverData.content;
            // figure out which "headers" don't have any corresponding content
            this.noContent = this.topicValues.filter((x) => !serverData.matches.includes(x));
            // update variable for overlay
            this.pageLoading = false;
            // console.log('the difference is ', this.noContent);
        },
        async subjectSearch() {
            // update variable for overlay
            this.pageLoading = true;
            // eslint-disable-next-line max-len
            // console.log('The topics that I am going to be searching for are ', this.subjectValues);
            // decide what server I am going to use
            const SERVER_URL = this.useRemoteServer ? 'https://stormy-caverns-94672.herokuapp.com/' : '';
            const url = `${SERVER_URL}api/get_resources_subjects?subject=${this.subjectValues}`;
            // console.log('this is the url for fetching', url);
            // console.log('about to go fetch subjects');
            const response = await fetch(url);
            const serverData = await response.json();
            // console.log('im back!!!!');
            // console.log('this is the server data for ', serverData);
            // add server data to variables
            this.subjectContent = serverData.content;
            this.allSubjectContent = serverData.content;
            this.noContent = this.subjectValues.filter((x) => !serverData.matches.includes(x));
            // update overlay variable
            this.pageLoading = false;
            // console.log('the difference is ', this.noContent);
        },
    },
    watch: {
        // update subjectSelected and topicSelected when user makes a subject selection
        // do this to prevent user from selecting subject and topic
        subjectValues() {
            // if at least one subject has been selected
            if (this.subjectValues !== '') {
                this.subjectSelected = true;
                this.topicSelected = false;
            }
            // if there are no subjects selected (user deletes selected subjects)
            if (this.subjectValues === '') {
                this.subjectSelected = false;
            }
        },
        // update subjectSelected and topicSelected when user makes a topic selection
        // do this to prevent user from selecting subject and topic
        topicValues() {
            // if at least one topic has been selected
            if (this.topicValues !== '') {
                this.topicSelected = true;
                this.subjectSelected = false;
            }
            // if there are no topics selected (user deleted selected topics)
            if (this.topicValues === '') {
                this.topicSelected = false;
            }
        },
    },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
#search-options {
    width: 50%;
}

.flex {
   display: flex;
   flex-direction: row;
}

.search-selection {
   margin-right: 20%;
   margin-left: 20%;
   border: 2px solid blue;
   border-radius: 10px;
   padding: 5px;
   background-color: white;
}

.content {
    margin-right: 5%;
    margin-left: 5%;
}

button {
    background-color: lightskyblue;
    color: #545454;
    border: none;
    font-weight: bold;
}

.underline {
    text-decoration: underline;
}

.subject-filters {
    margin-left: 12px;
    text-align: left;
}

.subject-filter-button {
    width: 80%;
    margin-bottom: 12px;
}

.topic-filters {
    margin-left: 12px;
    text-align: left;
}

.topic-filter-button {
    width: 80%;
    margin-bottom: 12px;
}
</style>
