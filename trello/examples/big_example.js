/*
 * Basic data to work with for testing part 1 of trello
 *
 * @author Jonathan Browning
 */

const EXAMPLE_BIG = {
    projectTitle: 'A Big Example',
    backgroundColor: '#C0C0C0',
    // backgroundImage:"yoda.png",
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
                        // {
                        //     tagTitle: 'Sample tag',
                        //     tagStyle: { backgroundColor: '#ff00ff' },
                        // },
                        // {
                        //     tagTitle: 'Another sample tag',
                        //     tagStyle: { backgroundColor: '#ff00ff' },
                        // },
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
                        // "This is sample comment 1", "This is sample comment 2"
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
                        // 'This is sample comment 1', 'This is sample comment 2',
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
                        // {
                        //     tagTitle: 'Another sample tag',
                        //     tagStyle: { backgroundColor: '#ff00ff' },
                        // },
                    ],
                    comments: [
                        'use google doc',
                    ],
                },
                // {
                //     cardTitle: 'A Sample Card #2',
                //     myStyle: { backgroundColor: '#b19cd9' },
                //     numComments: 2,
                //     description: 'This is just a simple sample card',
                //     deadline: 'March 2, 2021',
                //     tags: [
                //         {
                //             tagTitle: 'Sample tag',
                //             tagStyle: { backgroundColor: '#ff00ff' },
                //         },
                //     ],
                //     comments: [
                //         'This is sample comment 1', 'This is sample comment 2',
                //     ],
                // },
            ],
        },
        {
            taskTitle: 'Other things?',
            cards: [
                // {
                //     cardTitle: 'A Sample Card',
                //     myStyle: { backgroundColor: '#b19cd9' },
                //     numComments: 2,
                //     description: 'This is just a simple sample card',
                //     deadline: 'March 2, 2021',
                //     tags: [
                //         {
                //             tagTitle: 'Sample tag',
                //             tagStyle: { backgroundColor: '#ff00ff' },
                //         },
                //         {
                //             tagTitle: 'Another sample tag',
                //             tagStyle: { backgroundColor: '#ff00ff' },
                //         },
                //     ],
                //     comments: [
                //         'This is sample comment 1', 'This is sample comment 2',
                //     ],
                // },
                // {
                //     cardTitle: 'A Sample Card #2',
                //     myStyle: { backgroundColor: '#b19cd9' },
                //     numComments: 2,
                //     description: 'This is just a simple sample card',
                //     deadline: 'March 2, 2021',
                //     tags: [
                //         {
                //             tagTitle: 'Sample tag',
                //             tagStyle: { backgroundColor: '#ff00ff' },
                //         },
                //     ],
                //     comments: [
                //         'This is sample comment 1', 'This is sample comment 2',
                //     ],
                // },
            ],
        },
    ],
};
