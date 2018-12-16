class Task extends React.Component {

  toggle(e) {
    this.props.onChange(!this.props.task.done)
  }

  render() {
    const {
      name,
      done,
      ready,
    } = this.props.task

    const className = {
      name: `
       font-weight-bold 
       ${done && 'strikethrough'}
       ${!ready && 'text-muted'}
      `,
      checkbox: `pretty p-toggle ${ready ? 'p-default': 'p-svg'}`,
      on: `state p-on ${(done&&ready) && 'p-success'}`,
      off: "state p-off",
    }

    return <React.Fragment>
      <div className={`form-check`}>

      <div className={className.checkbox}>
        <input
          disabled={!ready}
          type="checkbox"
          checked={!!done}
          onChange={this.toggle.bind(this)}
          className="form-check-input"
        />
        <div className={className.on}>
          {(!ready) && <img className="svg" src={img.lock} />}
          <label className={className.name}>{name}</label>
        </div>
        <div className={className.off}>
          {(!ready) && <img className="svg" src={img.lock} />}
          <label className={className.name}>{name}</label>
        </div>

      </div>
      </div>
      <hr/>
    </React.Fragment>
  }
}