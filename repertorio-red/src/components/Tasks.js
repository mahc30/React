import React, { Component } from 'react';

import Task from './Task';

class Tasks extends Component {
    render() {
        return this.props.tasks.map(e => <Task e={e} key={e.id}/>)
    }
}

export default Tasks;