import React, { Component } from 'react'
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
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

export default class TablaCompositor extends Component {

  state = {
    apiInfo: [],
  }

  componentDidMount = () => {

    let params = this.props.match.params;
    let nombre = params.nombre || "*";
    let pais = params.pais || "*";
    let periodo = params.periodo || "*";

    fetch(`http://localhost:3001/api/compositor/${nombre}/${pais}/${periodo}`)
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
    this.props.history.push(`/add/false/false/${id}`);
  }

  delRow = id => {
    const newRows = this.state.apiInfo.filter(e => e.ID !== id);
    console.log("filtering")
    this.setState({
      apiInfo: newRows
    })

    axios.post(`http://localhost:3001/api/compositor/del/${id}`)
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Pais</TableCell>
              <TableCell align="center">Periodo</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="right"></TableCell>

              <TableCell align="right">
                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  component={Link} to={`/consulta`}
                  className="bg-info"
                >
                  Consulta
                              </Button>
              </TableCell>

              <TableCell align="right">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  component={Link} to={`/add/false/true/*`}
                  className="bg-success"
                >
                  Agregar
                              </Button>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.state.apiInfo.map(row => (
              <TableRow key={row.ID}>
                <TableCell align="center">{row.Compositor}</TableCell>
                <TableCell align="center">{row.Pais}</TableCell>
                <TableCell align="center">{row.Periodo}</TableCell>
                <TableCell align="justify">{row.Descripcion}</TableCell>

                <TableCell align="center">
                  <IconButton aria-label="Editar" onClick={() => { this.editRow(row.ID) }}>
                    <EditSharpIcon color="primary" />
                  </IconButton>
                </TableCell>

                <TableCell align="right">
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
