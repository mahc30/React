import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Typography } from '@material-ui/core';

export default class ObraForm extends Component {

    state = {
        compositor: [],
        tonalidad: [],
        nombre: "NA",
        compositoropt: "Wolfang Amadeus Mozart",
        tonalidadopt: "C",
        nivel: "Orquesta",
        esArreglo: false
    }

    async componentDidMount() {

        fetch("/api/compositor/*")
            .then(res => {
                return res.json()
            })
            .then(compositor => {
                this.setState({
                    compositor: compositor,
                })
            });

        fetch("/api/tonalidad/*")
            .then(res => {
                return res.json()
            })
            .then(tonalidad => {
                this.setState({
                    tonalidad: tonalidad,
                })
            });
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
    }

    sendData = () => {

        let data = {
            nombre: this.state.nombre,
            compositor: this.state.compositoropt,
            tonalidad: this.state.tonalidadopt,
            nivel: this.state.nivel,
            esArreglo: this.state.esArreglo
        }

        axios.post("/api/post/add/obra", JSON.stringify(data));
        console.log("Axios'ed");
        console.log(this.state)
    }
    //TODO i can refactor this so i have only one page and change the form depending on state, así como hice con las consultas!
    render() {
        return (
            <div className="container-fluid h-100">
                    <div className=" mx-auto my-5 col col-sm-6 col-md-6 col-lg-4 col-xl-3 border border-dark form-container rounded shadow p-3 mb-5 bg-white rounded bg-transparent">
                        <form method="POST" action="/agregar/Obra">
                            <div className="form-group">
                                <div className="col align-self-center text-center">
                                    <Typography variant="h5"> Agregar Obra </Typography>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="align-self-center">
                                    <input type="text" className="form-control" name="nombre" id="inst-name"
                                        aria-describedby="helpId" placeholder="Ejemplo: Himno de la Alegría"
                                        required="required" onChange={this.onChange} />
                                    <small id="helpId" className="form-text text-muted">Nombre de la Obra</small>
                                </div>
                            </div>

                            <div className="form-group">
                                <select className="form-control" data-style="btn-info" name="compositoropt" onChange={this.onChange}>
                                    {
                                        this.state.compositor.map(e => {
                                            return (<option key={e.ID} value={e.Compositor}>
                                                {e.Compositor}
                                            </option>
                                            )
                                        })
                                    }
                                </select>
                                <small id="helpId" className="form-text text-muted">Compositor</small>
                            </div>

                            <div className="form-group">
                                <select className="form-control" data-style="btn-info" name="tonalidadopt" onChange={this.onChange}>
                                    {
                                        this.state.tonalidad.map(e => {
                                            return (
                                                <option key={e.ID} value={e.Tonalidad}>
                                                    {e.Tonalidad}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <small id="helpId" className="form-text text-muted">Tonalidad</small>
                            </div>

                            <div className="form-group">
                                <select className="form-control" data-style="btn-info" name="nivel" onChange={this.onChange}>
                                    <option value="Orquesta">Orquesta</option>
                                    <option value="Preorquesta">Preorquesta</option>
                                    <option value="Semillero">Semillero</option>
                                </select>
                                <small id="helpId" className="form-text text-muted">Nivel</small>
                            </div>

                            <div className="form-check text-center">
                                <label className="form-check-label">
                                    <input name="esArreglo" type="checkbox" className="form-check-input" onChange={this.onChange} />
                                </label>
                                <small id="helpId" className="form-text text-muted pt-2">Es arreglo</small>
                            </div>


                            <div className="form-group text-center">
                                <Button variant="contained" className="bg-success text-white" component="span" onClick={this.sendData}>
                                    Agregar
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
