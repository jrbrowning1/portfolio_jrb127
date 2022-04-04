/*
 * JavaScript for module 3, part 1: quiz using vue.js
 *
 * @author Jonathan Browning
 */


// app Vue instance that will manage space on the web page
const app = new Vue({
    
    // app state --- different values for each app instance
    data () {
        return {
            links: [
                {
                    "link": "data/math.json",
                    "name": "Math Quiz"
                },
                {
                    "link": "data/capital.json",
                    "name": "Capitals Quiz"
                },
                {
                    "link": "data/duke.json",
                    "name": "Duke Quiz"
                },
                {
                    //questions for this quiz adapted from asset 2
                    "link": "data/witcher.json",
                    "name": "The Witcher Quiz"
                },
                {
                    //questions for this quiz adapted from asset 3
                    "link": "data/mother.json",
                    "name": "How I Met Your Mother Quiz"
                }
            ],
            quizTaking: "",
            quizChosen: false,
            quizQuestions: [],
            quizAnswers: [],
            quizChoices: [],
            quizResponses: [],
            resultText: ""
        };
    },

    methods: {
        //async function to fetch data from local json files
        async fetchJSON(index){
            
            try {
                // "wait" for fetch to finish getting data
                let response = await fetch(this.links[index].link);
                // "wait" for data to be converted from JSON string to JavaScript data structure
                let jsonData = await response.json();

                this.quizTaking = this.links[index].name;

                //push jsonData into variables
                for (let x in jsonData.questions){
                    this.quizQuestions.push(jsonData.questions[x].question);
                    this.quizAnswers.push(jsonData.questions[x].answer);
                    this.quizChoices.push(jsonData.questions[x].choices);
                }

                //push potential responses into variable
                for (let y in jsonData["feedback-responses"]){
                    this.quizResponses.push(jsonData["feedback-responses"][y]);
                }
                //switch template
                this.quizChosen = true;
                //change background color according to chosen quiz
                document.getElementById('container').style.backgroundColor = jsonData["background-color"];
        
            } catch (error) {
                // if there is an error, report it
                console.error(error);
            }
        },

        //main function after quiz is submitted
        processAnswers(){
            let quiz = document.getElementById("main-quiz");
            
            //check to see if all questions were answered; if not, alert user
            if(!this.allQuestionsAnswered()){
                window.alert('You must answer all questions first.');
                return;
            }

            //get number of correct answers and display results accordingly
            let numCorrect = this.countCorrectAnswers();
            this.outputResults(numCorrect);

        },

        //loop through all questions to make sure none are "blank"
        allQuestionsAnswered() {
            let quiz = document.getElementById("main-quiz");
            
            //looping through questions
            for (let question of quiz.children){
                let name = question.className.replace('question','answer');
                let choice = this.getChoice(name);
                
                //if any question is blank, return false
                if (choice === -1){
                    return false;
                }
            }
            return true;
        },

        //basically the same as above, except counts correct answers because when this is called, we know a choice has been selectected for every question
        countCorrectAnswers(){
            let numCorrect = 0;
            let quiz = document.getElementById("main-quiz");
            
            //tracks which question we're on
            let num = 0;

            for (let question of quiz.children){
                let name = question.className.replace('question','answer');
                let choice = this.getChoice(name);
                let correctAnswer = this.getCorrectAnswer(num);
                
                //highlights response depending on whether or not the choice is correct
                this.highlightResponse(question, choice, correctAnswer);
                
                if (correctAnswer == choice){
                    numCorrect+=1;
                }
                num+=1;
            }
            return numCorrect;
        },

        //basic function to change variable this.resultText depending on percent correct
        outputResults(numCorrect){
            let percent = Math.round(numCorrect * 100 / this.quizAnswers.length);
            let message = `You got ${percent}% correct. `;
            if (percent <= 70){
                message += this.quizResponses[0];
            }
            else if (percent > 70 && percent < 100){
                message += this.quizResponses[1];
            }
            else{
                message += this.quizResponses[2];
            }
            this.resultText = message;
        },

        //returns choice that user made for that particular question, returns -1 if no choice was made
        getChoice (name) {
            let element = document.querySelector(`input[name="${name}"]:checked`);
            if (element === null) {
                return -1;
            } else {
                return element.value;
            }
        },

        //returns correct answer for given question number
        getCorrectAnswer(num){
            return this.quizAnswers[num];
        },

        //pulled from module 1 quiz example - highlights incorrect answers red and correct answers green by giving each selection the corresponding class name
        highlightResponse (parent, choice, correctAnswer) {
            let items = parent.querySelectorAll('li');
            items.forEach(li => {
                let input = li.querySelector('input');
                if (input.value == choice) {
                    li.className = (choice == correctAnswer ? 'correct' : 'incorrect');
                }
                // don't allow the answer to be changed after submission
                input.disabled = true;
            });
        },
        
        //force reload of page if user wants to take a different quiz
        refresh(){
            location.reload();
        }
    },

    //not used/needed
    watch: {
    },
});

// mount means connecting Vue app instance with HTML element with given ID to display it on the page
app.$mount('#app');
