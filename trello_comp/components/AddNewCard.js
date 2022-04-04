/*
 * This represents the add new card section
 * @author Jonathan Browning
 */

Vue.component('v-add-new-card', {
    props: {
        lindex: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            newTitle: '',
            newColor: '',
            newDescription: '',
            newDeadline: '',
        };
    },
    methods: {
        addNewCard() {
            console.log('adding new card');
            // emits event through components: this --> taskList --> main
            this.$parent.$emit('add-new-card', this.lindex, this.newTitle, this.newColor, this.newDescription, this.newDeadline);
        },
        resetCardData() {
            this.newTitle = '';
            this.newColor = '';
            this.newDescription = '';
            this.newDeadline = '';
        },
    },
    template: `
        <div>
            <b-button v-b-modal="'add_modal'+lindex" class="add-card">Add card</b-button>
            <b-modal :id="'add_modal'+lindex" title="Add new card" 
            ok-only @ok="addNewCard" @hidden="resetCardData">
                <label for="new-card-title"><b>Card Title</b></label>
                <b-form-input class="new-card-title"
                    v-model="newTitle"
                ></b-form-input>
                <label for="new-deadline-picker"><b>Choose the deadline</b></label>
                <b-form-datepicker class="new-deadline-picker"
                    v-model="newDeadline"
                ></b-form-datepicker>
                <label for="new-description"><b>Enter a description</b></label>
                <b-form-input class="new-description"
                    v-model="newDescription"
                ></b-form-input>
                <label for="new-card-color"><b>Background Color</b></label>
                <b-form-input class="new-card-color"
                    type="color"
                    v-model="newColor"
                    size="sm"
                ></b-form-input>
            </b-modal>
        </div>    
    `,
});
