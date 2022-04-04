/*
 * Keeps the app's secrets (anything that can be stolen and used inappropriately).
 *
 * Note, if we were using public GIT repository, this file would NOT be committed and pushed!
 * Note, these are throw-away tokens, but please do not abuse so everyone in the class can
 * experiment with this example.
 *
 * @author Jonathan Browning
 */

exports.DUKE_API = {
    URL: 'https://streamer.oit.duke.edu/ldap/people/netid/',
    TOKEN: '8680b59177aabc3408e60aa024f0739a',
};

exports.FIREBASE_CONFIG = {
    // TODO: fill this in with donloaded JSON data
    type: 'service_account',
    project_id: 'teach-tech-nc-2346c',
    private_key_id: '46b1f41ae663e325afbbfcd9eb59fb90d6bac61e',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC8wV+SrKObZ7RD\nYq8xUTrikslkn2lQ/mGWg2WqX8eXAcffbsGlCmxFvfgAfxX912gUi/o1RrTIeyBg\nuH4vbXlWE2SqJGbAI/CIZVfZ6nvthYJW6rNNhjItdQsLSTjzzfyKiul1WCrOSydC\nQf06xfUKkviNOtEd5YBLFf1sq9Tz45mqTsDYnuxZo4zjWc+hmTu7LZesHYfO4kJW\naeve4hsoC3KELe1ArNtmEgeO95wkRzGp5sZfrAnayb+YsrRsAx3zts8NKEJwmx2T\nvvQpJ+d47rIZ4YqVA2mPFAGI9/L8ocJd8Mx4jgz3VtBz/IYOsNVR7IkemDzMEqeR\nQ/PimUJjAgMBAAECggEAV938y56qGrHP7H6H54FU1BxYvAqpUBba/uHz9bfYhadC\nj/RTGK0dcenZBQIkDqKzxLzUoPBlP95xWBUKSLHBhhxJBBsl6dPRKO1kVAEf55X6\n8tMW3MPXn+mYVoyjgnslUKkRvJpqctXxVJq7cxyr0VxRcA0tQ6mOa2W1L11eKJnA\nT9OJEWWF2y/74nL8mv2OGvDYcly6YwfoQC5ieHiMSpBT5KcHiAWH4mzSiz+Ksclm\n7YxlqL2C7v5LOBv5UbeL46pIdP49N8eaR8oqwG5NeYML7IGyhSUL1pdaRzI1cxfn\nqmy8q67u4mL9RTEaYjGHs8UA86PdjfYydx2uQJepIQKBgQD8kXOEGjvVDPn0N3w6\nrkcsHhXAsAXUfgBFidomj1OkXw+xXh4UkF1f/xrXo28dNFD+Y/ATuUTttws+eqSA\nswpqjAwxkLx7bmr/QtXujRGHLCwDbuCbaCBy1Tg9HXjg4LtmlBHEjBhStdgSGbOa\ncirLlpXKm68nASRsLrDONR1L5QKBgQC/UfOhqm2AntBnvyzE/7ixhuHFkjgEaTK3\nnvVQ6sTmZWQWXKXHlBtj1wh3Cyrd6kE+3K0QHnAkQhObRyVQ+h0jjVd5RobP6328\npah0hSdYE/bUiHOiSafHziN0acfM9EgkyiLoKu13P8R+k+Vex1pr1M8I8/vnsVKW\nb5Aulj3ApwKBgFHHNsP7Sow9W2F75bmKXHkodJqjY//dnHDnpb7+gXKjZQ1lEBBQ\nfitrCmHwBTZLjj4QVdfNEUh3ECj2xPT3A9Rj7D7QQnck1Xg5R9Op0ZcW8llaOVeY\na4lDCKahOFZ37bXVE7u0MNv3DTMvJzxG4xxwcafcqOXUNNric1URVZ8RAoGBALay\nVJwB+pWDkvIvfloU9NMaQckAa1vS9WqhchO2TRbSpbQw/uJKDanWsy+yy1mlFG8q\nHl2xI1eMfdqfIwRkA6VqmKin757ne2fFLcsvSDX0wpWMRBgqi/ziXbsSNIkEkUwI\ndzMLoz5n94UESFmsty0XyCj9jIVhMMOVf7LtJ8UrAoGBANWOLTeu9aY6XiyNQhXc\nHQm8KQBL2dyizZG4kpfra2jvaOIgYJ5LrbSl6VVWXpMDP8QUhEZt74Pmz9Iu9FJZ\ndsJIFggrqN475eLCbdGcH7GPDVSjf6pwBWAORuHXWzorZWvFqo5ehK84VcLX/7hd\nzHyqXMM/denmcLD9KTNHoabJ\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-qbquu@teach-tech-nc-2346c.iam.gserviceaccount.com',
    client_id: '107725926440887673878',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qbquu%40teach-tech-nc-2346c.iam.gserviceaccount.com',
};

// These should represent the final URLs for your front- and backend projects
exports.DEPLOYED_URLS = {
    // TODO: change to Heroku and GitLab URLs, with a trailing slash
    SERVER: 'https://stormy-caverns-94672.herokuapp.com/',
    VIEW: 'https://compsci290_2021spring.dukecs.io/portfolio_jrb127/teach_tech_nc/dist/',
};

// WARNING: really lousy encryption key!
exports.COOKIE_ENCRYPTION_KEY = 'SECRET';

// This needs to be downloaded from Google Cloud Service Credentials Console to configure access
//   https://console.cloud.google.com/apis/credentials
exports.OAUTH = {
    web: {
        client_id: '812238937576-mrhlkrngpe1v8qfk44keof30ijtgbcud.apps.googleusercontent.com',
        project_id: 'teach-tech-nc-2346c',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_secret: '5YwwO3HHy-i1UyLgRvVjS8NL',
        redirect_uris: ['http://localhost:8080/api/auth/google/redirect', 'https://stormy-caverns-94672.herokuapp.com/api/auth/google/redirect'],
    },
};
