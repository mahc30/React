import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search';

export default class TablaObra extends Component {

  state = {
    apiInfo: [],
    nombre: "*",
    compositor: "*",
    tonalidad: "*",
    nivel: "Semillero",
    esArreglo: false
  }

  componentDidMount = () => {

    let params = this.props.match.params;
    let nombre = params.nombre;
    let compositor = params.compositor;
    let tonalidad = params.tonalidad;
    let nivel = params.nivel;
    let esArreglo = params.esArreglo;

    fetch(`http://localhost:3001/api/obra/${nombre}/${compositor}/${tonalidad}/${nivel}/${esArreglo}`)
      .then((response) => {
        return response.json();
      })
      .then((jsonStr) => {
        let apei = [];

        jsonStr.map(e => {
          apei.push(e);
        });

        this.setState({ apiInfo: apei });
      });
  }


  editRow = id => {
    this.props.history.push(`/add/true/false/${id}`)
  }

  delRow = id => {
    const newRows = this.state.apiInfo.filter(e => e.ID !== id);
    console.log("filtering")
    this.setState({
      apiInfo: newRows
    })

    axios.post(`http://localhost:3001/api/obra/del/${id}`);
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID </TableCell>
              <TableCell align="center">Obra</TableCell>
              <TableCell align="center">Compositor</TableCell>
              <TableCell align="center">Tonalidad</TableCell>
              <TableCell align="center">Nivel</TableCell>
              <TableCell align="center">Es Arreglo</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  component={Link} to={`/consulta`}
                  className="bg-success"
                >
                  Consulta
                              </Button>
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {this.state.apiInfo.map(row => (
              <TableRow key={row.ID}>
                <TableCell component="th" scope="row">
                  {row.ID}
                </TableCell>
                <TableCell align="center">{row.Obra}</TableCell>
                <TableCell align="center">{row.Compositor}</TableCell>
                <TableCell align="center">{row.Tonalidad}</TableCell>
                <TableCell align="center">{row.Nivel}</TableCell>
                <TableCell align="center">{row.EsArreglo ? "Si" : "No"}</TableCell>

                <TableCell>
                  <IconButton aria-label="Editar" onClick={() => { this.editRow(row.ID) }}>
                    <EditSharpIcon color="primary" />
                  </IconButton>
                </TableCell>

                <TableCell>
                  <IconButton aria-label="Eliminar" onClick={() => { this.delRow(row.ID) }}>
                    <DeleteForeverSharpIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
