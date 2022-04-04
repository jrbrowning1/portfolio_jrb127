/*
 * This represents the header section of the webpage
 * @author Jonathan Browning
 */

Vue.component('v-app-header', {
    props: {
        // the title of the project
        title: String,
    },
    data() {
        return {
            titleProject: this.title,
            backgroundColor: '',
            backgroundImage: '',
        };
    },

    template: `
        <div class="app-header">

            <span id="mainTitle"><h1>{{ titleProject }}</h1></span>
            
         
            <span id="settings">
                <v-add-task-list/>
                <v-page-settings v-model="titleProject"/>
            </span>
        </div>
    `,
});
