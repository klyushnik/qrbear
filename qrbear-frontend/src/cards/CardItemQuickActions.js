import React from "react";

export class CardItemQuickActions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.data.id,
            item_upc: this.props.data.item_upc,
            item_name: this.props.data.item_name,
            item_desc: this.props.data.item_desc,
            item_alt_id: this.props.data.item_alt_id === undefined ? 'n/a' : this.props.data.item_alt_id,
            item_wholesale: this.props.data.item_wholesale,
            item_sale_price: this.props.data.item_sale_price,

            //rather than contacting the database for new data, let's save a local copy of the state with editData(), and restore it with cancelEdit().
            //this will be overwritten in commitEdit() after DB contact, and in editData() before entering edit mode.
            //this will be used to restore edit fields to their original text in cancelEdit(), since the state is modified in onChange().
            //this is a temp measure, though.
            undoState: {
                id: -1,
                item_upc: '',
                item_name: '',
                item_desc: '',
                item_alt_id: '',
                item_wholesale: '',
                item_sale_price: '',
            },

            readonly: true,
            isUpdating: false
        }
        this.editData = this.editData.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.commitEdit = this.commitEdit.bind(this);
    }

    editData(){
        //set inputs to editable, set cancel/commit buttons visibility
        this.setState({readonly: false});
        
    }

    cancelEdit(){
        //set inputs to readonly, reload state from props
        this.setState({readonly: true});
    }

    commitEdit(){
        //set inputs to readonly, update state, commit changes to database, THEN this.forceUpdate() to reload
        this.setState({readonly: true});
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
                        <input name="it_id" type='text' defaultValue = '0'></input>
                    </div>
                    <h3>or</h3>               
                    <div>
                        <label htmlFor="it_altid">Home ID:</label><br/>
                        <input name="it_altid" type='text' defaultValue = '0'></input>
                    </div>
                    <div>
                        <label htmlFor="it_altid">Count:</label><br/>
                        <input name="it_altid" type='text' defaultValue = '0'></input>
                    </div>
                </div>
                <div className='row'>     
                    <div>
                        <label htmlFor="it_upc">To: Bin ID:</label><br/>
                        <input name="it_upc" type='text' defaultValue = '0'></input>
                    </div>
                    <h3>or</h3> 
                    <div>
                        <label htmlFor="it_name">Home ID:</label><br/>
                        <input name="it_name" type='text' defaultValue = '0'></input>
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
                            <input name="it_desc" type='text' defaultValue = '0'></input>
                        </div>
                        <div>
                            <label htmlFor="it_desc">To: Home ID:</label><br/>
                            <input name="it_desc" type='text' defaultValue = '0'></input>
                        </div>
                        <div>
                            <label htmlFor="it_wholesale">Count:</label><br/>
                            <input name="it_wholesale" type='text' defaultValue = '0'></input>
                        </div>
                        <button className='greenbtn' onClick={() =>{ alert("Success!\nAdded a few items to bin 1.") }}>Add Items</button> 
                    </div>
                    <div className='card-inside'>
                        <h2>Remove items</h2>
                        <div>
                            <label htmlFor="it_desc">From: Bin ID:</label><br/>
                            <input name="it_desc" type='text' defaultValue = '0'></input>
                        </div>
                        <div>
                            <label htmlFor="it_desc">From: Home ID:</label><br/>
                            <input name="it_desc" type='text' defaultValue = '0'></input>
                        </div>
                        <div>
                            <label htmlFor="it_wholesale">Count:</label><br/>
                            <input name="it_wholesale" type='text' defaultValue = '0'></input>
                        </div>
                        <button className='redbtn'>Remove Items</button> 
                    </div>
                </div>
                    

            </div>
        );
    }
}