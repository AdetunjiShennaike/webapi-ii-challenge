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
    axios.get('/api/posts')

  }

}

export default Display