/*
 *@author Jonathan Browning
*/
// set up dependencies: these modules export functions that can then be called below
// package for responding to requests for a specific URL
const express = require('express');

// package for logging attempts to access the server (for easier debugging)
const morgan = require('morgan');
const morganBody = require('morgan-body');

// package that replicates fetch functionality built into the browser
const fetch = require('node-fetch');

// package that bundles up query parameters given as an Object into URL syntax
const querystring = require('querystring');

// package that allows certain URLs to access the server
// const cors = require('cors');

// set up server specific configuration values
// eslint-disable-next-line no-unused-vars
const { json } = require('express');
const { DUKE_API } = require('./secrets');
const studentList = require('./student_list');
const linkDataStore = require('./LinkDataStore.js');
// allow code to be run locally or when deployed on a remote host
const PORT = process.env.PORT || 3000;

// make a generic server and start listening for requests
const app = express();
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

// set up middleware apps that manage "all" URL requests
// log all requests made to the server
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
morganBody(app, {
    logRequestBody: true,
    logAllReqHeader: true,
    logResponseBody: true,
    logAllResHeader: true,
});

// parse JSON data sent to URL requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up authentication
const auth = require('./authentication.js');

auth.setupAuthentication(app);

// allow connections from anywhere
// app.use(cors());

// eslint-disable-next-line no-unused-vars
const adminEmailAddresses = ['teachtechnc0@gmail.com', 'fake_alice@cs.duke.edu', 'rcd@cs.duke.edu', 'dquan@cs.duke.edu'];

// in the absence of a real database, use a global variable to store color preferences
// const colors = {};

function extractUserId(req) {
    return req.user?.id || '<none>';
}

async function returnAllData() {
    // return async (req, res, next) => {
    // NOTE, not ideal to return ALL the data but makes it easier to debug and use by frontend
    const allData = await linkDataStore.getData();
    // console.log('all the data is ', allData);
    return allData;
    // };
}
// simple function to factor out common code from the API methods
// NOTE, queryParameters contains values meant to be passed along with the URL (i.e., after the ?)
// NOTE, protocolOptions contains values meant to be passed along with the request
// (i.e., GET/POST, headers, etc.)
async function getJSON(url, apiAction, queryParameters) {
    // console.log('protocol options', protocolOptions);
    // console.log('query params ', queryParameters);
    const parameters = queryParameters ? `?${querystring.stringify(queryParameters)}` : '';
    // console.log('params');
    // console.log(parameters);
    const urlWithParameters = `${url}${apiAction}${parameters}`;
    console.log('this is the url with params', urlWithParameters);
    // console.log(urlWithParameters);
    const response = await fetch(urlWithParameters);
    return response.json();
}

async function fetchContactInformation(netID) {
    const paramters = {
        access_token: DUKE_API.TOKEN,
    };
    // go and access the duke directory API
    const jsonData = await getJSON(DUKE_API.URL, netID, paramters);
    return jsonData;
}

// API for getting information on the logged in user
app.get(
    '/api/user',
    async (req, res) => {
        // extract out the useful parts of the req.user object
        console.log('is this the first time you have been here?');
        // const allData = await returnAllData();
        // console.log('this is all the user data ', allData.resources);
        const id = extractUserId(req);
        const email = req.user?.emails ? req.user.emails[0].value : null;
        console.log('the email is ', email);
        const emailAsKey = email.split('.').join('');
        await linkDataStore.addUser(emailAsKey);
        res.json({
            id,
            // color: colors[`user:${id}`],
            displayName: req.user?.displayName,
            email,
            isAdmin: adminEmailAddresses.includes(email),
            photo: req.user?.photos?.length >= 1 ? req.user.photos[0].value : null,
        });
        // console.log('here is the backend data ', )
    },
);

app.get(
    '/api/userLogs',
    // eslint-disable-next-line no-unused-vars
    async (req, res) => {
        // extract out the useful parts of the req.user object
        console.log('abiout to get the user logs!!');
        // const allData = await returnAllData();
        // console.log('this is all the user data ', allData.resources);
        const userLogs = await linkDataStore.getUserLogs();
        console.log('here are the user logs in index.js ', userLogs);
        res.json(userLogs);
    },
);

