import React, { Component } from 'react'

export default class Consulta extends Component {
    render() {
        return (

            <div class="container-fluid h-100 bg-transparent">
                <div
                    class="row  h-25 justify-content-center align-items-center border border-dark shadow-lg bg-transparent rounded">
                    <div class="col align-self-center text-center mb-3">
                        <p class="h1"> Compositor</p>
                    </div>
                    <div class="col align-self-center text-center mb-3">
                        <p class="h1"> Obras </p>
                    </div>
                </div>

                <div
                    class="row h-50 justify-content-center align-items-center bg-transparent border border-dark border border-dark shadow-lg bg-transparent rounded">
                    <div class="col align-self-center text-center">

                        <form method="POST" action="/table/compositor/avanzado">
                            <div class="form-group">
                                <div class="form-check form-check-inline">
                                    <input type="checkbox"
                                        onclick="var input = document.getElementById('activatorCompositor-Nombre'); if(this.checked){ input.disabled = false; input.focus();}else{input.disabled=true; input.value ='';}" />
                                    <input disabled type="text" class="form-control ml-sm-2 pais" name="nombre"
                                        id="activatorCompositor-Nombre" aria-describedby="helpId"
                                        placeholder="Ejemplo: Daddy Yankee" />
                                </div>
                                <small id="helpId" class="form-text text-muted">Nombre</small>
                            </div>

                            <div class="form-group">
                                <div class="form-check form-check-inline">
                                    <input type="checkbox"
                                        onclick="var input = document.getElementById('activatorCompositor-Pais'); if(this.checked){ input.disabled = false; input.focus();}else{input.disabled=true;}" />
                                    <select disabled class="form-control ml-sm-2 pais" data-style="btn-info" name="pais"
                                        id="activatorCompositor-Pais">
                                        <option name="<% compositor[i].Pais%>"></option>
                                    </select>
                                </div>
                                <small id="helpId" class="form-text text-muted">Pais</small>
                            </div>

                            <div class="form-group">
                                <div class="form-check form-check-inline">
                                    <input type="checkbox"
                                        onclick="var input = document.getElementById('activatorCompositor-Periodo'); if(this.checked){ input.disabled = false; input.focus();}else{input.disabled=true;}" />
                                    <select disabled class="form-control periodo ml-sm-2" data-style="btn-info" name="periodo"
                                        id="activatorCompositor-Periodo">
                                        <option name="<%= compositor[i].Periodo %>"></option>
                                    </select>
                                </div>
                                <small id="helpId" class="form-text text-muted">Periodo</small>
                            </div>

                            <button type="submit" class="btn btn-info">Consultar Compositor</button>
                        </form>
                    </div>

                    <div class="col align-self-center text-center">
                        <form method="POST" action="/table/obra/avanzado">
                            <div class="form-group">
                                <div class="form-check form-check-inline">
                                    <input type="checkbox"
                                        onclick="var input = document.getElementById('activatorObra-Compositor'); if(this.checked){ input.disabled = false; input.focus();}else{input.disabled=true;}" />
                                    <select disabled class="form-control ml-sm-2 pais" class="slcomp" name="compositor"
                                        id="activatorObra-Compositor">
                                        <option name="<%= obra[i].ID %>"></option>
                                    </select>
                                </div>
                                <small id="helpId" class="form-text text-muted">Compositor</small>
                            </div>

                            <div class="form-group">
                                <div class="form-check form-check-inline">
                                    <input type="checkbox"
                                        onclick="var input = document.getElementById('activatorObra-Tonalidad'); if(this.checked){ input.disabled = false; input.focus();}else{input.disabled=true;}" />
                                    <select disabled class="form-control ml-sm-2 pais" data-style="btn-info" name="tonalidad"
                                        id="activatorObra-Tonalidad">
                                        <option name=""></option>
                                    </select>
                                </div>
                                <small id="helpId" class="form-text text-muted">Tonalidad</small>
                            </div>

                            <div class="form-group">
                                <div class="form-check form-check-inline">
                                    <input type="checkbox"
                                        onclick="var input = document.getElementById('activatorObra-Nivel'); if(this.checked){ input.disabled = false; input.focus();}else{input.disabled=true;}" />
                                    <select disabled class="form-control ml-sm-2 pais" data-style="btn-info" name="nivel"
                                        id="activatorObra-Nivel">
                                        <option name="Orquesta">Orquesta</option>
                                        <option name="Preorquesta">Preorquesta</option>
                                        <option name="Semillero">Semillero</option>
                                    </select>
                                </div>
                                <small id="helpId" class="form-text text-muted">Nivel</small>
                            </div>
                            <button type="submit" class="btn btn-info">Consultar Obras</button>
                        </form>
                    </div>
                </div>

                <div
                    class="row h-25 justify-content-center align-items-center border border-dark shadow-lg bg-transparent rounded">
                    <div class="form-container text-right">
                        <form method="GET" action="/">
                            <button type="submit" class="btn btn-info">Home</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
