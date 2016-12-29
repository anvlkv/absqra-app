import {Tasks} from '../../../both/collections/tasks.collection';
import {ISingleTask} from '../../../both/models/single-task.model';
/**
 * Created by a.nvlkv on 19/11/2016.
 */

export function loadTasks(){
    if (Tasks.find().cursor.count() === 0){
        const tasks: ISingleTask[] =[
            {
                primaryText: 'Do you agree?',
                guidanceText: 'Use yes or no button to answer',
                taskConfig: {
                    taskType: 'yes-no'
                }
            },
            {
                primaryText: 'What is your name?',
                guidanceText: 'Type your response in input',
                taskConfig: {
                    taskType: 'input',
                    inputType: 'text',
                    maxChar: 64,
                    minChar: 2
                }
            },
            {
                primaryText: 'How old are you?',
                guidanceText: 'Type your response in input',
                taskConfig: {
                    taskType: 'input',
                    inputType: 'number',
                    maxVal: 180,
                    minVal: 1
                }
            },
            {
                primaryText: 'What is your favorite color?',
                guidanceText: 'Choose color using an input',
                taskConfig: {
                    taskType: 'input',
                    inputType: 'color',
                }
            },
            {
                primaryText: 'What is your date of birth?',
                guidanceText: 'Choose date using an input',
                taskConfig: {
                    taskType: 'input',
                    inputType: 'date'
                }
            },
            {
                primaryText: 'What time is it?',
                guidanceText: 'Enter current time using an input',
                taskConfig: {
                    taskType: 'input',
                    inputType: 'time'
                }
            },
            {
                primaryText: 'What is your favorite search engine?',
                guidanceText: 'Enter a url using an input',
                taskConfig: {
                    taskType: 'input',
                    inputType: 'url'
                }
            },
            {
                primaryText: 'What is your email?',
                guidanceText: 'Enter email using an input',
                taskConfig: {
                    taskType: 'input',
                    inputType: 'email'
                }
            },
            {
                primaryText: 'What was your reason to answer this survey?',
                guidanceText: 'Enter a short reflection using an input',
                taskConfig: {
                    taskType: 'text',
                    maxChar: 120,
                    minChar: 20,
                }
            },
            {
                primaryText: 'Which item would you choose?',
                guidanceText: 'Select an item from list bellow',
                taskConfig: {
                    taskType: 'single-choice',
                    allowOther: true,
                    allowUndefined: true,
                },
                assets:[
                    {
                        assetType: 'text',
                        text: 'Terrible option',
                    },
                    {
                        assetType: 'text',
                        text: 'So-so option',
                    },
                    {
                        assetType: 'text',
                        text: 'Nice one',
                    },
                ]
            },
            {
                primaryText: 'Which items would you choose?',
                guidanceText: 'Select a number of items from list bellow',
                taskConfig: {
                    taskType: 'multiple-choice',
                    allowOther: true,
                    maxCount: 4,
                    minCount: 2
                },
                assets:[
                    {
                        assetType: 'text',
                        text: 'Terrible option',
                    },
                    {
                        assetType: 'text',
                        text: 'So-so option',
                    },
                    {
                        assetType: 'text',
                        text: 'Nice one',
                    },
                    {
                        assetType: 'text',
                        text: 'Very nice option',
                    },
                    {
                        assetType: 'text',
                        text: 'Unearthly good',
                    },
                    {
                        assetType: 'text',
                        text: 'So good that almost terrible',
                    },
                ]
            },
            {
                primaryText: 'This is a display item',
                guidanceText: 'Please have a look at this item',
                taskConfig: {
                    taskType: 'display',
                },
                display: '<h3>This is h3 heading, yup?</h3>'
            },
            {
                primaryText: 'Please list some items',
                guidanceText: 'Enter items using a list input. Press enter to add a new item',
                taskConfig: {
                    taskType: 'listing',
                    maxCount: 16,
                    minCount: 2
                },
            },
            {
                primaryText: 'Please list some items in each list',
                guidanceText: 'Enter items using a list input. Press enter to add a new item',
                taskConfig: {
                    taskType: 'listing',
                    maxCount: 16,
                    minCount: 2
                },
                options:[
                    {
                        label: 'First group',
                    },
                    {
                        label: 'Another group',
                    },
                    {
                        label: 'Yet another group',
                    },
                ],
            },
            {
                primaryText: 'Please order items',
                guidanceText: 'Drag and drop to reorder',
                taskConfig: {
                    taskType: 'ordering',
                    maxCount: 16,
                    minCount: 2
                },
            },
            {
                primaryText: 'Please rate items',
                guidanceText: 'Rate items using a rating input',
                taskConfig: {
                    taskType: 'rating',
                    allowUndefined: true
                },
                options:[
                    {
                        label: 'Terrible option',
                        value: 1,
                    },
                    {
                        label: 'So-so option',
                        value: 2,
                    },
                    {
                        label: 'Nice one',
                        value: 3
                    },
                ],
                assets:[
                    {
                        assetType: 'text',
                        text: 'Rateable item'
                    },
                    {
                        assetType: 'text',
                        text: 'Another rateable item'
                    },
                    {
                        assetType: 'text',
                        text: 'One more rateable item'
                    },
                ]
            },
            {
                primaryText: 'Please group items',
                guidanceText: 'Drag and drop items on existing groups. Drag and drop items on empty space to crate new group',
                taskConfig: {
                    taskType: 'grouping',
                    allowNewGroups: true
                },
                options:[
                    {
                        label: 'First group',
                    },
                    {
                        label: 'Another group',
                    },
                    {
                        label: 'Yet another group',
                    },
                ],
                assets:[
                    {
                        assetType: 'text',
                        text: 'Sortable item'
                    },
                    {
                        assetType: 'text',
                        text: 'Another sortable item'
                    },
                    {
                        assetType: 'text',
                        text: 'One more sortable item'
                    },
                    {
                        assetType: 'text',
                        text: 'Sortable item 4'
                    },
                    {
                        assetType: 'text',
                        text: 'Another sortable item 5'
                    },
                    {
                        assetType: 'text',
                        text: 'One more sortable item 6'
                    },
                ]
            },
            
        ];

        tasks.forEach((task)=>{
            Tasks.insert(task);
        })
    }
}