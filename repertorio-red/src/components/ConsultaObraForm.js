import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import axios from 'axios';

export default class ConsultaObraForm extends Component {

    //TODO: Redirect to Tables according to parameters
    state = {
        compositor: [],
        tonalidad: [],
        nombre: "*",
        compositoropt: "*",
        tonalidadopt: "*",
        nivel: "*",
        esArreglo: false
    }

    componentDidMount = () => {

        let data = {}
        axios.get("http://localhost:3001/api/compositor/*")
            .then(res => {
                this.setState({
                    compositor: res.data
                })
            })

        axios.get("http://localhost:3001/api/tonalidad/*")
            .then(res => {
                this.setState({
                    tonalidad: res.data
                })
            })
    }

    onChange = e => {
        if (e.target.name === "esArreglo") {
            this.setState({
                esArreglo: !this.state.esArreglo
            })
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        console.log(this.state.esArreglo)
    }

    render() {
        return (
            <div className="container-fluid h-100">
                <div className="mx-auto my-5 col col-sm-6 col-md-6 col-lg-4 col-xl-3 border border-dark form-container rounded shadow p-3 mb-5 bg-white rounded bg-transparent">
                    <form method="POST" action="/EDITAR OBRA">
                        <Typography align="center" variant="h5">Obra</Typography>
                        <div class="form-group">
                            <FormControl className="w-100">
                                <TextField
                                    id="filled-basic"
                                    label="Nombre"
                                    variant="filled"
                                    name="nombre"
                                    onChange={this.onChange} />
                            </FormControl>
                        </div>

                        <div class="form-group">
                            <FormControl className="w-100">
                                <InputLabel htmlFor="age-native-helper">Compositor</InputLabel>
                                <NativeSelect name="compositoropt" onChange={this.onChange}>
                                    {this.state.compositor.map(e => {
                                        return (
                                            <option key={e.ID} value={e.ID}>{e.Compositor}</option>
                                        )
                                    })}
                                </NativeSelect>
                            </FormControl>
                        </div>

                        <div class="form-group">
                            <FormControl className="w-100">
                                <InputLabel htmlFor="age-native-helper">Tonalidad</InputLabel>
                                <NativeSelect name="tonalidadopt" onChange={this.onChange}>
                                    {this.state.tonalidad.map(e => {
                                        return (
                                            <option key={e.ID} value={e.ID}>{e.Tonalidad}</option>
                                        )
                                    })}
                                </NativeSelect>
                            </FormControl>
                        </div>

                        <div class="form-group">
                            <FormControl className="w-100">
                                <InputLabel htmlFor="age-native-helper">Nivel</InputLabel>
                                <NativeSelect name="nivel" onChange={this.onChange}>
                                    <option value="Semillero">Semillero</option>
                                    <option value="Preorquesta">Preorquesta</option>
                                    <option value="Orquesta">Orquesta</option>
                                </NativeSelect>
                            </FormControl>
                        </div>

                        <div class="form-group">
                            <FormControl className="w-100">
                                <TextField
                                    id="outlined-basic"
                                    label="Descripción"
                                    variant="outlined"
                                    name="descripcion"
                                    onChange={this.onChange} />
                            </FormControl>
                        </div>

                        <div className="form-check text-center">
                            <label className="form-check-label">
                                <input name="esArreglo" type="checkbox" className="form-check-input" onChange={this.onChange} />
                            </label>
                            <small id="helpId" className="form-text text-muted pt-2">Es arreglo</small>
                        </div>
                        <div class="form-group w-100 text-center">

                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SearchIcon />}
                                component={Link} to={`/tabla/obra/${this.state.nombre}/${this.state.compositoropt}/${this.state.tonalidadopt}/${this.state.nivel}/${this.state.esArreglo}`}
                            >
                                Buscar
                              </Button>
                        </div>
                    </form>

                    <div className="form-container text-right">
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link} to={`/`}>
                            Home
                         </Button>
                    </div>
                </div>
            </div>
        )
    }
}
