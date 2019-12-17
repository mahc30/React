import React, { Component } from 'react';

export default class TaskForm extends Component {

    state = {
        title: '',
        description: ''
    }

    onSubmit = e => {
        console.log(this.state);
        e.preventDefault();
    }

    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        return (
            <form onSubmit = {this.onSubmit}>
                <input type="text" 
                name = "title"
                placeholder="Despacito" 
                onChange={this.onChange} 
                value={this.state.title}/>
                <br/>
                <textarea placeholder="Write a Description" 
                name = "textarea"
                onChange={this.onChange} 
                value={this.state.descrition}/>
                <br/>
                <button type="submit">
                    Submit
                </button>
            </form>
        )
    }

}
