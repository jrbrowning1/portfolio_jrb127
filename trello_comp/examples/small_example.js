/*
 * Basic data to work with for testing part 1 of trello
 *
 * @author Jonathan Browning
 */

const EXAMPLE_SMALL = {
    projectTitle: 'A Small Example',
    backgroundColor: '#C0C0C0',
    // backgroundImage:"yoda.png",
    taskLists: [
        {
            taskTitle: 'A Sample TaskList',
            cards: [
                {
                    cardTitle: 'A Sample Card with an excessively long title to show how text overflows',
                    myStyle: { backgroundColor: '#b19cd9' },
                    description: 'This is just a simple sample card',
                    deadline: '2021-03-01',
                    tags: [
                        {
                            tagTitle: 'Sample tag',
                            tagStyle: { backgroundColor: '#ff00ff' },
                        },
                    ],
                    comments: [
                        'This is sample comment 1',
                    ],
                },
            ],
        },
    ],
};
