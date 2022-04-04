/*
 * This represents the header section of an entire tasklist
 * @author Jonathan Browning
 */

Vue.component('v-task-list-header', {
    props: {
        lindex: {
            type: Number,
            required: true,
        },
        list: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            newTitle: '',
        };
    },
    methods: {
        copyList() {
            console.log('copyin list');
            // emits event through components: this --> taskList --> main
            this.$parent.$emit('copy-list', this.lindex);
        },
        deleteList() {
            console.log('deleting-list');
            // emits event through components: this --> taskList --> main
            this.$parent.$emit('delete-list', this.lindex);
        },
    },
    template: `
        <span>
            <button v-b-popover.hover.top="'Copy task list'" type="button" 
                class="btn btn-outline-success" @click="copyList">Copy</button>
            <button v-b-popover.hover.top="'Edit task list'" type="button" 
                class="btn btn-outline-secondary" v-b-modal="'modal'+lindex"><b>&hellip;</b></button>
                <b-modal :id="'modal'+lindex" title="Edit task list title" ok-only>
                    <b-form-input class="task-title"
                        v-model="list.taskTitle"
                        placeholder="list.taskTitle"
                    ></b-form-input>
                </b-modal>
            <button v-b-popover.hover.top="'Delete task list'" 
            type="button" class="btn btn-outline-danger" @click="deleteList">x</button>
        </span>
    `,
});
