import React from "react";
import QRCode from "react-qr-code";

export class CardItemCounts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
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