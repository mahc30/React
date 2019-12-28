import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
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

export default class TablaCompositor extends Component {

  state = {
    apiInfo: []
  }

  componentDidMount = () => {
    fetch("http://localhost:3001/api/compositor/*")
      .then((response) => {
        return response.json();
      })
      .then((jsonStr) => {
        let apei = [];

        jsonStr.map(e => {
          apei.push(e);
        });

        this.setState({ apiInfo: apei });
        console.log(jsonStr);
      });
  }

  
  editRow = id => {
    //TODO redirect to Edit Composer 
  }

  delRow = id => {
    const newRows= this.state.apiInfo.filter(e => e.ID !== id);
    console.log("filtering")
    this.setState({
      apiInfo: newRows
    })
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID </TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Pais</TableCell>
              <TableCell align="center">Periodo</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.state.apiInfo.map(row => (
              <TableRow key={row.ID}>
                <TableCell component="th" scope="row">
                  {row.ID}
                </TableCell>
                <TableCell align="center">{row.Compositor}</TableCell>
                <TableCell align="center">{row.Pais}</TableCell>
                <TableCell align="center">{row.Periodo}</TableCell>
                <TableCell align="justify">{row.Descripcion}</TableCell>

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
