import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import Cardlist from '../components/Card_list';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
//import userEvent from '@testing-library/user-event';
import {requestRobots, setSearchfield} from '../action';

const mapStateToProps = state => {
    return {
        searchfield: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

function App (props){
    const {searchfield, onSearchChange, onRequestRobots, robots, isPending} = props;

    useEffect(() =>{
        onRequestRobots();
    },[]) // used to replace componentDidMount()

    const filterRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    return isPending ? 
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

export default connect(mapStateToProps, mapDispatchToProps)(App);