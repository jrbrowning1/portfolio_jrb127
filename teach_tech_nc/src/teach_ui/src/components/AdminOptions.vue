<template>
    <div>
        <b-button variant="success" v-b-modal="'add-resource-name'">Add resource</b-button>
        <b-modal
            id="add-resource-name"
            ref="modal"
            @show="resetModal"
            no-stacking
            no-close-on-backdrop
        >
            <h3>Add a new resource</h3>
            <br>
            <form ref="form">
                <b-form-group
                    invalid-feedback="Resource name is required"
                    :state="nameState"
                    label="What is the name of this resource?"
                    label-for="name-input"
                >
                    <b-form-input
                        id="name-input"
                        v-model="resourceName"
                        placeholder="Resource name"
                        :state="nameState"
                        required
                    >
                    </b-form-input>
                </b-form-group>
            </form>
            <template #modal-footer>
                <b-button
                    @click="handleNext($event, 'name', 'add-resource-source')"
                    variant="primary"
                >Next</b-button>
            </template>
        </b-modal>
        <b-modal
            id="add-resource-source"
            ref="modal2"
            no-stacking
            no-close-on-backdrop
        >
            <h3>Add a new resource</h3>
            <br>
            <form ref="form2" @submit.stop.prevent="handleSubmit">
                <b-form-group
                    invalid-feedback="Source name is required"
                    :state="sourceState"
                    label="Where did this resource come from?"
                    label-for="source-input"
                >
                    <b-form-input
                        id="source-input"
                        v-model="resourceSource"
                        placeholder="Resource source"
                        :state="sourceState"
                        required
                    />
                </b-form-group>
            </form>
            <template #modal-footer>
                <b-button
                    @click="handleNext($event, 'source', 'add-resource-url')"
                    variant="primary"
                >Next</b-button>
            </template>
        </b-modal>
        <b-modal
            id="add-resource-url"
            ref="modal3"
            no-stacking
            no-close-on-backdrop
        >
            <h3>Add a new resource</h3>
            <br>
            <form ref="form3" @submit.stop.prevent="handleSubmit">
                <b-form-group
                    invalid-feedback="You must enter a valid website"
                    :state="urlState"
                    label="On what website is this resource located?"
                    label-for="url-input"
                >
                    <b-form-input
                        id="url-input"
                        type="url"
                        placeholder="Resource website"
                        v-model="resourceURL"
                        :state="urlState"
                        required
                    />
                </b-form-group>
            </form>
            <template #modal-footer>
                <b-button
                    @click="handleNext($event, 'url', 'add-resource-subjects')"
                    variant="primary"
                >Next</b-button>
            </template>
        </b-modal>
        <b-modal
            id="add-resource-subjects"
            ref="modal4"
            no-stacking
            no-close-on-backdrop
        >
            <h3>Add a new resource</h3>
            <br>
            <b-form-group
                label="What subject(s) does this resource relate to?"
                label-for="subject-select"
            >
                <multiselect
                    id="subject-select"
                    v-model="subjectValues"
                    :options="subjectOptions"
                    :multiple="true"
                    :close-on-select="false"
                >
                </multiselect>
            </b-form-group>
            <template #modal-footer>
                <b-button
                    @click="handleNext($event, 'subject', 'add-resource-topics')"
                    variant="primary"
                >Next</b-button>
            </template>
        </b-modal>
        <b-modal
            id="add-resource-topics"
            ref="modal5"
            no-stacking
            no-close-on-backdrop
        >
            <h3>Add a new resource</h3>
            <br>
            <b-form-group
                label="What topic(s) does this resource relate to?"
                label-for="topic-select"
            >
                <multiselect
                    id="topic-select"
                    v-model="topicValues"
                    :options="topicOptions"
                    :multiple="true"
                    :close-on-select="false"
                >
                </multiselect>
            </b-form-group>
            <template #modal-footer>
                <b-button
                    @click="handleSubmit"
                    variant="success"
                >Submit resource</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
// from resource 1
import Multiselect from 'vue-multiselect';
import Vue from 'vue';

import querystring from 'querystring';
// eslint-disable-next-line import/no-unresolved
// register globally
Vue.component('multiselect', Multiselect);

