import React, { Component } from 'react'
import {Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default class ObraForm extends Component {

    state = {
        compositor: [],
        tonalidad: [],
    }

    async componentDidMount() {

        fetch("/api/compositor/*")
            .then(res => {
                return res.json()
            })
            .then(compositor => {
                this.setState({ compositor: compositor })
            });

        fetch("/api/tonalidad/*")
            .then(res => {
                return res.json()
            })
            .then(tonalidad => {
                this.setState({ tonalidad: tonalidad })
            });

    }

    render() {
        return (
            <div className="container-fluid h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3 border border-dark form-container rounded shadow p-3 mb-5 bg-white rounded bg-transparent">
                        <form method="POST" action="/agregar/Obra">
                            <div className="form-group">
                                <div className="col align-self-center text-center">
                                    <strong>Agregar Obra</strong>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="align-self-center">
                                    <input type="text" className="form-control" name="nombre" id="inst-name"
                                        aria-describedby="helpId" placeholder="Ejemplo: Himno de la Alegría"
                                        required="required" />
                                    <small id="helpId" className="form-text text-muted">Nombre de la Obra</small>
                                </div>
                            </div>

                            <div className="form-group">
                                <select className="form-control" data-style="btn-info" name="compositor" onChange={this.handleChange}>
                                    {
                                        this.state.compositor.map(e => {
                                            return (<option key={e.ID}>
                                                {e.Compositor}
                                            </option>
                                            )
                                        })
                                    }
                                </select>
                                <small id="helpId" className="form-text text-muted">Compositor</small>
                            </div>

                            <div className="form-group">
                                <select className="form-control" data-style="btn-info" name="tonalidad" onChange={this.handleChange}>
                                    {
                                        this.state.tonalidad.map(e => {
                                            return (
                                                <option name={e.ID}>
                                                    {e.Tonalidad}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <small id="helpId" className="form-text text-muted">Tonalidad</small>
                            </div>

                            <div className="form-group">
                                <select className="form-control" data-style="btn-info" name="nivel">
                                    <option name="Orquesta">Orquesta</option>
                                    <option name="Preorquesta">Preorquesta</option>
                                    <option name="Semillero">Semillero</option>
                                </select>
                                <small id="helpId" className="form-text text-muted">Nivel</small>
                            </div>

                            <div className="form-check text-center">
                                <label className="form-check-label">
                                    <input name="esArreglo" type="checkbox" className="form-check-input" />
                                </label>
                                <small id="helpId" className="form-text text-muted pt-2">Es arreglo</small>
                            </div>


                            <div className="form-group text-center">
                                <Button variant="contained" className="bg-success text-white" component="span">
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
            </div>
        )
    } x
}
