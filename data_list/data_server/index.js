// set up dependencies: these modules export functions that can then be called below
// package for responding to requests for a specific URL
const express = require('express');
// package for logging attempts to access the server (for easier debugging)
const morgan = require('morgan');
// package that replicates fetch functionality built into the browser
const fetch = require('node-fetch');
// package that bundles up query parameters given as an Object into URL syntax
const querystring = require('querystring');
// package that allows certain URLs to access the server
const cors = require('cors');

// set up server specific configuration values
const { DUKE_API } = require('./secrets');
const subjectList = require('./subject_list');
// allow code to be run locally or when deployed on a remote host
const PORT = process.env.PORT || 3000;

// make a generic server and start listening for requests
const app = express();
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

// set up middleware apps that manage "all" URL requests
// log all requests made to the server
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// allow connections from anywhere
app.use(cors());

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

// access duke curriculum api to get useful data
async function fetchCourses(subject) {
    // set up query parameters needed to get current courses
    const parameters = {
        access_token: DUKE_API.TOKEN,
    };
    // console.log('this is the duke api url');
    // console.log(DUKE_API.URL);

    const jsonData = await getJSON(DUKE_API.URL, subject, parameters);
    // console.log('THIS IS THE JSON DATA');
    // console.log(jsonData);
    return jsonData;

    // throw new Error(`Duke API Error: ${jsonData.message}`);
}

async function fetchCourseDetails(courseID, courseOfferNbr) {
    const parameters = {
        access_token: DUKE_API.TOKEN,
    };
    const url = `${DUKE_API.URL2}${courseID}/crse_offer_nbr/`;
    console.log('this is the url right now', url);
    const jsonData = await getJSON(url, courseOfferNbr, parameters);
    return jsonData;
}

// set up URL responses:
// provide some response to visiting the server directly (i.e., its homepage)
app.get('/',
    (req, res) => {
        res.status(200);
        // console.log('sus');
        // console.log(subjectList[4]);
        res.send('<a href="api/get_data?sub=AAAS">Get the Data!</a>');
    });

// return the JSON data resulting from remote API requests
// NOTE, sub parameter are provided in the URL as request's query parameters
app.get(
    '/api/get_data',
    async (req, res) => {
        try {
            // use named query parameters to pass to our functions
            const subject = req.query.sub;
            const dukeData = await fetchCourses(subject);
            // everything is OK, so report back to browser
            res.status(200);
            // construct JSON object to return, must match what frontend is expecting
            // eslint-disable-next-line max-len
            const shortcut = dukeData.ssr_get_courses_resp.course_search_result.subjects.subject.course_summaries.course_summary;
            let usefulData = shortcut.map((item) => {
                const rItem = {};
                rItem.course_number = item.catalog_nbr;
                rItem.course_title = item.course_title_long;
                rItem.course_id = item.crse_id;
                rItem.course_offer_nbr = item.crse_offer_nbr;
                return rItem;
            });
            // console.log(usefulData);

            if (req.query.fil.length > 0) {
                console.log('need to filter');
                const split = req.query.fil.split(' ');
                const targetMin = parseInt(split[0], 10);
                const targetMax = parseInt(split[2], 10);
                console.log(targetMin);
                console.log(targetMax);
                usefulData = usefulData.filter((item) => {
                    const courseNum = item.course_number;
                    // console.log('this is the course num', courseNum);
                    const num = parseInt(courseNum, 10);
                    // console.log(num);
                    return num >= targetMin && num <= targetMax;
                });
            }
            res.json({
                number: usefulData.length,
                courses: usefulData,
            });
        } catch (error) {
            console.log(error);
            // create error object with useful message
            const err = new Error('Error: Check server --- one or more APIs are currently unavailable.');
            // set status code to return with response
            err.status = 503;
            // forward error on to next middleware handler (the error handler defined below)
            // next(err);
        }
    },
);

app.get(
    '/',
    (req, res) => {
        res.status(200);
        // console.log('sus');
        // console.log(subjectList[4]);
        res.send('<a href="api/get_subjects">Get the subjects!</a>');
    },
);

app.get(
    '/api/get_subjects',
    async (req, res) => {
        res.status(200);
        res.json(subjectList);
    },
);

app.get(
    '/api/get_details',
    async (req, res) => {
        try {
            if (req.query.id.length > 0 && req.query.off.length > 0) {
                const courseID = req.query.id;
                console.log('server courseID is ', courseID);
                const courseOffer = req.query.off;
                console.log('server courseOffer numner is ', courseOffer);
                const courseDetails = await fetchCourseDetails(courseID, courseOffer);
                res.status(200);
                console.log('these are the course details', courseDetails);
                // eslint-disable-next-line max-len
                const shortcut = courseDetails.ssr_get_course_offering_resp.course_offering_result.course_offering;
                res.json({
                    descrip: shortcut.descrlong,
                    req: shortcut.rqrmnt_group_descr,
                    attr: shortcut.course_attributes,
                });
            }
        } catch (error) {
            console.log(error);
            // create error object with useful message
            const err = new Error('Error: Check server --- one or more APIs are currently unavailable.');
            // set status code to return with response
            err.status = 503;
        }
    },
);

app.use((err, req, res, next) => {
    console.log(err);
    // delegate to default Express error handler if HTTP header info has already been sent back
    if (res.headersSent) {
        next(err);
        return;
    }
    // set error status and return error message as JSON
    // since that is what the frontend is expecting
    res.status(err.status || 500).json({ message: err.message });
});
