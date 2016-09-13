import React, { PropTypes, Component } from 'react'

export default class Notification extends Component {
  componentWillMount() {
    this.close(this.props.message)
  }

  componentWillUpdate(next) {
    this.close(next.message)
  }

  close(message) {
    const { onClose } = this.props
    if (message !== '') {
      setTimeout(onClose, 5000)
    }
  }

  render() {
    return (
      <div>
        {this.props.message !== '' &&
          <div style={{ top: 0, right: 0, position: 'fixed', margin: 5, zIndex: 1050 }}>
            <div className="alert alert-info">
              {this.props.message}
            </div>
          </div>
        }
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}
