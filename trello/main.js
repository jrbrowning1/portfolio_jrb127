const app = new Vue({
    // app state --- different values for each app instance
    data() {
        return {
            todayDate: new Date(),

            // small example data -> can be used for easier testing
            // allInfo: EXAMPLE_SMALL,
            // titleProject: EXAMPLE_SMALL.projectTitle,
            // backgroundColor: EXAMPLE_SMALL.backgroundColor,
            // allTasks: EXAMPLE_SMALL.taskLists,

            // large example data -> can be used for easier testing
            allInfo: EXAMPLE_BIG,
            titleProject: EXAMPLE_BIG.projectTitle,
            backgroundColor: EXAMPLE_BIG.backgroundColor,
            allTasks: EXAMPLE_BIG.taskLists,

            // template data for starting off (mostly) blank
            // allInfo: BASIC_TEMPLATE,
            // titleProject: BASIC_TEMPLATE.projectTitle,
            // backgroundColor: BASIC_TEMPLATE.backgroundColor,
            // allTasks: BASIC_TEMPLATE.taskLists,

            backgroundImage: null,
            searchString: '',
            didIFilter: false,

            // variables for creating new data pieces
            newTaskTitle: '',

            newCardTitle: '',
            newCardBackgroundColor: '',
            newCardDescription: '',
            newCardDeadline: '',

            newComment: '',
            newTagTitle: '',
            newTagBackgroundColor: '',

            cardDragState: null,
            listDragState: null,
        };
    },

    methods: {
        // add newly entered todo item if it exists and clear it to prepare for the next one
        searchData() {
        },
        deleteTag(listIndex, cardIndex, tagIndex) {
            if (!this.didIFilter) {
                this.allTasks[listIndex].cards[cardIndex].tags.splice(tagIndex, 1);
            } else {
                this.cantEditAlert();
            }
        },
        deleteComment(listIndex, cardIndex, commentIndex) {
            if (!this.didIFilter) {
                this.allTasks[listIndex].cards[cardIndex].comments.splice(commentIndex, 1);
            } else {
                this.cantEditAlert();
            }
        },
        deleteCard(listIndex, cardIndex) {
            if (!this.didIFilter) {
                this.allTasks[listIndex].cards.splice(cardIndex, 1);
            } else {
                this.cantEditAlert();
            }
        },
        deleteList(listIndex) {
            if (!this.didIFilter) {
                this.allTasks.splice(listIndex, 1);
            } else {
                this.cantEditAlert();
            }
        },

        resetTagData() {
            this.newTagTitle = '';
            this.newTagBackgroundColor = '';
        },
        resetCommentData() {
            this.newComment = '';
        },
        resetCardData() {
            this.newCardTitle = '';
            this.newCardBackgroundColor = '';
            this.newCardDescription = '';
            this.newCardDeadline = '';
        },
        resetListData() {
            this.newTaskTitle = '';
        },

        addNewTag(listIndex, cardIndex) {
            if (!this.didIFilter) {
                const myNewTag = {
                    tagTitle: this.newTagTitle,
                    tagStyle: { backgroundColor: this.newTagBackgroundColor },
                };
                this.allTasks[listIndex].cards[cardIndex].tags.push(myNewTag);
                this.resetTagData();
            } else {
                this.cantEditAlert();
            }
        },
        addNewComment(listIndex, cardIndex) {
            if (!this.didIFilter) {
                const myNewComment = this.newComment;
                this.allTasks[listIndex].cards[cardIndex].comments.push(myNewComment);
                this.resetCommentData();
            } else {
                this.cantEditAlert();
            }
        },
        addNewCard(listIndex) {
            if (!this.didIFilter) {
                const myNewCard = {
                    cardTitle: this.newCardTitle,
                    myStyle: { backgroundColor: this.newCardBackgroundColor },
                    description: this.newCardDescription,
                    deadline: this.newCardDeadline,
                    tags: [],
                    comments: [],
                };
                this.allTasks[listIndex].cards.push(myNewCard);
                this.resetCardData();
            } else {
                this.cantEditAlert();
            }
        },
        addNewList() {
            if (!this.didIFilter) {
                const myNewList = {
                    taskTitle: this.newTaskTitle,
                    cards: [],
                };
                this.allTasks.push(myNewList);
                this.resetListData();
            } else {
                this.cantEditAlert();
            }
        },

        startCardDrag(taskList, card) {
            this.listDragState = taskList;
            // console.log(this.listDragState);
            this.cardDragState = card;
            // console.log(this.cardDragState);
        },
        onCardDrop(taskCards) {
            // this.deleteTask(this.global.dragState.task.parent
            // this.global.dragState.task.element);
            // console.log(this.listDragState.indexOf(this.cardDragState));
            this.listDragState.splice(this.listDragState.indexOf(this.cardDragState), 1);
            // this.addTask(taskList, this.global.dragState.task.element);
            taskCards.push(this.cardDragState);
            this.clearTaskDragState();
        },
        clearTaskDragState() {
            this.listDragState = null;
            this.cardDragState = null;
        },

        // Used asset 4 to copy data, rather than reference
        copyCard(listIndex, cardIndex) {
            if (!this.didIFilter) {
                const shortcut = this.allTasks[listIndex].cards[cardIndex];
                const myNewCard = JSON.parse(JSON.stringify(shortcut));
                this.allTasks[listIndex].cards.push(myNewCard);
            } else {
                this.cantEditAlert();
            }
        },
        copyList(listIndex) {
            if (!this.didIFilter) {
                const shortcut = this.allTasks[listIndex];
                const myNewList = JSON.parse(JSON.stringify(shortcut));
                this.allTasks.push(myNewList);
            } else {
                this.cantEditAlert();
            }
        },

        cantEditAlert() {
            // eslint-disable-next-line no-alert
            alert("Can't edit when filtering - sorry :(");
        },

        startSearch() {
            this.didIFilter = true;
        },
        clearSearch() {
            this.didIFilter = false;
            this.searchString = '';
        },
        prepString(phrase) {
            let newPhrase = phrase.trim();
            newPhrase = newPhrase.toLowerCase();
            return newPhrase;
        },
        cardContains(card, search) {
            const toSearch = this.prepString(search);
            let found = false;
            if (this.prepString(card.cardTitle).includes(toSearch)) {
                return true;
            }
            if (this.prepString(card.description).includes(toSearch)) {
                return true;
            }
            const newDate = this.displayDate(card.deadline);
            if (this.prepString(newDate).includes(toSearch)) {
                return true;
            }
            card.tags.forEach((tag) => {
                if (this.prepString(tag.tagTitle).includes(toSearch)) {
                    found = true;
                }
            });
            card.comments.forEach((comment) => {
                if (this.prepString(comment).includes(toSearch)) {
                    found = true;
                }
            });
            return found;
        },
        search() {
            const filteredLists = [];
            const toSearch = this.prepString(this.searchString);
            this.allTasks.forEach((taskList) => {
                const filteredList = {
                    taskTitle: taskList.taskTitle,
                    cards: [],
                };
                taskList.cards.forEach((card) => {
                    if (this.cardContains(card, toSearch)) {
                        filteredList.cards.push(card);
                    }
                });
                if (filteredList.cards.length > 0) {
                    filteredLists.push(filteredList);
                }
            });
            return filteredLists;
        },
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

    computed: {
        backgroundObject() {
            return URL.createObjectURL(this.myStyle.backgroundImage);
        },
        filteredTasks() {
            if (!this.didIFilter) {
                return this.allTasks;
            }
            return this.search();
        },
        pageBackGround() {
            let objectImage = '';
            if (this.backgroundImage != null) {
                objectImage = URL.createObjectURL(this.backgroundImage);
            }
            return {
                backgroundColor: this.backgroundColor,
                backgroundImage: `url('${objectImage}')`,
            };
        },
    },

});

// mount means connecting Vue app instance with HTML element with given ID to display it on the page
app.$mount('#app');