export default {
    props: {
        isAdmin: Boolean,
    },
    components: {
        Multiselect,
    },
    data() {
        return {
            useRemoteServer: true,
            resourceName: '',
            nameState: null,
            resourceSource: '',
            sourceState: null,
            subjectValues: '',
            topicValues: '',
            resourceURL: '',
            urlState: null,
            subjectOptions: ['9-10th grade English', '11-12th grade English', 'Civics', 'Computer Science'],
            topicOptions: ['Artificial Intelligence', 'Misinformation', 'Ethical Tech'],
        };
    },
    methods: {
        checkFormValidity(input) {
            // if the input is name, check corresponding form
            if (input === 'name') {
                const validName = this.$refs.form.checkValidity();
                // console.log('this is the value of valid ', validName);
                this.nameState = validName;
                return validName;
            }
            // if the input is source, check corresponding form
            if (input === 'source') {
                const validSource = this.$refs.form2.checkValidity();
                // console.log('this is the value of valid source ', validSource);
                this.sourceState = validSource;
                return validSource;
            }
            // if the input is url, check corresponding form
            if (input === 'url') {
                const validURL = this.$refs.form3.checkValidity();
                // console.log('this is the value of valid URL', validURL);
                this.urlState = validURL;
                return validURL;
            }
            // limited to given options, so everything should be valid
            if (input === 'subject' || input === 'topic') {
                return true;
            }
            // if called with an argument that doesn't match, it's not valid
            return false;
        },
        handleNext(bvModalEvt, checkInput, nextModal) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            console.log('this is the next modal to open ', nextModal);
            if (this.checkFormValidity(checkInput)) {
                // Source 6 in README
                this.$root.$emit('bv::show::modal', nextModal);
            }
        },
        handleSubmit() {
            // if (!this.checkFormValidity()) {
            //     return false;
            // }
            // console.log('this is entered resource name ', this.resourceName);
            // console.log('this is entered resource source ', this.resourceSource);
            // console.log('this is entered resource subjects ', this.subjectValues);
            // console.log('this is entered resource topics ', this.topicValues);
            // console.log('this is entered resource url ', this.resourceURL);
            this.addResourceEntry();
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('add-resource-topics');
            });
            this.resetModal();
            // return true;
        },
        // eslint-disable-next-line max-len
        // simple utility function to encode the given object as query parameters and return the resulting JSON
        // from module 6
        async getJSON(url, apiAction, queryParameters, protocolOptions) {
            const parameters = queryParameters ? `?${querystring.stringify(queryParameters)}` : '';
            const urlWithParameters = `${url}${apiAction}${parameters}`;
            console.log('here are the protocol options ', protocolOptions);
            console.log('this is the url with params ', urlWithParameters);
            const response = await fetch(urlWithParameters, protocolOptions);
            // only convert response if request suceeded
            if (response.ok) {
                const serverData = await response.json();
                return serverData;
            }
            // FIXME: probably a better way to handle this - return an empty data object
            console.error(response);
            return {};
        },
        async addResourceEntry() {
            console.log('Adding new resource with title ', this.resourceName);
            let SERVER_URL = this.useRemoteServer ? 'https://stormy-caverns-94672.herokuapp.com/' : '';
            SERVER_URL = `${SERVER_URL}api/`;
            // console.log('this is the actual server URL ', SERVER_URL);
            // console.log('this will be the body ', JSON.stringify({
            //     name: this.resourceName,
            //     source: this.resourceSource,
            //     subject: this.subjectValues,
            //     topic: this.topicValues,
            //     url: this.resourceURL,
            // }));
            const serverData = await this.getJSON(SERVER_URL, 'addResource',
                // could also send URL query parameters, but none needed for this example
                null, {
                    // add new data to be saved with values sent in body field
                    method: 'POST',
                    // create JSON string automatically
                    body: JSON.stringify({
                        name: this.resourceName,
                        source: this.resourceSource,
                        subject: this.subjectValues,
                        topic: this.topicValues,
                        url: this.resourceURL,
                    }),
                    headers: { 'Content-type': 'application/json;charset=UTF-8' },
                });
            console.log('this is the server data after adding the new resource ', serverData);
        },
        resetModal() {
            // reset all variables that are set in modal
            this.resourceName = '';
            this.resourceSource = '';
            this.subjectValues = '';
            this.topicValues = '';
            this.resourceURL = '';
            this.nameState = null;
            this.sourceState = null;
            this.urlState = null;
        },
    },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

h3 {
    text-align: center;
}

</style>
