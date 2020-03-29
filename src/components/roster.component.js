import React, { Component } from 'react'
import axios from 'axios';


export default class Roster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: null
        };
      }
      
    // Get Owner from DB
    componentDidMount() {
        axios.get('http://localhost:5000/owner/')
          .then(response => {
            const { name } = this.props.match.params
            const owner = response.data.find(curruser => name === curruser.name);
            this.setState({owner})
          })
          .catch((error) => {
            console.log(error);
          })
      }

    render() {
        const { name } = this.props.match.params
        return (
            <div className="container">
               <h2>{ name }'s Roster  </h2>
            </div>
        )
    }
}

