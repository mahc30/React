import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

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

import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';

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
            <TaskForm addTask={this.addTask} />
            <Tasks
              tasks={this.state.tasks}
              deleteTask={this.deleteTask}
              checkDone={this.checkDone}
            />
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
    </div>
  }
}

export default App;