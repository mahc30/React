import React, { Component, Context } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './assets/images/red-logo.png'

// ------------- Import Components ----------------
import Posts from './components/Posts'
import Consulta from './components/Consulta';
import TablaCompositor from './components/TablaCompositor'
import TablaObra from './components/TablaObra'
import addForm from './components/AddForm'

// ------------------- Material UI imports --------------------
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import PageviewIcon from '@material-ui/icons/Pageview';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import axios from 'axios';

class App extends Component {

  StyleCompleted() {
    return {
      maxHeight: "300px",
      maxWidth: "500px"
    }
  }

  state = {
    willAuth: false,
    auth: "",
    isAuth: false
  }

  validate = () => {
    var url = `http://localhost:3001/admin/auth/${this.state.auth}`;
    console.log("url: " + url);
    axios.get(url)
      .then(res => {
        this.setState({
          isAuth: true,
          willAuth: false
        })
        console.log("Auth!")
      })
      .catch(res => {
        this.setState({ isAuth: false })
        console.log("fuckdup")
      })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return <div>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton component={Link} to="/" color="primary" edge="start" color="inherit" aria-label="menu">
              <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Route exact path="/" render={() => {
          return <div>
            <div className="row h-100 container mx-auto pt-5">
              <div className="container mt-5">
                <div className="row">
                  <div className="col text-center">
                    <img style={this.StyleCompleted()} src={logo} alt="" srcSet="" />
                  </div>
                </div>

                <div className="row pt-3 pb-3">
                  <p className="h2 mx-auto font-weight-bold">Repertorio Escuela Santa Fé</p>
                </div>

                <div className="row border border-top-0 border-dark shadow-lg">
                  {this.state.isAuth ? <Box className="col text-center p-2" display="flex" bgcolor="primary.main">
                    <Typography className="h5 font-weight-bold mx-auto text-white"> Agregar </Typography>
                  </Box> : <p></p>}

                  <Box className="col text-center p-2" display="flex" bgcolor="primary.main">
                    <Typography className="h5 font-weight-bold mx-auto text-white"> Buscar Obras </Typography>
                  </Box>
                </div>

                <div className="row rounded shadow">
                {this.state.isAuth ? <div className="col text-center p-3 border border-dark">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<PersonIcon />}
                      component={Link} to="/add/true/true/*"
                    >
                      Obras / Compositores
                    </Button>
                  </div> : <p/>}

                  <div className="col text-center border border-dark">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={< PageviewIcon />}
                      component={Link} to="/consulta"
                      className="my-3"
                    >
                      Buscar
                    </Button>
                  </div>
                </div>

                <div className="row">
                  <div className="col py-5 my-4 text-right">
                    <button onClick={() => this.setState({ willAuth: !this.state.willAuth })} style={
                      {
                        "background": "transparent",
                        "border": "none!important",
                        "fontSize": "0",
                      }
                    } />

                    {this.state.willAuth ?
                      (<div>
                        <input name="auth" value={this.state.auth} onChange={this.onChange} />
                        <button onClick={this.validate}>:)</button>
                      </div>) :
                      (<p></p>)
                    }
                  </div>
                </div>
              </div>

            </div>

          </div>

        }}>
        </Route>
        <Route path="/posts" component={Posts} />
        <Route path="/add/:checked/:type/:id" component={addForm} />
        <Route path="/consulta" component={props => <Consulta {...props} isAuth={this.state.isAuth}></Consulta>} />
        <Route path="/tabla/compositor/:nombre/:pais/:periodo" component={(props) => <TablaCompositor {...props} isAuth={this.state.isAuth} />} />
        <Route path="/tabla/obra/:nombre/:compositor/:tonalidad/:nivel/:esArreglo" component={props => <TablaObra {...props} isAuth={this.state.isAuth} />} />
      </Router>
    </div >
  }
}

export default App;