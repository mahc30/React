import React, { Component } from 'react'
import ObraForm from './ObraForm'
import CompositorForm from './CompositorForm'

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class AddForm extends Component {

    state = {
        checked: true
    }

    changeForm = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    render() {

        if (this.state.checked) {
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
                    <ObraForm />
                </div>
            )
        } else {
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
                    <CompositorForm />
                </div>
            )
        }

    }
}
