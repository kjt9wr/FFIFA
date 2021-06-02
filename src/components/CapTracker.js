import React, { Component } from 'react'
import * as DatabaseService from '../Services/DatabaseService';

export default class CapTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owners: [],
            year: 1
        };
    }
    componentDidMount = () => {
        this.getOwnerInfo();
    }

    getOwnerInfo = async () => {
        const { year } = this.props.match.params
        const owners = await DatabaseService.getOwnersFromDB();
        this.setState({ owners, year })
    }

    displayCapTable = (yearIndex) => { 
        return <table className='table' >
            <thead className='thead-light'>
                <tr>
                    <th></th>
                    {this.state.owners.map(owner => <th>{owner.name}</th>)}
                </tr>
            </thead>
        <tbody>
            <tr> 
                <td>{2020 + parseInt(yearIndex)}</td>
                {this.state.owners.map(owner => <td>{owner.cap[yearIndex]}</td>)}
            </tr>
        </tbody>
      </table>
    }

    changeYear = (year) => {
        console.log(year);
    }
    render() {
        return (
            <div className="container">
               <h2 class="text-center">Cap Tracker </h2>
               {this.displayCapTable(this.state.year)}
               <div class="btn-group" role="group">
                    <button type="button" class="btn btn-secondary" onClick={this.changeYear(0)}>2020</button>
                    <button type="button" class="btn btn-secondary" onClick={this.changeYear(1)}>2021</button>
                    <button type="button" class="btn btn-secondary" onClick={this.changeYear(2)}>2022</button>
                </div>
            </div>
        )
    }
}

