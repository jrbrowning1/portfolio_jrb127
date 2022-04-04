/*
 * This represents the collapsible part of the comment section
 * @author Jonathan Browning
 */

Vue.component('v-collapse-comments', {
    props: {
        // comments for this card
        comments: {
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
            newComment: '',
        };
    },
    methods: {
        addNewComment() {
            console.log(`Adding new comment ${this.newComment}`);
            // emits event through components: this -> taskListCard -> draggable ->taskList -> main
            this.$parent.$parent.$parent.$emit('add-new-comment', this.lindex, this.cindex, this.newComment);
        },
        deleteComment(commentIndex) {
            console.log('Deleting comment');
            // emits event through components: this -> taskListCard -> draggable ->taskList -> main
            this.$parent.$parent.$parent.$emit('delete-comment', this.lindex, this.cindex, commentIndex);
        },
        resetCommentData() {
            console.log('reset comment data');
            this.newComment = '';
        },
    },
    computed: {
        numComments() {
            return this.comments.length;
        },
    },
    template: `
        <div>
            <b-button v-b-toggle="'collapse'+lindex+cindex">
                Comments <b-badge variant="light">{{ numComments }}</b-badge>
            </b-button>

            <b-collapse :id="'collapse'+lindex+cindex">
                <b-card
                    v-for="(comment, q) in comments"
                    :key="q"
                >
                    <template #header>
                        <button v-b-popover.hover.top="'Delete comment'" 
                        type="button" class="btn btn-outline-danger" @click="deleteComment(q)">x</button>
                    </template>
                    {{comment}}
                </b-card>

                <b-button v-b-modal="'comment_modal'+lindex+cindex">Add comment</b-button>
    
                <b-modal :id="'comment_modal'+lindex+cindex" title="Add new comment" 
                ok-only @ok="addNewComment()" @hidden="resetCommentData()">
                    <label for="comment-title"><b>What is your comment?</b></label>
                    <b-form-input class="tag-title" v-model="newComment"
                    ></b-form-input>
                </b-modal>
            </b-collapse>
        </div>  
    `,
});
