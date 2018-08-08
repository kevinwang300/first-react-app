import React from 'react';
import classes from './Cockpit.css';
import Aux from '../../hoc/Aux';

const cockpit = (props) => {
    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }
    if (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }
    if (props.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        <Aux>
            <div className={classes.Cockpit}>
                <h1 className={assignedClasses.join(' ')}>{props.appTitle}</h1>
                <button className={btnClass} onClick={props.clicked}>Toggle Persons </button>
            </div>
            <button onClick={props.login} >Log in</button>
        </Aux>
    );
}

export default cockpit;