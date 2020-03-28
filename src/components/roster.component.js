import React, { Component } from 'react'

export default class HomePage extends Component {
    render() {
        const { name } = this.props.match.params
        return (
            <div className="container">
               <h2>{ name }'s Roster  </h2>
            </div>
        )
    }
}

