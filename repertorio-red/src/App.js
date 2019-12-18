import React, { Component } from 'react';
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
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
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

        <Route path="/add/compositor" component={CompositorForm}/>
        <Route path="/add/obra" component={ObraForm}/>
        <Route path="/consulta" component={Consulta}/>
      </Router>
    </div>
  }
}

export default App;