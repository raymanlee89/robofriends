import React from 'react';

function Scroll(props){
    return (
        <div style={{overflowY: 'scroll', border: '5px solid white', height: '800px'}}>
            {props.children}
        </div>
    );
}

export default Scroll;