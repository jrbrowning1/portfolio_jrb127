https://stormy-caverns-94672.herokuapp.com/ | https://git.heroku.com/stormy-caverns-94672.git

# portfolio

This repository holds all of my submitted work for my CS 290 project Teach Tech NC

## Name: Jonathan Browning

### Timeline

Start Date: 4-1-21

Finish Date: 4-28-21 

Hours Spent: 60+

### Collaboration

People consulted:
None

Resources used:
1. Module 5 examples
2. Module 6 examples
3. https://bootstrap-vue.org/

Asset attributions:
1. https://vue-multiselect.js.org/
2. https://github.com/bootstrap-vue/bootstrap-vue/issues/5571
3. https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
4. https://stackoverflow.com/questions/5963182/how-to-remove-spaces-from-a-string-using-javascript
5. https://www.fontspace.com/a-astro-space-font-f46028
6. https://stackoverflow.com/questions/50428046/vue-js-open-modal-by-click-of-a-button

### Assignment Notes

Known Bugs:
-Didn't have the time to implement robust testing
-Logging in takes you back to home page, rather than the profile page, so you have to navigate back to that yourself

### Impressions
This project was fun at times and incredibly annoying at other times (Firebase was giving me some real issues). 
Ultimately, I think it was very useful project, as I learned a ton about web development. However, I fear that
my idea and implementation doesn't quite line up with the desired one outlined in the final project 
prompt as the only time I really make use of an external API is to pull email addresses. My project requires 
that the users (or in the future, a certain subset of students, as this will be a public site with a real
domain) are the ones inputting the bulk of the data, as the point of it is that this data doesn't exist 
elsewhere. As such, the majority of the data currently in my web app is just sample data that will be replaced in the future.

### Special Instructions
No special instructions should be needed in order to run this application

### References for data
All data has been inputted by myself (with some of it vetted by one of my professors), outside of the emails which 
have been pulled using the Duke Directory API.

## Database data structure
The general structure of my database is fairly simple. Under the "data" section, there are three main parts. There's 
the "resources" section, which contains all the resources that are displayed under the curriculum database section of 
the website. There's the "partners" section, which contains biographical information for all of the different student partners
involved with the project, whether that be content creation or as a curriculum partner with a teacher. The final section
is the "users" section, which keeps a log of who has logged in and when they have logged in. In the future, it will contain
more information, such as references to saved resources and the like. 

### Different goals/access for different user types
As outlined in the initial project description, I have currently implemented three different types of users. In the future, there
will probably be a handful of other user types, such as a specific type for student curriculum partners, a specific one for 
people who can add data, and a "superuser" who has master control over all aspects of the project (such as deleting resources
or people). However, for now the roles are as follows:
-Guest: can browse the website, look at the database, and look at the student partners and their bios
-User: can do everything the guest can do + is able to add resources to the database and is personally greeted on the profile page
-Admind: can do everything the user can do + is able to look at user logs of who has visited the site and what time they visited

### Description of bad input/data and other error conditions
Simply due to the nature of my site, there aren't a whole lot of places where a user can really introduce a whole lot of
error. Most of it doesn't allow for specific user input - rather there a series of dropdowns. For the dropdowns, I 
did realize that unexpected behavior would occur if you tried to search without selecting any options. So I 
disabled the search button until an option has been picked. Filtering resources can lead to unexpected behavior if 
you selected a filter and applied it but then unselected it later. The algorithm would interpret this to mean that 
you don't want to include that anymore, even if you do. So I added a clear filter button that would revert the data
back to its original results. The only other place where a significant amount of data can be added is if you login 
and decide to add a resource. However, I do quite a bit of checking on this in the front end so that you can't advance
to the next section of data entry without filling in something for the current selection. And since my database is just JSON
(essentially), I don't have to worry about SQL attacks or the like being used in my data entry inputs. 

### Pros and cons of different framework possibilities
This was as a relatively straightforward decision as the only framework that we really focused on in class was Vue. 
Based on the complexity of this project, I decided to stick with Vue, rather than trying to do it all manually or anything 
like that. 
