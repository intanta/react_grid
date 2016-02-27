import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './App';

var today = new Date(),
    dayNamesList = ['Mo','Tu','We','Th','Fr','Sa','Su'],
    monthNamesList = ['January','February','March','April','May','June','July','August',
                    'September','October','November','December'];
ReactDOM.render(<DatePicker currentDate={today} dayNames={dayNamesList} monthNames={monthNamesList}/>, document.getElementById('root'));
