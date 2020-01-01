import React, { Component } from 'react'
import ObraForm from './ObraForm'
import CompositorForm from './CompositorForm'

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class AddForm extends Component {

    state = {
        id: this.props.match.params.id,
        type: this.props.match.params.type === "true" ? true : false,
        checked: this.props.match.params.checked === "true" ? true: false
    }

    componentDidUpdate = () => {
        console.log(this.state);
    }

    changeForm = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    unHistory = () => {

        if(this.state.checked){
            this.props.history.push("/tabla/obra/*/*/*/*/*");
        }else{
            this.props.history.push("/tabla/compositor/*/*/*");
        }
    }

    render() {
        return (
            <div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.checked}
                            color="primary"
                            onChange={this.changeForm}
                        />
                    }
                />
                {this.state.checked ? <ObraForm type={this.state.type} id={this.state.id} unHistory = {this.unHistory}/> : <CompositorForm type={this.state.type} id={this.state.id} unHistory = {this.unHistory}/>}
            </div>
        )
    }
}
