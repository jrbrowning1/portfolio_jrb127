<template>
    <div>
        <div v-if="!loggedIn">
            <h1><strong>Welcome Guest</strong></h1>
            <h3>Please log in in order to add resources to the database</h3>
        </div>
        <div v-else>
            <h1><strong>Welcome {{currentUser.displayName}}</strong></h1>
        </div>
        <b-button
            :href="apiUrlBase + 'api/auth/login'"
            variant="success"
        >
            Login
        </b-button>
        &nbsp;
        <b-button
            :href="apiUrlBase + 'api/auth/logout'"
            variant="danger"
        >
            Logout
        </b-button>
        <br><br>
        <div v-if="loggedIn">
            <!-- originally just going to be admin feature but added it for everyone right now -->
            <admin-options :isAdmin="true">
            </admin-options>
            <br>
            <div v-if="admin">
                <h3>User Logs</h3>
                <b-button
                    @click="getUserLogs"
                    variant="outline-success"
                >Get User Logs</b-button>
                <pre>
                    {{userLogs}}
                </pre>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import AdminOptions from '@/components/AdminOptions.vue';

import querystring from 'querystring';

export default {
    components: {
        AdminOptions,
    },
    data() {
        return {
            apiUrlBase: process.env.VUE_APP_SERVER_API_BASE,
            loggedIn: false,
            currentUser: {},
            admin: false,
            userLogs: '',
        };
    },
    watch: {
        currentUser() {
            console.log('this is the current user ', this.currentUser);
            if (this.currentUser.email !== null) {
                this.loggedIn = true;
            }
            if (this.currentUser.email === null) {
                this.loggedIn = false;
            }
        },
    },
    methods: {
        // helper for calling /api/user
        async refreshMe() {
            this.currentUser = await this.getJSON(this.apiUrlBase, 'api/user');
            console.log('this is the user data ', this.currentUser);
            this.admin = this.currentUser.isAdmin;
            console.log('this is the user admin status ', this.admin);
            this.userLogs = '';
        },
        async getUserLogs() {
            const response = await this.getJSON(this.apiUrlBase, 'api/userLogs');
            console.log('this is all the user logs ', response);
            this.userLogs = response;
        },
        async getJSON(url, apiAction, queryParameters, protocolOptions) {
            const parameters = queryParameters ? `?${querystring.stringify(queryParameters)}` : '';
            const urlWithParameters = `${url}${apiAction}${parameters}`;
            console.log('getJSON', urlWithParameters);
            const response = await fetch(urlWithParameters, { credentials: 'include', ...(protocolOptions || {}) });
            console.log('here is the server response, ', response);
            // only convert response if request suceeded
            if (response.ok) {
                return response.json();
            }

            // FIXME: probably a better way to handle this - return an empty data object
            console.error(response);
            return {};
        },
    },
    mounted() {
        this.refreshMe();
    },
};
</script>

<style scoped>

</style>
