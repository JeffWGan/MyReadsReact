import {Enum} from 'enumify';

class MyReadsShelves extends Enum {}

MyReadsShelves.initEnum({
    CURRENTLY_READING: {
        value: 'currentlyReading',
        description: 'Currently Reading'
    }
    ,WANT_TO_READ: {
        value: 'wantToRead',
        description: 'Want to Read'
    }
    ,READ: {
        value: 'read',
        description: 'Read'
    }
    ,NONE: {
        value: 'none',
        description: 'None'
    }
});

export default MyReadsShelves