/*
 * This represents the add tasklist section of the header of the webpage
 * @author Jonathan Browning
 */

Vue.component('v-add-task-list', {
    data() {
        return {
            newTaskTitle: '',
        };
    },
    methods: {
        addNewList() {
            console.log(`Adding new list with title ${this.newTaskTitle}`);
            // emits event through components: this --> appHeader --> main
            this.$parent.$emit('add-new-list', this.newTaskTitle);
        },
        resetListData() {
            console.log('reset list data');
            this.newTaskTitle = '';
        },
    },
    template: `
        <span>
            <b-button id="add-new-list" v-b-modal="'add-list'">Add task list</b-button>
            <b-modal
                id="add-list" 
                title="Enter title of new task list"
                ok-only
                @ok="addNewList"
                @hidden="resetListData"
            >
                <label for="new-task-title"><b>New task list title</b></label>
                <b-form-input id="new-task-title"
                    v-model="newTaskTitle"
                    aria-placeholder="Enter title of new task list"
                ></b-form-input>
            </b-modal>
        </span>
    `,
});
