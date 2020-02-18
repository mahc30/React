import React, { Component } from 'react'

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ConsultaObraForm from './ConsultaObraForm';
import ConsultaCompositorForm from './ConsultaCompositorForm'
export default class Consulta extends Component {

    state = {
        checked: true
    }

    changeForm = () => {
        this.setState({
            checked: !this.state.checked
        })
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
                {this.state.checked ? <ConsultaObraForm /> : <ConsultaCompositorForm />}
            </div>
        )
    }
}
