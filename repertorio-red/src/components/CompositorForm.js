import React, { Component } from 'react'

export default class CompositorForm extends Component {

    state = {
        pais: [],
        periodo: []
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
    
    render() {
        return (
            <div className="container-fluid h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3 border border-dark form-container shadow-lg p-3 mb-5 bg-white rounded bg-transparent">
                        <form method="POST" action="/agregar/compositor">
                            <div className="form-group">
                                <div className="col align-self-center text-center">
                                    <p className="h3"> Agregar Compositor </p>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="align-self-center">
                                    <input type="text" className="form-control" name="nombre" id="inst-name"
                                        aria-describedby="helpId" placeholder="Daddy Yankee" required="required" />
                                    <small id="helpId" className="form-text text-muted">Nombre</small>
                                </div>
                            </div>

                            <div className="form-group">
                                <select className="form-control pais" data-style="btn-info" name="pais" onChange={this.handleChange}>
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
                                <select className="form-control periodo" data-style="btn-info" name="periodo" onChange={this.handleChange}>
                                {
                                        this.state.periodo.map(e => {
                                            return ( <option key={e.ID}>
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
                                <textarea className="form-control" rows="5" id="descripcion" name="descripcion" placeholder="O Fortuna
velut luna,
statu variabilis,
semper crescis
aut decrescis;"></textarea>
                            </div>

                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-primary">Agregar</button>
                            </div>
                        </form>

                        <div className="form-container text-right">
                            <form method="GET" action="/">
                                <button type="submit" className="btn btn-info">Home</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
