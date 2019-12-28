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

        if (this.state.checked) {
            return (
                <form method="POST" action="/EDITAR COMPOSITOR">
                    <Typography align="center" variant="h5">Compositor</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.checked}
                                color="primary"
                                onChange={this.changeForm}
                            />
                        }
                    />
                    <div class="form-group">
                        <FormControl>
                            <TextField id="filled-basic" label="Nombre" variant="filled" />
                        </FormControl>
                    </div>

                    <div class="form-group">
                        <FormControl>
                            <InputLabel htmlFor="age-native-helper">Pais</InputLabel>
                            <NativeSelect>
                                <option value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                            </NativeSelect>
                        </FormControl>
                    </div>

                    <div class="form-group">
                        <FormControl>
                            <InputLabel htmlFor="age-native-helper">Periodo</InputLabel>
                            <NativeSelect>
                                <option value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                            </NativeSelect>
                        </FormControl>
                    </div>

                    <div class="form-group">
                        <FormControl>
                            <TextField id="outlined-basic" label="Descripción" variant="outlined" />
                        </FormControl>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SearchIcon />}
                    >
                        Buscar
                    </Button>
                </form>
            )
        } else {
            return (
                <form method="POST" action="/EDITAR COMPOSITOR">

                    <Typography align="center" variant="h5">Obra</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.checked}
                                color="primary"
                                onChange={this.changeForm}
                            />
                        }
                    />

                    <div class="form-group">
                        <FormControl>
                            <TextField id="filled-basic" label="Nombre" variant="filled" />
                        </FormControl>
                    </div>

                    <div class="form-group">
                        <FormControl>
                            <InputLabel htmlFor="age-native-helper">Compositor</InputLabel>
                            <NativeSelect>
                                <option value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                            </NativeSelect>
                        </FormControl>
                    </div>

                    <div class="form-group">
                        <FormControl>
                            <InputLabel htmlFor="age-native-helper">Tonalidad</InputLabel>
                            <NativeSelect>
                                <option value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                            </NativeSelect>
                        </FormControl>
                    </div>

                    <div class="form-group">
                        <FormControl>
                            <InputLabel htmlFor="age-native-helper">Nivel</InputLabel>
                            <NativeSelect>
                                <option value="" />
                                <option value={10}>Semillero</option>
                                <option value={20}>Preorquesta</option>
                                <option value={30}>Orquesta</option>
                            </NativeSelect>
                        </FormControl>
                    </div>

                    <div class="form-group">
                        <FormControl>
                            <TextField id="outlined-basic" label="Descripción" variant="outlined" />
                        </FormControl>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SearchIcon />}
                    >
                        Buscar
                    </Button>
                </form>
            )
        }

    }
}