// allow new resource to be added to the data structure
app.post(
    '/api/addResource',
    // check parameters from the user to make sure they are all included
    // validateUserData(['id', 'link'], 'body'),
    // can now assume complete user data, so do the work to change data structure
    async (req) => {
        console.log('this is entered resource name ', req.body.name);
        console.log('this is entered resource source ', req.body.source);
        console.log('this is entered resource subjects ', req.body.subject);
        console.log('this is entered resource topics ', req.body.topic);
        console.log('this is entered resource url ', req.body.url);
        await linkDataStore.addLink(req.body.name,
            req.body.source, req.body.subject, req.body.topic, req.body.url);
        // next();
    },
    // NOTE, not ideal to return ALL the data but makes it easier to debug and use by frontend
    // const allData = await returnAllData;
    // return allData;
);

// set up URL responses:
// provide some response to visiting the server directly (i.e., its homepage)
app.get('/',
    (req, res) => {
        res.status(200);
        // console.log('sus');
        // console.log(subjectList[4]);
        let homepageHTML = '<h3>Teach Tech NC JSON Data</h3><br>';
        homepageHTML += 'This data represents the basic information about the student curriculum partners for Teach Tech NC.';
        homepageHTML += '<br><a href="api/get_students">Get the student partner data!</a>';
        homepageHTML += '<br><br> This data represents all the biography information of the student partners';
        homepageHTML += '<br><a href="api/get_all_partners">Get biography information!</a>';
        homepageHTML += '<br><br> This data represents all the resources that make up the database';
        homepageHTML += '<br><a href="api/get_all_resources">Get the curriculum information!</a>';
        res.send(homepageHTML);
    });
