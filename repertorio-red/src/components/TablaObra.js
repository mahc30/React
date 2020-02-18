import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Helpers from '../helpers/helpers.js';

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
import GetAppIcon from '@material-ui/icons/GetApp';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box'
import AddIcon from '@material-ui/icons/Add';

export default class TablaObra extends Component {

  state = {
    apiInfo: [],
    nombre: "*",
    compositor: "*",
    tonalidad: "*",
    nivel: "Semillero",
    esArreglo: false,
    downloadFailAlert: false
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
    this.setState({
      apiInfo: newRows
    });

    axios.post(`http://localhost:3001/api/obra/del/${id}`);
  }

  downloadPdf = id => {
    Helpers.httpRequest(
      `http://localhost:3001/api/obra/download/${id}`,
      'get',
    )
      // 1. Convert the data into 'blob'
      .then((response) => response.blob())
      .then((blob) => {

        // 2. Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Score.pdf`);  // 3. Append to html page
        document.body.appendChild(link);  // 4. Force download
        link.click();  // 5. Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((e) => {
        this.setState({
          downloadFailAlert: id
        })


      })
  };

  render() {
    return (
      <TableContainer component={Paper} >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
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
                  className="bg-info"
                >
                  Consulta
                              </Button>
              </TableCell>

              <TableCell align="right">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  component={Link} to={`/add/true/true/*`}
                  className="bg-success"
                >
                  Agregar
                              </Button>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.state.apiInfo.map(row => (
              <TableRow key={row.ID} hover={true}>

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
                  <IconButton aria-label="Editar" onClick={() => { this.downloadPdf(row.ID) }}>
                    <GetAppIcon id={row.ID} color="primary" />
                  </IconButton>

                  {this.state.downloadFailAlert && <Popover
                    open={true}
                    onClose={this.handleClose}
                    onClick={(e) => { this.setState({ downloadFailAlert: false }) }}
                    anchorEl={document.getElementById(this.state.downloadFailAlert)}
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'center',
                    }}
                  >
                    <Box className="text-center">
                      <PriorityHighIcon fontSize="large" color="secondary" />
                    </Box>
                  </Popover>}
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
