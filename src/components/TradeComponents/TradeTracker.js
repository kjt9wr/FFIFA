import React, { Component } from 'react'
import * as DatabaseService from '../../Services/DatabaseService';
import * as Constants from '../../Utilities/Constants';
import TradeDetails from './TradeDetails';

export default class TradeTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tradeList: [],
            players: []
        };
    }

    render() {
        return (
            <div className="container">
               <p>Trades Page</p>
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
            return <TradeDetails 
                      currentTrade={currentTrade}
                    />;
          })
      }
}
