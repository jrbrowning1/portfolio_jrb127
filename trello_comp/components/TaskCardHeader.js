/*
 * This represents the header section of a card
 * @author Jonathan Browning
 */

Vue.component('v-task-card-header', {
    props: {
        card: {
            type: Object,
            required: true,
        },
        lindex: {
            type: Number,
            required: true,
        },
        cindex: {
            type: Number,
            required: true,
        },
    },
    // data() {
    // },
    methods: {
        deleteThisCard() {
            console.log('deleting-card');
            // emits event through components: this -> taskListCard -> draggable -> taskList -> main
            this.$parent.$parent.$parent.$emit('delete-card', this.lindex, this.cindex);
        },
        copyThisCard() {
            console.log('copyin card');
            // emits event through components: this -> taskListCard -> draggable -> taskList -> main
            this.$parent.$parent.$parent.$emit('copy-card', this.lindex, this.cindex);
        },
    },
    template: `
        <span>
            <button v-b-popover.hover.top="'Copy task card'" type="button" class="btn btn-outline-success" 
                @click="copyThisCard">Copy</button>
            
                <button v-b-popover.hover.top="'Edit task card'" v-b-modal="'modal'+lindex+cindex" 
                    class="btn btn-outline-secondary"><b>&hellip;</b></button>
                <b-modal :id="'modal'+lindex+cindex" title="Settings" ok-only>
                    <label for="card-title"><b>Edit Title</b></label>
                    <b-form-input class="card-title"
                        v-model="card.cardTitle"
                        placeholder="card.cardTitle"
                    ></b-form-input>
                    <label for="deadline-picker"><b>Choose the deadline</b></label>
                    <b-form-datepicker class="deadline-picker"
                        v-model="card.deadline"
                    ></b-form-datepicker>
                    <label for="edit-description"><b>Edit the description</b></label>
                    <b-form-input class="edit-description"
                        v-model="card.description"
                        aria-placeholder="card.description"
                    ></b-form-input>
                    <label for="card-color"><b>Background Color</b></label>
                    <b-form-input class="card-color"
                        type="color"
                        v-model="card.myStyle.backgroundColor"
                        size="sm"
                    ></b-form-input>
                </b-modal>

            <button v-b-popover.hover.top="'Delete task card'" 
                type="button" class="btn btn-outline-danger" @click="deleteThisCard">x</button>    
        </span>
    `,
});