app.get(
    '/api/get_all_resources',
    async (req, res) => {
        res.status(200);
        let allJSON = await returnAllData();
        allJSON = allJSON.resources;
        console.log('here is all the resource data ', allJSON);
        res.json(allJSON);
    },
);
app.get(
    '/api/get_all_partners',
    async (req, res) => {
        res.status(200);
        let allJSON = await returnAllData();
        allJSON = allJSON.partners;
        console.log('here is all the resource data ', allJSON);
        res.json(allJSON);
    },
);
// get resources when searching by subject
app.get(
    '/api/get_resources',
    async (req, res) => {
        try {
            res.status(200);
            console.log('this is the selected topic', req.query.topic);
            // split csv into array
            const selectedTopics = req.query.topic.split(',');
            // get all the data from the databse - not ideal but debugging is easier
            let allJSON = await returnAllData();
            allJSON = allJSON.resources;
            console.log('here is all the resource data ', allJSON);
            // set up some useful variables
            const matchSet = new Set();
            const filteredJSON = [];
            // go through the resources for each topic
            //  (since some of them overlap in multiple topics)
            selectedTopics.forEach((topic) => {
                // useful for keeping track of matches
                let foundTopic = false;
                // filter resources to see if they include current topic we're searching for
                const tempArray = allJSON.filter((resource) => {
                    if (resource.topics.includes(topic)) {
                        // add topic to match if it exists and return that specific resource
                        matchSet.add(topic);
                        foundTopic = true;
                        return true;
                    }
                    return false;
                });
                // if the current topic exists for some resource
                if (foundTopic) {
                    // make a new object that fits frontend specifications
                    const entireTopic = {
                        title: topic,
                        resources: tempArray,
                    };
                    // add to main array
                    filteredJSON.push(entireTopic);
                }
            });
            console.log('this is the filtered json ', filteredJSON);
            // put together a few objects in a single object that will be returned
            const jsonToReturn = {
                matches: [...matchSet],
                content: filteredJSON,
            };
            // send it off to the front end
            res.json(jsonToReturn);
        } catch (error) {
            console.log(error);
            // create error object with useful message
            const err = new Error('Error: Check server --- one or more APIs are currently unavailable.');
            // set status code to return with response
            err.status = 503;
        }
    },
);
// get resources when searching by topic
app.get(
    '/api/get_resources_subjects',
    async (req, res) => {
        try {
            // successfull accessed API
            res.status(200);
            console.log('this is the selected subject(s) ', req.query.subject);
            // split string into array
            const selectedSubjects = req.query.subject.split(',');
            // get all the data from the databse - not ideal but debugging is easier
            let allJSON = await returnAllData();
            allJSON = allJSON.resources;
            console.log('here are all the resources ', allJSON);
            // set up some useful variables
            const matchSet = new Set();
            const filteredJSON = [];
            // go through the resources for each subject
            // (since some of them overlap in multiple subject)
            selectedSubjects.forEach((subject) => {
                // useful for keeping track of matches
                let foundSubject = false;
                // filter resources to see if they include current topic we're searching for
                const tempArray = allJSON.filter((resource) => {
                    if (resource.subjects.includes(subject)) {
                        // add topic to match if it exists and return that specific resource
                        matchSet.add(subject);
                        foundSubject = true;
                        return true;
                    }
                    return false;
                });
                // if the current topic exists for some resource
                if (foundSubject) {
                    // make a new object that fits frontend specifications
                    const entireSubject = {
                        title: subject,
                        resources: tempArray,
                    };
                    // add to main array
                    filteredJSON.push(entireSubject);
                }
            });

            // console.log('about to return the filtered json ', filteredJSON);
            const jsonToReturn = {
                matches: [...matchSet],
                content: filteredJSON,
            };
            console.log('about to return the final json ', jsonToReturn);
            console.log('the matching subjects are ', [...matchSet]);
            res.json(jsonToReturn);
        } catch (error) {
            console.log(error);
            // create error object with useful message
            const err = new Error('Error: Check server --- one or more APIs are currently unavailable.');
            // set status code to return with response
            err.status = 503;
        }
    },
);
// view information for all student partners
app.get(
    '/api/get_students',
    async (req, res) => {
        try {
            res.status(200);
            console.log('This is the student list server side', studentList);
            const promisesToReturn = studentList.map(async (item) => {
                // fetch all info associated with student's netID
                const oneDatum = await fetchContactInformation(item);
                // pull out the useful data from returned info
                const usefulData = {
                    name: oneDatum[0].display_name,
                    email: oneDatum[0].emails[0],
                    netID: item,
                };
                console.log('one usefulData is ', usefulData);
                return usefulData;
            });
            const jsonToReturn = await Promise.all(promisesToReturn);
            console.log('this is the json to return', jsonToReturn);
            res.json(jsonToReturn);
        } catch (error) {
            console.log(error);
            // create error object with useful message
            const err = new Error('Error: Check server --- one or more APIs are currently unavailable.');
            // set status code to return with response
            err.status = 503;
        }
    },
);
app.get(
    '/api/get_student_bio',
    async (req, res) => {
        try {
            res.status(200);
            console.log('this is the selected netid ', req.query.netid);
            const netID = req.query.netid;
            // get all the data from the databse - not ideal but debugging is easier
            let allJSON = await returnAllData();
            allJSON = allJSON.partners;
            const jsonToReturn = allJSON.find((student) => student.netID === netID);
            console.log('this is the desired studentBio ', jsonToReturn);
            res.json(jsonToReturn);
        } catch (error) {
            console.log(error);
            // create error object with useful message
            const err = new Error('Error: Check server --- one or more APIs are currently unavailable.');
            // set status code to return with response
            err.status = 503;
        }
    },
);
// handle errors thrown by the application code
// NOTE, this actually MUST be defined LAST in order to catch any errors from others
app.use((err, req, res, next) => {
    console.error(err);
    // delegate to default Express error handler if HTTP header info has already been sent back
    if (res.headersSent) {
        next(err);
        return;
    }
    // set error status if not already done so
    if (!res.statusCode) {
        res.status(500);
    }
    // return error message as JSON since that is what the frontend is expecting
    res.json({ message: err.message });
});
