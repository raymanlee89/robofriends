import React, { Component } from 'react';
import Cardlist from '../components/Card_list';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

class App extends Component{
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render() {
        const { robots, searchfield} = this.state;
        const filterRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return !robots.length ? 
        <h1>Loading</h1> : 
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <Searchbox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <Cardlist robots={filterRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
}

export default App;