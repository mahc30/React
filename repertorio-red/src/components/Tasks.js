import React, { Component } from 'react';
import propTypes from 'prop-types';

import Task from './Task';

class Tasks extends Component {
    render() {
        return this.props.tasks.map(e => <Task
            e={e}
            key={e.id}
            deleteTask={this.props.deleteTask}
            checkDone={this.props.checkDone}
        />)
    }
}

Task.propTypes = {
    tasks: propTypes.array.isRequired
}

export default Tasks;