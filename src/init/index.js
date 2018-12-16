const { HashRouter, Route } = window.ReactRouterDOM

class App extends React.Component {
  state = {
    loading: true,
    tags: [],
    tasks: {},
  }

  async componentDidMount() {
    let tags = [],
      pivotTasks = {},
      tasks = await TaskApi.all()

    tasks.forEach(t => {
      pivotTasks[t.id] = t
      tags.push(t.group)
    })

    this.setState({
      loading: false,
      tags: [...new Set(tags)],
      tasks: pivotTasks
    }, this.validateTasks)
  }

  // note: more versatile curries with ramda. this will do for now
  // only supports change to `done`, yet can easily change to support more `{...old, ...delta}`
  taskUpdate(id, delta) {
    return async delta => {
      let old = this.state.tasks[id]
      let renew = await TaskApi.put({...old, done: delta})
      //note: would check handle failures with ui error state (+ auto retry)

      this.setState({
        ...this.state,
        tasks: {
          ...this.state.tasks,
          [id]: renew
        }
      }, this.validateTasks)
    }
  }

  validateTasks() {
    let tasks = {...this.state.tasks}

    for(let id in tasks) {
      let task = tasks[id]
      task.ready = task.dependencyIds
        .map(d => !!tasks[d].done)
        .reduce((a, b)=> a && b, true)
    }

    this.setState({
      ...this.state,
      tasks: tasks
    })
  }

  render() {

    if(this.state.loading)
      return <div className="lds-hourglass"></div>
    else
      return <React.Fragment>
        <Route
          exact
          path="/"
          render={() => <Organizer tags={this.state.tags} tasks={this.state.tasks} />}
        />

        <Route
          path="/tag-group/:name"
          render={props => {
              const tag = props.match.params.name
              return <TagGroup name={tag} tasks={this.state.tasks} onChange={this.taskUpdate.bind(this)}/>
            }}
        />
      </React.Fragment>
  }
}


ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter >,
  document.querySelector('#root')
);