import React from "react";

export class CardItemQuickActions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isUpdating: false,
            add_bin_id: 0,
            add_home_id: 0,
            add_count: 0,
            remove_bin_id: 0, 
            remove_home_id: 0,
            remove_count: 0,
            transfer_from_bin_id: 0,
            transfer_from_home_id: 0,
            transfer_to_bin_id: 0, 
            transfer_to_home_id: 0,
            transfer_count: 0
        }
        this.addToBin = this.addToBin.bind(this);
        this.cancelEdit = this.removeFromBin.bind(this);
        this.commitEdit = this.transferItems.bind(this);
    }

    addToBin(){
        //set inputs to editable, set cancel/commit buttons visibility
        let request = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                bin_id: this.state.add_bin_id,
                item_id: this.props.item_id,
                item_count: this.state.add_count
            })
        };
        fetch('/addtobin', request)
            .then(response => {
                if(response.ok){
                    this.props.callback();
                }
            });
    }

    removeFromBin(){
        //set inputs to readonly, reload state from props

    }

    transferItems(){
        //set inputs to readonly, update state, commit changes to database, THEN this.forceUpdate() to reload
        
    }


    //append it_ prefix to avoid browser autocomplete
    render(){
        return (
            <div className='quickactions-container'>
                <h2 className='card-title'>Quick actions</h2>
                <div className='card-inside'>
                <h2>Transfer items</h2>
                <div className='row'>
                    <div>
                        <label htmlFor="it_id">From: Bin ID:</label><br/>
                        <input name="it_id" type='number' value = {this.state.transfer_from_bin_id} onChange={e => {this.setState({transfer_from_bin_id: e.target.value})}}></input>
                    </div>
                    <h3>or</h3>               
                    <div>
                        <label htmlFor="it_altid">Home ID:</label><br/>
                        <input name="it_altid" readOnly={true} type='number' value = {this.state.transfer_from_home_id} onChange={e => {this.setState({transfer_from_home_id: e.target.value})}}></input>
                    </div>
                    <div>
                        <label htmlFor="it_altid">Count:</label><br/>
                        <input name="it_altid" type='number' value = {this.state.transfer_count} onChange={e => {this.setState({transfer_count: e.target.value})}}></input>
                    </div>
                </div>
                <div className='row'>     
                    <div>
                        <label htmlFor="it_upc">To: Bin ID:</label><br/>
                        <input name="it_upc" type='number' value = {this.state.transfer_to_bin_id} onChange={e => {this.setState({transfer_to_bin_id: e.target.value})}}></input>
                    </div>
                    <h3>or</h3> 
                    <div>
                        <label htmlFor="it_name">Home ID:</label><br/>
                        <input name="it_name" readOnly={true} type='number' value = {this.state.transfer_to_home_id} onChange={e => {this.setState({transfer_to_home_id: e.target.value})}}></input>
                    </div>
                     
                </div>
                <button>Transfer Items</button> 
                </div>
                <div className='spacer' />
                <div className='row'>
                    <div className='card-inside'>
                        <h2>Add items</h2>
                        <div>
                            <label htmlFor="it_desc">To: Bin ID:</label><br/>
                            <input name="it_desc" type='number' value = {this.state.add_bin_id} onChange={e => {this.setState({add_bin_id: e.target.value})}}></input>
                        </div>
                        <div>
                            <label htmlFor="it_desc">To: Home ID:</label><br/>
                            <input name="it_desc" readOnly={true} type='number' value = {this.state.add_home_id} onChange={e => {this.setState({add_home_id: e.target.value})}}></input>
                        </div>
                        <div>
                            <label htmlFor="it_wholesale">Count:</label><br/>
                            <input name="it_wholesale" type='number' value = {this.state.add_count} onChange={e => {this.setState({add_count: e.target.value})}}></input>
                        </div>
                        <button className='greenbtn' onClick={this.addToBin}>Add Items</button> 
                    </div>
                    <div className='card-inside'>
                        <h2>Remove items</h2>
                        <div>
                            <label htmlFor="it_desc">From: Bin ID:</label><br/>
                            <input name="it_desc" type='number' value = {this.state.remove_bin_id} onChange={e => {this.setState({remove_bin_id: e.target.value})}}></input>
                        </div>
                        <div>
                            <label htmlFor="it_desc">From: Home ID:</label><br/>
                            <input name="it_desc" readOnly={true} value = {this.state.remove_home_id} onChange={e => {this.setState({remove_home_id: e.target.value})}}></input>
                        </div>
                        <div>
                            <label htmlFor="it_wholesale">Count:</label><br/>
                            <input name="it_wholesale" type='number' value = {this.state.remove_count} onChange={e => {this.setState({remove_count: e.target.value})}}></input>
                        </div>
                        <button className='redbtn'>Remove Items</button> 
                    </div>
                </div>
                    

            </div>
        );
    }
}