/*
 * This represents "database" to be edited.
 *
 * Note, this is NOT a good solution for handling shared data (the default for a web app)
 *
 * @author Robert C. Duvall
 * @author Dennis Quan
 * @author Jonathan Browning
 */

const admin = require('firebase-admin');

// provide global access to initialized app database
const { FIREBASE_CONFIG } = require('./secrets');

admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_CONFIG),
    databaseURL: `https://${FIREBASE_CONFIG.project_id}-default-rtdb.firebaseio.com`,
});
const DB = admin.database();

// actual data structure that the rest of the program will interact with
module.exports = {
    // could store a local copy of the database data to reduce time querying,
    // but note that any "extra" data only here in server will be wiped out
    // periodically when Heroku restarts server
    dataRef: DB.ref('data'),

    // return all the data
    async getData() {
        console.log(`Getting data at ${this.getTimeStamp()}`);
        // NOT the data directly, get current snapshot of all data to process locally
        const snapshot = await this.dataRef.once('value');
        // console.log(snapshot);
        // eslint-disable-next-line max-len
        // return actual data held within snapshot (also has convenience functions like forEach to process the data)
        return snapshot.val();
        // note could catch possible errors here, but should be caught be "general" error middleware
    },

    async getUserLogs() {
        let userData = await this.getData();
        userData = userData.users;
        console.log('this is the userData ', userData);
        return userData;
    },

    // change title of group at the given id
    // async setTitle(id, newTitle) {
    //     console.log(`Setting title for group ${id} to ${newTitle}`);
    //     // get pointer to where the data is and then change it to the given value
    //     await this.dataRef.child(`${id}/title`).set(newTitle);
    // eslint-disable-next-line max-len
    //     // note could catch possible errors here, but should be caught be "general" error middleware
    // },

    async addUser(emailAsKey) {
        console.log('this is the email as a key ', emailAsKey);

        const snap = await this.dataRef;
        let userExists = false;
        await snap.once('value').then((snapshot) => {
            // const a = snapshot.exists();
            // console.log('this is a ', a);
            userExists = snapshot.child('users').child(emailAsKey).exists();
            console.log('this is the user in question ', emailAsKey);
            console.log('this is if user itself exists ', userExists);
        });
        // console.log('does the user exist ', userExists);
        // console.log('why does it never get here????');

        if (userExists) {
            console.log('this user already exists woohoo');
            console.log('this is the time at which this user logged in ', this.getTimeStamp());
            const currTime = this.getTimeStamp();
            await this.dataRef.child('users').child(emailAsKey).child('allLogins').push(currTime);
        }

        if (!userExists) {
            await this.dataRef.child('users').child(emailAsKey).set({
                allLogins: '',
            });
            console.log('hopefully that worked');
            const currTime = this.getTimeStamp();
            await this.dataRef.child('users').child(emailAsKey).child('allLogins').push(currTime);
        }
    },

    // add new resource to group at the given id
    async addLink(name, source, subject, topic, url) {
        // console.log(`Adding new link ${newLink.name} to group ${id}`);
        // get pointer to data collection and add to it like a JavaScript array
        // (but it is really an object with Firebase generated index keys)
        // make new resource object
        const newResource = {
            name,
            source,
            subjects: subject,
            topics: topic,
            url: [
                {
                    link: url,
                    name: url,
                },
            ],
        };
        // get the data that already exists
        let currDataArray = await this.getData();
        currDataArray = currDataArray.resources;

        // console.log('this is the current data Array ', currDataArray);
        // console.log('this is the resource that I am going to add ', newResource);
        // add new resource to pre-existing data
        currDataArray.push(newResource);
        // console.log('this is the data array with the new resource ', currDataArray);
        /*
         * write over old array with new array
         * not the best way to do things
         * but i needed a quick fix that wouldn't break existing code
        */
        await this.dataRef.child('resources').set(currDataArray);
        // console.log('this is the snap ', snap);
        // await this.dataRef.child(`${id}/links`).push(newLink);
        // note could catch possible errors here, but should be caught be "general" error middleware
    },
    // basic utility to display the time in a readable format
    getTimeStamp() {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    },
};
