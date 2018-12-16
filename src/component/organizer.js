const { Link } = window.ReactRouterDOM
const img = {
  carrot: './img/carrot.svg',
  lock: './img/lock.svg',
}

class Organizer extends React.Component {

  state = {
    counts: {}
  }

  componentWillMount() {
    this.refreshCounts()
  }

  // note: the value in the payload for "done" would be `completedAt`
  // however, since they are all null, I won't refer to it and use the design made for sql and api
  refreshCounts() {
    let counts = {}

    for(let id in this.props.tasks) {
      let task = this.props.tasks[id],
        group = task.group,
        one = (+task.done||0)

      if(!counts[group])
        counts[group] = {done: 0, total: 0}

      counts[group].done += one
      ++counts[group].total
    }

    this.setState({
      counts
    })
  }

  render() {
    const {
      tags,
    } = this.props

    return <div className="d-flex flex-column m-2">
      <h3>Things To Do</h3>
      <hr/>
      {
        tags.map(tag => {
          let counts = this.state.counts[tag]

          return <React.Fragment key={`tag-${tag}`}>
            <Link className="d-flex m-2" to={`tag-group/${tag}`}>
              <img className="p-4" src={img.carrot}/>
              <div>
                <h4>{tag}</h4>
                <span className="text-secondary">{`${counts.done} of ${counts.total} COMPLETE`}</span>
              </div>
            </Link>
            <hr/>
          </React.Fragment>
        })
      }
    </div>
  }
}