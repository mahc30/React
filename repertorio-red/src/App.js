import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './assets/images/red-logo.png'
import tasks from './sample/task.json';

// ------------- Import Components ----------------
import Tasks from './components/Tasks';
import TaskForm from './components/TaskForm';
import Posts from './components/Posts'
import CompositorForm from './components/CompositorForm';
import ObraForm from './components/ObraForm';
import Consulta from './components/Consulta';
import TablaCompositor from './components/TablaCompositor'
import TablaObra from './components/TablaObra'

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PersonIcon from '@material-ui/icons/Person';
import PageviewIcon from '@material-ui/icons/Pageview';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';

class App extends Component {

  state = {
    tasks: tasks
  }

  addTask = (title, description) => {
    const newTask = {
      title: title,
      description: description,
      id: this.state.tasks.length + 1
    }

    this.setState({
      tasks: [...this.state.tasks, newTask]
    })
  }

  deleteTask = (id) => {
    const newTasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({
      tasks: newTasks
    })
  }

  checkDone = (id) => {
    const newTasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done
      }
      return task;
    })

    this.setState({ tasks: newTasks })
  }

  StyleCompleted() {
    return {
      maxHeight: "300px",
      maxWidth: "500px"
    }
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
                    <img style={this.StyleCompleted()} src={logo} alt="" srcset="" />
                  </div>
                </div>

                <div className="row pt-3 pb-3">
                  <p className="h2 mx-auto font-weight-bold">Repertorio Escuela Santa Fé</p>
                </div>

                <div className="row border border-top-0 border-dark shadow-lg">
                  <Box className="col text-center p-2" display="flex" bgcolor="primary.main">
                    <Typography className="h5 font-weight-bold mx-auto text-white"> Agregar </Typography>
                  </Box>

                  <Box className="col text-center p-2" display="flex" bgcolor="primary.main">
                    <Typography className="h5 font-weight-bold mx-auto text-white"> Consultar </Typography>
                  </Box>
                </div>

                <div className="row rounded shadow">
                  <div className="col-3 text-center p-3 border border-dark">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<PersonIcon />}
                      component={Link} to="/add/Compositor"
                    >
                      Compositor
                    </Button>
                  </div>

                  <div className="col-3 text-center p-3 border border-dark border-left-0">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={< MusicNoteIcon />}
                      component={Link} to="/add/Obra"
                    >
                      Obra
                    </Button>
                  </div>

                  <div className="col-6 text-center border border-dark border-left-0">
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
              </div>
            </div>
          </div>

        }}>
        </Route>

        <Route path="/posts" component={Posts} />
        <Route path="/add/compositor" component={CompositorForm} />
        <Route path="/add/obra" component={ObraForm} />
        <Route path="/consulta" component={Consulta} />
        <Route path="/tabla/compositor" component={TablaCompositor} />
        <Route path="/tabla/obra" component={TablaObra} />
      </Router>
    </div >
  }
}

export default App;