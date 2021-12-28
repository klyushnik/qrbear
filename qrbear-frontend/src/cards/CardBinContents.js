import React from "react";
import QRCode from "react-qr-code";
import { BinItemListContainer } from "../BinItemlist";
import {ListBin} from '../ListBin'

export class CardBinContents extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item_sku_id: '',
            readonly: true,
            isUpdating: false,
            item_id: 0,
            item_count: 0
        }
        this.setItem = this.setItem.bind(this);
        this.updateCounts = this.updateCounts.bind(this);
    }

    setItem(id){
        this.setState({item_id: id});
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            let id = this.props.items.length === 0 ? -1 : this.props.items[0].item_id;
            this.setState({item_id: id});
        }
    }

    updateCounts(){
        let request = {
            method: 'PUT',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                bin_id: this.props.bin_id,
                item_id: this.state.item_id,
                item_count: this.state.item_count
            })
        };
        fetch('/updatecounts', request)
            .then(response => {
                if(response.ok){
                    this.props.callback(this.props.bin_id);
                } else {
                    alert('There was a problem processing you request.');
                }
            });
    }

    //append it_ prefix to avoid browser autocomplete
    render(){
        return (
            <div className='card-container-grid'>
                <h2 className='card-title'>Bin contents</h2>
                <div className = 'card-leftpanel-wrapper'>
                     <div className='fuck'>
                        <BinItemListContainer items = {this.props.items} opsCallback = {this.setItem} />
                        
                    </div>
                    
                </div>

                <div className='card-rightpanel-wrapper'>
                    <h2>{'Item ' + this.state.item_id}</h2>
                    <div className='card-qrcode-wrapper'>
                    <QRCode value = {this.state.item_id} size = {150} />
                    </div>
                    <label>Item count:</label>
                    <input type='number' value = {this.state.item_count} onChange={(e) => {this.setState({item_count: e.target.value})}}></input>
                    <button className="rightpanel-btn" onClick={this.updateCounts}>Update count</button>
                    <button className="rightpanel-btn-red">Remove</button>
                </div>
            </div>
        );
    }
}