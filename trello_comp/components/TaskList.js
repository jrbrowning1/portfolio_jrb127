/*
 * This represents an entire task list
 * @author Jonathan Browning
 */

Vue.component('v-task-list', {
    props: {
        tasklist: {
            type: Object,
            required: true,
        },
        lindex: {
            type: Number,
            required: true,
        },
    },
    template: `
        <div> 
            <b-card 
                class="taskCard"  
            >

                <template #header>
                    <v-task-list-header
                        :lindex="lindex"
                        :list="tasklist"
                       
                    />
                </template>

                <b-card-title class="titleOfTask">
                    {{ tasklist.taskTitle }}
                    <b-badge variant="danger">{{tasklist.cards.length}}</b-badge>
                </b-card-title>

                <draggable
                    class="category"
                    :list="tasklist.cards"
                    group="lists"
                >
                    <v-task-list-card
                        v-for="(card, j) in tasklist.cards"    
                        :card="card"
                        :lindex="lindex"
                        :cindex="j"
                        :key="lindex+j"  
                    />
                </draggable>

            </b-card>

            <v-add-new-card
                :lindex="lindex"
                
            />
        </div>
    `,
});
