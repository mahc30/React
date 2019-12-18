import React, { Component } from 'react';

class Task extends Component {

    StyleCompleted() {
        return {
            fontSize: '18px',
            color: this.props.e.done ? 'green' : 'black',
            textDecoration: this.props.e.done ? 'line-through' : 'none'
        }
    }

    render() {

        const { e } = this.props;
        return <div style={this.StyleCompleted()}>
            {e.title} -
            {e.description} -
            <input type="checkbox" onChange={this.props.checkDone.bind(this,e.id)}/>
            <button style={btnDelete} onClick = {this.props.deleteTask.bind(this, e.id)}>
                x
            </button>
        </div>
    }
}

const btnDelete = {
    fontSize: '18px',
    background: '#ea2027',
    color: '#ffff',
    border: 'solid black 1px',
    padding: '10px 15px',
    borderRadius: '50%',
    cursor: 'pointer'
}
export default Task;