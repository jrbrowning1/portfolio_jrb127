/*
 * This represents the tags section of a card
 * @author Jonathan Browning
 */

Vue.component('v-task-tags', {
    props: {
        tags: {
            type: Array,
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
    data() {
        return {
            newTitle: '',
            newColor: '',
        };
    },
    methods: {
        deleteTag(tagIndex) {
            console.log('Deleting tag');
            // emits event through components: this -> taskListCard -> draggable ->taskList -> main
            this.$parent.$parent.$parent.$emit('delete-tag', this.lindex, this.cindex, tagIndex);
        },
        addNewTag() {
            console.log('adding tag');
            // emits event through components: this -> taskListCard -> draggable ->taskList -> main
            this.$parent.$parent.$parent.$emit('add-new-tag', this.lindex, this.cindex, this.newTitle, this.newColor);
        },
        resetTagData() {
            console.log('reset tag data');
            this.newTitle = '';
            this.newColor = '';
        },
    },
    template: `
        <span>
            <b-form-tag
                class="card-tag"
                v-for="(tag,k) in tags"
                :key="k"
                :style="tag.tagStyle"
                @remove="deleteTag(k)"
            >
            {{tag.tagTitle}}
            </b-form-tag>

            <button v-b-popover.hover.top="'Add new tag'" type="button" class="btn btn-outline-primary" 
                v-b-modal="'tag_modal'+lindex+cindex">+</button>
            <b-modal :id="'tag_modal'+lindex+cindex" title="Add new tag" 
            ok-only @ok="addNewTag" @hidden="resetTagData">
                <label for="tag-title"><b>Tag Title</b></label>
                <b-form-input class="tag-title" v-model="newTitle"
                ></b-form-input>
                <label for="tag-color"><b>Tag Color</b></label>
                <b-form-input
                    type="color"
                    class="tag-color"
                    size="sm"
                    v-model="newColor"
                ></b-form-input>
            </b-modal>
        </span>
    `,
});
