import {Items} from '../../../both/collections/items.collection';
import {ISingleItem} from '../../../both/models/single-item.model';
/**
 * Created by a.nvlkv on 19/11/2016.
 */

export function loadTasks(){
    if (Items.find().cursor.count() === 0){
        const tasks: ISingleItem[] =[
            {
                name:'item 1',
                primaryText: 'Do you agree?',
                guidanceText: 'Use yes or no button to answer',
                itemConfig: {
                    itemType: 'yes-no'
                }
            },
            {
                name:'item 2',
                primaryText: 'What is your name?',
                guidanceText: 'Type your response in input',
                itemConfig: {
                    itemType: 'input',
                    inputType: 'text',
                    maxChar: 64,
                    minChar: 2
                }
            },
            {
                name:'item 3',
                primaryText: 'How old are you?',
                guidanceText: 'Type your response in input',
                itemConfig: {
                    itemType: 'input',
                    inputType: 'number',
                    maxVal: 180,
                    minVal: 1
                }
            },
            {
                name:'item 4',
                primaryText: 'What is your favorite color?',
                guidanceText: 'Choose color using an input',
                itemConfig: {
                    itemType: 'input',
                    inputType: 'color',
                }
            },
            {
                name:'item 5',
                primaryText: 'What is your date of birth?',
                guidanceText: 'Choose date using an input',
                itemConfig: {
                    itemType: 'input',
                    inputType: 'date'
                }
            },
            {
                name:'item 6',
                primaryText: 'What time is it?',
                guidanceText: 'Enter current time using an input',
                itemConfig: {
                    itemType: 'input',
                    inputType: 'time'
                }
            },
            {
                name:'item 7',
                primaryText: 'What is your favorite search engine?',
                guidanceText: 'Enter a url using an input',
                itemConfig: {
                    itemType: 'input',
                    inputType: 'url'
                }
            },
            {
                name:'item 8',
                primaryText: 'What is your email?',
                guidanceText: 'Enter email using an input',
                itemConfig: {
                    itemType: 'input',
                    inputType: 'email'
                }
            },
            {
                name:'item 9',
                primaryText: 'What was your reason to answer this survey?',
                guidanceText: 'Enter a short reflection using an input',
                itemConfig: {
                    itemType: 'text',
                    maxChar: 120,
                    minChar: 20,
                }
            },
            {
                name:'item 10',
                primaryText: 'Which item would you choose?',
                guidanceText: 'Select an item from list bellow',
                itemConfig: {
                    itemType: 'single-choice',
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
                name:'item 11',
                primaryText: 'Which items would you choose?',
                guidanceText: 'Select a number of items from list bellow',
                itemConfig: {
                    itemType: 'multiple-choice',
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
                name:'item 12',
                primaryText: 'This is a display item',
                guidanceText: 'Please have a look at this item',
                itemConfig: {
                    itemType: 'primaryText',
                },
                display: '<h3>This is h3 heading, yup?</h3>'
            },
            {
                name:'item 13',
                primaryText: 'Please list some items',
                guidanceText: 'Enter items using a list input. Press enter to add a new item',
                itemConfig: {
                    itemType: 'listing',
                    maxCount: 16,
                    minCount: 2
                },
            },
            {
                name:'item 14',
                primaryText: 'Please list some items in each list',
                guidanceText: 'Enter items using a list input. Press enter to add a new item',
                itemConfig: {
                    itemType: 'listing',
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
                name:'item 15',
                primaryText: 'Please order items',
                guidanceText: 'Drag and drop to reorder',
                itemConfig: {
                    itemType: 'ordering',
                    maxCount: 16,
                    minCount: 2
                },
            },
            {
                name:'item 16',
                primaryText: 'Please rate items',
                guidanceText: 'Rate items using a rating input',
                itemConfig: {
                    itemType: 'rating',
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
                name:'item 17',
                primaryText: 'Please group items',
                guidanceText: 'Drag and drop items on existing groups. Drag and drop items on empty space to crate new group',
                itemConfig: {
                    itemType: 'grouping',
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
            Items.insert(task);
        })
    }
}