/*
 * This represents an entire task card
 * @author Jonathan Browning
 */

Vue.component('v-task-list-card', {
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
    data() {
        return {
            todayDate: new Date(),
        };
    },
    methods: {
        displayDate(dateString) {
            // used asset 5 to display date nicely
            const options = {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            };
            options.timeZone = 'UTC';
            const deadlineDate = new Date(dateString);
            return deadlineDate.toLocaleDateString('en-US', options);
        },
    },
    template: `
       
        <b-card 
            class="actual-cards"
            :key="cindex"
            :title="card.cardTitle"
            :style="card.myStyle"
        >
            <template #header>
                <v-task-card-header
                    :card="card"
                    :lindex="lindex"
                    :cindex="cindex"
                />
            </template>

            <b-card-text class="deadline" :class="{'overdue': todayDate > new Date(card.deadline)}">
                Due: {{displayDate(card.deadline)}}
            </b-card-text>
    
            <b-card-text>
                {{card.description}}
            </b-card-text>
    
            <p>
                <v-task-tags
                    :tags="card.tags"
                    :lindex="lindex" 
                    :cindex="cindex"
                />
            </p>

            <v-collapse-comments 
                :comments="card.comments" 
                :lindex="lindex" 
                :cindex="cindex"
            />
            <br>
        </b-card>     
          
    `,
});
