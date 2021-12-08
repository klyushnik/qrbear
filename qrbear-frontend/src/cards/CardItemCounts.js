import React from "react";
import QRCode from "react-qr-code";

export class CardItemCounts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.data.id,
            item_upc: this.props.data.item_upc,
            item_name: this.props.data.item_name,
            item_desc: this.props.data.item_desc,
            item_alt_id: this.props.data.item_sku_id === undefined ? 'n/a' : this.props.data.item_sku_id,
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
                <h2 className='card-title'>Counts</h2>
                <div className = 'card-leftpanel-wrapper'>
                    <label>Bin counts:</label>
                    <div className='card-inside'>
                        <p>This item is not found in any bins.</p>
                    </div>
                    <label>Sales floor counts:</label>
                    <div className='card-inside'>
                        <p>This item is not on the sales floor.</p>
                    </div>

                </div>

                <div className='card-rightpanel-wrapper'>
                    <h2>Bin/Home QR:</h2>
                    <div className='card-qrcode-wrapper'>
                        <QRCode value = {this.props.data.item_sku_id === undefined ? '' : this.props.data.item_sku_id} size = {150} />
                    </div>
                    
                </div>
            </div>
        );
    }
}