/*
 * This represents the reactive data to be edited.
 *
 * It contains no interaction logic, just information about the task lists
 *
 * It is initialized with example data to start but cards could be set to empty and still work
 *
 * @author Jonathan Browning
 */

const taskDataStore = {
    data: {
        projectTitle: 'A Big Example',
        backgroundColor: '#C0C0C0',
        backgroundImage: '',
        taskLists: [
            {
                taskTitle: 'A Sample TaskList with a really long title to show that text does not overflow',
                cards: [
                    {
                        cardTitle: 'A Sample Card with an excessively long title to show how text overflows',
                        myStyle: { backgroundColor: '#b19cd9' },
                        description: 'This is just a simple sample card',
                        deadline: '2021-03-01',
                        tags: [
                        ],
                        comments: [
                            'This is sample comment 1',
                        ],
                    },
                    {
                        cardTitle: 'A Sample Card #2',
                        myStyle: { backgroundColor: '#b19cd9' },
                        description: 'This is just a simple sample card',
                        deadline: '2021-03-01',
                        tags: [
                            {
                                tagTitle: 'Sample tag',
                                tagStyle: { backgroundColor: '#ff0000' },
                            },
                        ],
                        comments: [
                            'This is sample comment 1', 'This is sample comment 2',
                        ],
                    },
                ],
            },
            {
                taskTitle: 'CS 290',
                cards: [
                    {
                        cardTitle: 'Trello',
                        myStyle: { backgroundColor: '#b19cd9' },
                        description: 'Finish drap and drop',
                        deadline: '2021-03-08',
                        tags: [
                            {
                                tagTitle: 'urgent',
                                tagStyle: { backgroundColor: '#ff00ff' },
                            },
                            {
                                tagTitle: 'cs',
                                tagStyle: { backgroundColor: '#ff00ff' },
                            },
                        ],
                        comments: [
                            'Spent too much time on search', 'Hopefully drag and drop does not break anything',
                        ],
                    },
                    {
                        cardTitle: 'Validation',
                        myStyle: { backgroundColor: '#b19cd9' },
                        description: 'Run content validators on trello assignment',
                        deadline: '2021-03-09',
                        tags: [
                            {
                                tagTitle: 'urgent',
                                tagStyle: { backgroundColor: '#ff00ff' },
                            },
                        ],
                        comments: [
                            'Hope everything validates',
                        ],
                    },
                ],
            },
            {
                taskTitle: 'Personal',
                cards: [
                    {
                        cardTitle: 'Laundry',
                        myStyle: { backgroundColor: '#b19cd9' },
                        description: 'Wash your clothes man',
                        deadline: '2021-03-10',
                        tags: [
                            {
                                tagTitle: 'soon',
                                tagStyle: { backgroundColor: '#ff00ff' },
                            },
                        ],
                        comments: [
                        ],
                    },
                    {
                        cardTitle: 'Get groceries',
                        myStyle: { backgroundColor: '#b19cd9' },
                        description: 'Walk to Harris Teeter',
                        deadline: '2021-03-14',
                        tags: [
                            {
                                tagTitle: 'food',
                                tagStyle: { backgroundColor: '#ff00ff' },
                            },
                        ],
                        comments: [
                            'pick out a good snack', 'buy the right toothpaste',
                        ],
                    },
                    {
                        cardTitle: 'Exercise',
                        myStyle: { backgroundColor: '#b19cd9' },
                        description: 'go for a run',
                        deadline: '2021-03-09',
                        tags: [
                            {
                                tagTitle: 'health',
                                tagStyle: { backgroundColor: '#ff00ff' },
                            },
                        ],
                        comments: [
                            'do not be a bum', 'at least you get a couple days off',
                        ],
                    },
                    {
                        cardTitle: 'wash dishes',
                        myStyle: { backgroundColor: '#b19cd9' },
                        description: 'make sure to clean the mugs',
                        deadline: '2021-03-08',
                        tags: [
                            {
                                tagTitle: 'cleaning',
                                tagStyle: { backgroundColor: '#ff00ff' },
                            },
                        ],
                        comments: [
                        ],
                    },
                ],
            },
            {
                taskTitle: 'English',
                cards: [
                    {
                        cardTitle: 'Read book',
                        myStyle: { backgroundColor: '#b19cd9' },
                        description: 'Read brown girl in the ring',
                        deadline: '2021-03-11',
                        tags: [
                            {
                                tagTitle: 'reading',
                                tagStyle: { backgroundColor: '#ff00ff' },
                            },
                            {
                                tagTitle: 'short',
                                tagStyle: { backgroundColor: '#ff00ff' },
                            },
                        ],
                        comments: [
                            'start book soon!',
                        ],
                    },
                    {
                        cardTitle: 'Essay',
                        myStyle: { backgroundColor: '#b19cd9' },
                        description: 'Write second short response',
                        deadline: '2021-03-13',
                        tags: [
                            {
                                tagTitle: 'writing',
                                tagStyle: { backgroundColor: '#ff00ff' },
                            },
                        ],
                        comments: [
                            'get feedback on first one', 'write earlier than day it is due',
                        ],
                    },
                ],
            },
            {
                taskTitle: 'Chronicle',
                cards: [
                    {
                        cardTitle: 'Write wlax recap',
                        myStyle: { backgroundColor: '#b19cd9' },
                        description: 'write about last week of play',
                        deadline: '2021-03-08',
                        tags: [
                            {
                                tagTitle: 'writing',
                                tagStyle: { backgroundColor: '#ff00ff' },
                            },
                        ],
                        comments: [
                            'use google doc',
                        ],
                    },
                ],
            },
            {
                taskTitle: 'Other things?',
                cards: [
                ],
            },
        ],
    },
    // delete a tag using corresponding list, card, and tag index
    deleteTag(listIndex, cardIndex, tagIndex) {
        this.data.taskLists[listIndex].cards[cardIndex].tags.splice(tagIndex, 1);
    },
    // delete comment using correspending list, card, and comment index
    deleteComment(listIndex, cardIndex, commentIndex) {
        this.data.taskLists[listIndex].cards[cardIndex].comments.splice(commentIndex, 1);
    },
    // delete card using corresponding list and card index
    deleteCard(listIndex, cardIndex) {
        this.data.taskLists[listIndex].cards.splice(cardIndex, 1);
    },
    // delete list using corresponding list index
    deleteList(listIndex) {
        this.data.taskLists.splice(listIndex, 1);
    },

    // add new tag based on current list and card index
    // **MAKE newTag elsewhere**
    addNewTag(listIndex, cardIndex, newTag) {
        // **LOOK AT INPUT TERMS**
        this.data.taskLists[listIndex].cards[cardIndex].tags.push(newTag);
    },
    // add new comment based on current list and card index
    // **MAKE newComment elsewhere**
    addNewComment(listIndex, cardIndex, newComment) {
        this.data.taskLists[listIndex].cards[cardIndex].comments.push(newComment);
    },
    // add new card based on current list index
    // **MAKE newCard elsewhere**
    addNewCard(listIndex, newCard) {
        // **LOOK AT INPUT TERMS**
        this.data.taskLists[listIndex].cards.push(newCard);
    },
    // add new list by pushing to end of task list array
    // **MAKE newList ELSEWHERE**
    addNewList(newList) {
        this.data.taskLists.push(newList);
    },

    // copy card of corresponding list and card index and push to end of current list
    copyCard(listIndex, newCard) {
        this.data.taskLists[listIndex].cards.push(newCard);
    },
    // copy list of corresponding list index and push to end of lists
    copyList(newList) {
        this.data.taskLists.push(newList);
    },

    changeBackgroundColor(color) {
        this.data.backgroundColor = color;
    },
    changeBackgroundImage(image) {
        this.data.backgroundImage = image;
    },
};
