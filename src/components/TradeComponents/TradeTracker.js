import React, { Component } from 'react'
import * as DatabaseService from '../../Services/DatabaseService';
import TradeDetails from './TradeDetails';

export default class TradeTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tradeList: []
        };
    }

    render() {
        return (
            <div className="container">
               <h2 class="text-center"> Trade Tracker </h2>
               {this.displayTrades()}
            </div>
        )
    }

    componentDidMount = () => {
        this.getTrades();
    }

    getTrades = async () => {
        const tradeList = await DatabaseService.getTradesFromDB();
        this.setState({
            tradeList,
        })
    }

    displayTrades = () => {
        return this.state.tradeList.map(currentTrade => {
            return <TradeDetails currentTrade={currentTrade} />;
        })
    }
}
