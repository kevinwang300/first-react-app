import React, { PureComponent } from 'react';
import classes from './App.css';
import Person from '../Components/Persons/Person/Person';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClassName from '../hoc/withClassName';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[App.js] inside constructor', props);
        // --Used to be initialized this way--
        // this.state = {
        //     persons: [
        //         {id:'adge234', name: 'Kevin', age:20},
        //         {id:'gktje43', name: 'Allen', age:27},
        //         {id:'ptoe034', name: 'James', age:25},
        //         {id:'ptor085', name: 'Christine', age:22},
        //     ],
        //     showPersons: false
        // };
    }

    componentWillMount() {
        console.log('[App.js] inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[App.js] inside componentDidMount()');
    }

    // PureComponent automatically has this
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE App.js] inside shouldComponentUpdate', nextProps, nextState);
    //     return this.state.persons !== nextState.persons ||
    //         this.state.showPersons !== nextState.showPersons;
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE App.js] inside componentWillUpdate', nextProps, nextState);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('[UPDATE App.js] inside getDerivedStateFromProps', nextProps, prevState);
        return prevState;
    }

    getSnapshotBeforeUpdate() {
        console.log('[UPDATE App.js] inside getSnapshotBeforeUpdate');
    }

    componentDidUpdate() {
        console.log('[UPDATE App.js] inside componentDidUpdate');
    }

    state = {
        persons: [
            {id:'adge234', name: 'Kevin', age:20},
            {id:'gktje43', name: 'Allen', age:27},
            {id:'ptoe034', name: 'James', age:25},
            {id:'ptor085', name: 'Christine', age:22},
        ],
        showPersons: false,
        toggleClicked: 0,
        authenticated: false
    };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });
        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({
            persons: persons
        })
    };

    togglePersonsHandler = () => {
        const show = this.state.showPersons;
        this.setState( (prevState, props) => {
            return {
                showPersons: !show,
                toggleClicked: prevState.toggleClicked + 1
            }
        })
    };

    deletePersonHandler = (personIndex) => {
        const persons = this.state.persons.slice();
        // or const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({
            persons: persons
        })
    };

    loginHandler = () => {
        this.setState({authenticated: true});
    }

    render() {
        console.log('[App.js] inside render()');
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler}
            />

        }

        return (
            <Aux>
                <button onClick={() => this.setState({showPersons: true})}>Show Persons</button>
                <Cockpit
                    appTitle={this.props.title}
                    persons={this.state.persons}
                    login={this.loginHandler}
                    showPersons={this.state.showPersons}
                    clicked={this.togglePersonsHandler}/>
                <AuthContext.Provider value={this.state.authenticated}>
                    {persons}
                </AuthContext.Provider>
            </Aux>
        );
    }
}

export default withClassName(App, classes.App);
