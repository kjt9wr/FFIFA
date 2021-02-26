import React, { Component } from 'react'
import * as DatabaseService from '../Services/DatabaseService';

export default class CapTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owners: [],
        };
    }
    componentDidMount = () => {
        this.getOwnerInfo();
    }

    getOwnerInfo = async () => {
        const owners = await DatabaseService.getOwnersFromDB();
        this.setState({ owners })
    }

    displayCapTable = () => { 
        return <table className='table'>
            <thead className='thead-light'>
                <tr>
                    <th></th>
                    {this.state.owners.map(owner => <th>{owner.name}</th>)}
                </tr>
            </thead>
        <tbody>
            <tr> 
                <td>Cap</td>
                {this.state.owners.map(owner => <td>{owner.cap[1]}</td>)}
            </tr>
        </tbody>
      </table>
    }

    render() {
        return (
            <div className="container">
               <h2 class="text-center">Cap Tracker </h2>
               {this.displayCapTable()}
            </div>
        )
    }
}

