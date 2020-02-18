import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

export default class ConsultaCompositorForm extends Component {

    state = {
        pais: [],
        periodo: [],
        compositor: "*",
        paisopt: "*",
        periodoopt: "*",
        descripcion: ""
    }

    async componentDidMount() {

        let data = [{}];
        fetch("/api/pais/*")
            .then(res => {
                return res.json()
            })
            .then(paises => {
                paises.forEach(element => {
                    data = [...data, element]
                });
                this.setState({ pais: data })
            });

        let data_1 = [{}];
        fetch("/api/periodo/*")
            .then(res => {
                return res.json()
            })
            .then(periodos => {
                periodos.forEach(e => {
                    data_1 = [...data_1, e]
                });

                this.setState({ periodo: data_1 })
            });

    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })

        console.log(this.state)
    }

    sendData = () => {
        let data = {
            compositor: this.state.compositor,
            pais: this.state.paisopt,
            periodo: this.state.periodoopt,
            descripcion: this.state.descripcion
        }

        axios.post("http://localhost:3001/api/add/compositor", JSON.stringify(data));
    }

    render() {

        return (
            <div className="container-fluid h-100">
                <div className="mx-auto my-2 col col-sm-6 col-md-6 col-lg-4 col-xl-3 border border-dark form-container rounded shadow p-3 mb-5 bg-white rounded bg-transparent">
                    <form method="POST" action="/EDITAR COMPOSITOR">
                        <Typography align="center" variant="h5">Compositor</Typography>

                        <div class="form-group">
                            <FormControl className="w-100">
                                <TextField
                                    id="filled-basic"
                                    label="Nombre"
                                    variant="filled"
                                    name="compositor"
                                    onChange={this.onChange}
                                    className="my-2"
                                />
                            </FormControl>
                        </div>

                        <div class="form-group">
                            <FormControl className="w-100">
                                <InputLabel htmlFor="age-native-helper">Pais</InputLabel>
                                <NativeSelect name="paisopt" onChange={this.onChange}>
                                    {
                                        this.state.pais.map(e => {
                                            return (<option key={e.ID} value={e.ID}>
                                                {e.Pais}
                                            </option>
                                            )
                                        })
                                    }
                                </NativeSelect>
                            </FormControl>
                        </div>

                        <div class="form-group">
                            <FormControl className="w-100">
                                <InputLabel htmlFor="age-native-helper">Periodo</InputLabel>
                                <NativeSelect name="periodoopt" onChange={this.onChange}>
                                    {
                                        this.state.periodo.map(e => {
                                            return (<option key={e.ID} value={e.ID}>
                                                {e.Periodo}
                                            </option>

                                            )
                                        })
                                    }
                                </NativeSelect>
                            </FormControl>
                        </div>

                        <div class="form-group mx-auto">
                            <FormControl className="w-100">
                                <TextField
                                    id="outlined-basic"
                                    label="Descripción"
                                    variant="outlined"
                                    name="descripcion"
                                    onChange={this.onChange}
                                />
                            </FormControl>
                        </div>

                        <div className="form-group w-100 text-center">
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SearchIcon />}
                                component={Link} to={`/tabla/compositor/${this.state.compositor}/${this.state.paisopt}/${this.state.periodoopt}`}
                                >
                                Buscar
                        </Button>
                        </div>
                    </form>

                    <div className="form-container text-right">
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link} to="/">
                            Home
                         </Button>
                    </div>
                </div>
            </div>
        )
    }
}
