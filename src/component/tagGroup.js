const { Link } = window.ReactRouterDOM

class TagGroup extends React.Component {

  render() {
    const {
      name,
      tasks,
      onChange,
    } = this.props

    let relevant = Object.keys(tasks)
      .filter(id => tasks[id].group === name)

    return <div className="d-flex flex-column">
      <div className= "d-flex justify-content-between mx-5">
        <h3 className="font-weight-bold">{name}</h3>
        <Link to="/">ALL GROUPS</Link>
      </div>

      <ul>
      {
        relevant.map(id => {
          let task = tasks[id]
          return <Task key={`task-${task.id}`} task={task} onChange={onChange(task.id)}/>
        })
      }
      </ul>
    </div>
  }
}