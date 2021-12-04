import React from "react";
import QRCode from "react-qr-code";

export class CardItemInfo extends React.Component{
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
            <div className='card-container-grid'>
                <h2 className='card-title'>Item information</h2>
                <div className = 'card-leftpanel-wrapper'>
                    <div>
                        <label htmlFor="it_id">Item ID (auto):</label><br/>
                        <input name="it_id" type='text' readOnly = {true} defaultValue = {this.props.data.item_id}></input>
                    </div>               
                    <div>
                        <label htmlFor="it_altid">Item SKU:</label><br/>
                        <input name="it_altid" type='text' readOnly = {this.state.readonly} defaultValue = {this.props.data.item_sku_id}></input>
                    </div>           
                    <div>
                        <label htmlFor="it_upc">Item UPC:</label><br/>
                        <input name="it_upc" type='text' readOnly = {this.state.readonly} defaultValue = {this.props.data.item_upc}></input>
                    </div>
                    <div>
                        <label htmlFor="it_name">Item name:</label><br/>
                        <input name="it_name" type='text' readOnly = {this.state.readonly} defaultValue = {this.props.data.item_name}></input>
                    </div>
                    <div>
                        <label htmlFor="it_desc">Item description:</label><br/>
                        <input name="it_desc" type='text' readOnly = {this.state.readonly} defaultValue = {this.props.data.item_desc}></input>
                    </div>
                    <div>
                        <label htmlFor="it_wholesale">Category:</label><br/>
                        <input name="it_wholesale" type='text' readOnly = {this.state.readonly} defaultValue = {this.props.data.item_category}></input>
                    </div>
                    <div>
                        <label htmlFor="it_saleprice">Sale price:</label><br/>
                        <input name="it_saleprice" type='text' readOnly = {this.state.readonly} defaultValue = {this.props.data.item_saleprice}></input><br/>
                    </div>
                </div>

                <div className='card-rightpanel-wrapper'>
                    <h2>Item QR:</h2>
                    <div className='card-qrcode-wrapper'>
                        <QRCode value = {this.props.data.item_sku_id === undefined ? '' : this.props.data.item_sku_id} size = {150} />
                    </div>
                    <button id='editbtn' onClick = {this.editData} style={{visibility: this.state.readonly ? 'visible' : 'hidden'}} className='rightpanel-btn'>Edit Item</button>
                    <button id='commitbtn' onClick = {this.commitEdit} style={{visibility: this.state.readonly ? 'hidden' : 'visible'}} className='rightpanel-btn-green'>Commit Changes</button>
                    <button id='cancelbtn' onClick = {this.cancelEdit} style={{visibility: this.state.readonly ? 'hidden' : 'visible'}} className='rightpanel-btn-red'>Cancel</button>
                </div>
            </div>
        );
    }
}