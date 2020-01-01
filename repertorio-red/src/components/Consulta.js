import React, { Component } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
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
