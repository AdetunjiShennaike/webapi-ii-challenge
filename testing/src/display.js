import React from 'react'

import axios from 'axios'

class Display extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }


  componentDidMount() {
    axios.get('http://localhost:4000/api/posts')
    .then( res => {
      this.setState({
        data: res.data
      })
    })
    .catch( err => {
      return err
    })
  }

  render() {
    return(
      <div>
        {this.state.data.map( event => {
          return <div>
            <p>{event.id}</p>
            <p>{event.contents}</p>
            <p>{event.title}</p>
          </div>
        })}
      </div>
    )
  }
}

export default Display