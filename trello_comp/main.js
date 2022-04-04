/* global taskDataStore */

const app = new Vue({
    // app state --- different values for each app instance
    data() {
        return {
            todayDate: new Date(),

            taskDataStore,
            searchOptions: {
                keys: [
                    'taskTitle',
                    'cards.cardTitle',
                    'cards.description',
                    'cards.tags.tagTitle',
                    'cards.comments',
                ],
                // report exactly which fields and which characters signaled the match
                includeMatches: true,
                threshold: 0.3,
            },
            // model variable for search component
            searchTerms: '',
            filteredData: [],

            allInfo: taskDataStore,
            titleProject: taskDataStore.data.projectTitle,
            allTasks: taskDataStore.data.taskLists,
            pageStyle: {
                backgroundColor: taskDataStore.data.backgroundColor,
                backgroundImage: taskDataStore.data.backgroundImage,
            },

            didIFilter: false,
        };
    },

    // simple wrappers that call data store methods
    methods: {
        handleSearchResults(results) {
            // console.log(results.items);
            this.filteredData = results;
        },
        deleteTag(listIndex, cardIndex, tagIndex) {
            console.log(`CAUGHT: DELETING TAG AT tagindex: ${tagIndex}, cardIndex: ${cardIndex}, listIndex: ${listIndex}`);
            this.allInfo.deleteTag(listIndex, cardIndex, tagIndex);
        },
        deleteComment(listIndex, cardIndex, commentIndex) {
            console.log(`CAUGHT: DELETING COMMENT AT commentindex: ${commentIndex}, cardIndex: ${cardIndex}, listIndex: ${listIndex}`);
            this.allInfo.deleteComment(listIndex, cardIndex, commentIndex);
        },
        deleteCard(listIndex, cardIndex) {
            console.log(`CAUGHT: DELETING CARD AT cardIndex: ${cardIndex}, listIndex: ${listIndex}`);
            this.allInfo.deleteCard(listIndex, cardIndex);
        },
        deleteList(listIndex) {
            console.log(`CAUGHT: DELETING LIST AT listIndex: ${listIndex}`);
            this.allInfo.deleteList(listIndex);
        },
        addNewTag(listIndex, cardIndex, newTitle, newColor) {
            const myNewTag = {
                tagTitle: newTitle,
                tagStyle: { backgroundColor: newColor },
            };
            console.log(`CAUGHT: ADD NEW TAG ${newTitle} and is ${newColor}`);
            this.allInfo.addNewTag(listIndex, cardIndex, myNewTag);
        },
        addNewComment(listIndex, cardIndex, newComment) {
            const myNewComment = newComment;
            this.allInfo.addNewComment(listIndex, cardIndex, myNewComment);
        },
        addNewCard(listIndex, title, color, newDescription, newDeadline) {
            const myNewCard = {
                cardTitle: title,
                myStyle: { backgroundColor: color },
                description: newDescription,
                deadline: newDeadline,
                tags: [],
                comments: [],
            };
            this.allInfo.addNewCard(listIndex, myNewCard);
        },
        addNewList(title) {
            const myNewList = {
                taskTitle: title,
                cards: [],
            };
            console.log('hello');
            this.allInfo.addNewList(myNewList);
        },
        copyCard(listIndex, cardIndex) {
            const shortcut = this.allTasks[listIndex].cards[cardIndex];
            const myNewCard = JSON.parse(JSON.stringify(shortcut));
            this.allInfo.copyCard(listIndex, myNewCard);
        },
        copyList(listIndex) {
            const shortcut = this.allTasks[listIndex];
            const myNewList = JSON.parse(JSON.stringify(shortcut));
            this.allInfo.copyList(myNewList);
        },

        changeBackgroundColor(color) {
            this.allInfo.changeBackgroundColor(color);
            this.pageStyle.backgroundColor = color;
        },
        changeBackgroundImage(image) {
            this.allInfo.changeBackgroundImage(image);
            this.pageStyle.backgroundImage = image;
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
        cantEditAlert() {
            // eslint-disable-next-line no-alert
            alert("Can't edit when filtering - sorry :(");
        },
        prepString(phrase) {
            let newPhrase = phrase.trim();
            newPhrase = newPhrase.toLowerCase();
            return newPhrase;
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
