import React, { useState, useEffect } from 'react';
import Cardlist from '../components/Card_list';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
import userEvent from '@testing-library/user-event';

function App (){
    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')

    useEffect(() =>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => setRobots(users));
    },[]) // used to replace componentDidMount()

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const filterRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    return !robots.length ? 
    <h1>Loading</h1> : 
    (
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <Searchbox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundary>
                    <Cardlist robots={filterRobots}/>
                </ErrorBoundary>
            </Scroll>
        </div>
    );
}

export default App;