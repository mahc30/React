import React, { Component } from 'react'
import {Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Typography } from '@material-ui/core';

export default class CompositorForm extends Component {

    state = {
        pais: [],
        periodo: [],
        compositor: "NA",
        paisopt: "Afghanistan",
        periodoopt: "Antiguo",
        descripcion: ""
    }

    async componentDidMount() {

        fetch("/api/pais/*")
        .then(res => {
            return res.json()
         })
        .then(paises => { 
            this.setState({ pais: paises })
         });

        fetch("/api/periodo/*")
        .then(res => {
            return res.json()
         })
        .then(periodos => { 
            console.log(periodos); 
            this.setState({ periodo: periodos })
         });

    }
    
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendData = () => {
        let data = {
            compositor: this.state.compositor,
            pais: this.state.paisopt,
            periodo: this.state.periodoopt,
            descripcion: this.state.descripcion
        }

        axios.post("http://localhost:3001/api/post/add/compositor", JSON.stringify(data));
        console.log("Axios'ed");
    }
    render() {
        return (
            <div className="container-fluid h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3 border border-dark form-container shadow-lg p-3 mb-5 bg-white rounded bg-transparent">
                        <form method="POST" action="/agregar/compositor">
                            <div className="form-group">
                                <div className="col align-self-center text-center">
                                    <Typography variant="h5"> Agregar Compositor </Typography>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="align-self-center">
                                    <input type="text" className="form-control" name="nombre" id="inst-name"
                                        aria-describedby="helpId" placeholder="Daddy Yankee" required="required" onChange={this.onChange}/>
                                    <small id="helpId" className="form-text text-muted">Nombre</small>
                                </div>
                            </div>

                            <div className="form-group">
                                <select className="form-control pais" data-style="btn-info" name="paisopt" onChange={this.onChange}>
                                    {
                                        this.state.pais.map(e => {
                                            return ( <option key={e.ID}>
                                                {e.Pais}
                                            </option>
                                            )
                                        })
                                    }
                                </select>
                                <small id="helpId" className="form-text text-muted">Pais</small>
                            </div>

                            <div className="form-group">
                                <select className="form-control periodo" data-style="btn-info" name="periodoopt" onChange={this.onChange}>
                                {
                                        this.state.periodo.map(e => {
                                            return ( <option key={e.ID} value={e.Periodo}>
                                                {e.Periodo}
                                            </option>

                                            )
                                        }) 
                                }
                                </select>
                                <small id="helpId" className="form-text text-muted">Periodo</small>
                            </div>

                            <div className="form-group text-center">
                                <label htmlFor="comment">Descripción:</label>
                                <textarea 
                                className="form-control" 
                                rows="5" 
                                id="descripcion" 
                                name="descripcion" 
                                placeholder="O Fortuna
                                            velut luna,
                                            statu variabilis,
                                            semper crescis
                                            aut decrescis;"
                                onChange={this.onChange}/>
                            </div>

                            <div className="form-group text-center">
                            <Button 
                            variant="contained" 
                            className="bg-success text-white" 
                            component="span"
                            onClick={this.sendData}>
                              Agregar
                            </Button>
                            </div>
                        </form>

                        <div className="form-container text-right">
                            <Button 
                            variant="contained" 
                            color="primary" 
                            component={Link} to = "/"> 
                            Home
                         </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
