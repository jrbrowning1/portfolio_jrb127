/*
 * This represents the settings section of the header of the webpage
 * @author Jonathan Browning
 */

Vue.component('v-page-settings', {
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            titleProject: this.value,
            backgroundColor: '',
            backgroundImage: null,
        };
    },
    computed: {
        pageBackGround() {
            let objectImage = '';
            if (this.backgroundImage != null) {
                objectImage = URL.createObjectURL(this.backgroundImage);
            }
            return `url('${objectImage}')`;
        },
    },
    watch: {
        // track changes made to page's background color
        backgroundColor() {
            console.log(`CHANGING BACKGROUND COLOR TO ${this.backgroundColor}`);
            this.$parent.$emit('change-page-color', this.backgroundColor);
        },
        backgroundImage() {
            console.log('CHANGING BACKGROUND IMAGE');
            this.$parent.$emit('change-page-image', this.pageBackGround);
        },
    },
    template: `
        <span>
            <b-button v-b-toggle.sidebar-right>Settings</b-button>
            <b-sidebar backdrop id="sidebar-right" title="Project Settings" right shadow>
                <label for="main-title"><b>Edit Project Title</b></label>
                <b-form-input class="main-title"
                    :value="value"
                    @input="$emit('input', $event)"
                    :placeholder="titleProject"
                ></b-form-input>
                <br>
                <label for="background-color"><b>Background Color</b></label>
                <b-form-input
                    type="color"
                    id="background-color"
                    v-model="backgroundColor"
                    size="sm"
                ></b-form-input>
                <br>
                <label for="background-image"><b>Background Image</b></label>
                <b-form-file 
                    id="background-image"
                    accept="image/*"
                    v-model="backgroundImage"
                ></b-form-file>
            </b-sidebar>
        </span>
    `,

});
