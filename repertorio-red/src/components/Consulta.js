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
                {this.props.isAuth ? <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.checked}
                            color="primary"
                            onChange={this.changeForm}
                        />
                    }
                /> : <p></p>}
                
                {this.state.checked ? <ConsultaObraForm /> : <ConsultaCompositorForm />}
            </div>
        )
    }
}