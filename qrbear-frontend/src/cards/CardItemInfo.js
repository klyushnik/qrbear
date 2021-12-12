import React from "react";
import QRCode from "react-qr-code";

export class CardItemInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item_id: 0,
            item_upc: 0,
            item_name: '',
            item_desc: '',
            item_sku_id: 'n/a',
            item_category: '',
            item_saleprice: 0.0,

            //rather than contacting the database for new data, let's save a local copy of the state with editData(), and restore it with cancelEdit().
            //this will be overwritten in commitEdit() after DB contact, and in editData() before entering edit mode.
            //this will be used to restore edit fields to their original text in cancelEdit(), since the state is modified in onChange().
            //this is a temp measure, though.
            undoState: {
                def_item_id: 0,
                def_item_upc: 0,
                def_item_name: '',
                def_item_desc: '',
                def_item_sku_id: 'n/a',
                def_item_category: '',
                def_item_saleprice: 0.0
            },

            readonly: true,
            isUpdating: false
        }
        this.editData = this.editData.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.commitEdit = this.commitEdit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    editData(){
        //set inputs to editable, set cancel/commit buttons visibility
        this.setState({readonly: false});
        this.setState({
            undoState: {
                def_item_id: this.state.item_id,
                def_item_upc: this.state.item_upc,
                def_item_name: this.state.item_name,
                def_item_desc: this.state.item_desc,
                def_item_sku_id: this.state.item_sku_id,
                def_item_category: this.state.item_category,
                def_item_saleprice: this.state.item_saleprice
            }
        });
    }

    cancelEdit(){
        //set inputs to readonly, reload state from undoState
        this.setState({readonly: true});
        this.setState({
            item_id: this.state.undoState.def_item_id,
            item_upc: this.state.undoState.def_item_upc,
            item_name: this.state.undoState.def_item_name,
            item_desc: this.state.undoState.def_item_desc,
            item_sku_id: this.state.undoState.def_item_sku_id,
            item_category: this.state.undoState.def_item_category,
            item_saleprice: this.state.undoState.def_item_saleprice
        });
    }

    commitEdit(){
        let request = {
            method: 'PUT',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                item_upc: this.state.item_upc,
                item_name: this.state.item_name,
                item_desc: this.state.item_desc,
                item_sku_id: this.state.item_sku_id,
                item_category: this.state.item_category,
                item_saleprice: this.state.item_saleprice,
                item_id: this.state.item_id
            })
        };
        fetch('/updateitem', request)
            .then(response => {
                if(response.ok){
                    this.setState({readonly: true});
                } else {
                    this.setState({readonly: true});
                    alert('There was a problem processing you request.');
                }
            })
            .then(this.props.callback(this.state.item_id));
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name] : value
        });
    }


    componentDidMount(){
        if(this.props.item_id != -1){
            this.fetchItem(this.props.item_id);
        }
    }

    componentDidUpdate(propsPrev){
        if(propsPrev.item_id != this.props.item_id){
            this.fetchItem(this.props.item_id);
        }
    }

    fetchItem(item_id){
        let data = {};
        fetch("/item/" + item_id)
        .then((res) => res.json())
        .then((json) => {
            data = json[0];
            if(typeof(data.item_id) === 'undefined') return;
            this.setState({
                item_id: parseInt(data.item_id),
                item_upc: parseInt(data.item_upc),
                item_name: data.item_name,
                item_desc: data.item_desc,
                item_sku_id: data.item_sku_id,
                item_category: data.item_category,
                item_saleprice: parseFloat(data.item_saleprice)
            });
        });
    }

    //append it_ prefix to avoid browser autocomplete
    render(){
        return (
            <div className='card-container-grid'>
                <h2 className='card-title'>Item information</h2>
                <div className = 'card-leftpanel-wrapper'>
                    <div>
                        <label htmlFor="item_id">Item ID (auto):</label><br/>
                        <input name="item_id" type='text' readOnly = {true} value = {this.state.item_id} onChange={this.handleInputChange}></input>
                    </div>               
                    <div>
                        <label htmlFor="item_sku_id">Item SKU:</label><br/>
                        <input name="item_sku_id" type='text' readOnly = {true} value = {this.state.item_sku_id} onChange={this.handleInputChange}></input>
                    </div>           
                    <div>
                        <label htmlFor="item_upc">Item UPC:</label><br/>
                        <input name="item_upc" type='number' readOnly = {this.state.readonly} value = {this.state.item_upc} onChange={this.handleInputChange}></input>
                    </div>
                    <div>
                        <label htmlFor="item_name">Item name:</label><br/>
                        <input name="item_name" type='text' readOnly = {this.state.readonly} value = {this.state.item_name} onChange={this.handleInputChange}></input>
                    </div>
                    <div>
                        <label htmlFor="item_desc">Item description:</label><br/>
                        <input name="item_desc" type='text' readOnly = {this.state.readonly} value = {this.state.item_desc} onChange={this.handleInputChange}></input>
                    </div>
                    <div>
                        <label htmlFor="item_category">Category:</label><br/>
                        <input name="item_category" type='text' readOnly = {this.state.readonly} value = {this.state.item_category} onChange={this.handleInputChange}></input>
                    </div>
                    <div>
                        <label htmlFor="item_saleprice">Sale price:</label><br/>
                        <input name="item_saleprice" type='number' readOnly = {this.state.readonly} value = {this.state.item_saleprice} onChange={this.handleInputChange}></input><br/>
                    </div>
                </div>

                <div className='card-rightpanel-wrapper'>
                    <h2>Item QR:</h2>
                    <div className='card-qrcode-wrapper'>
                        <QRCode value = {this.state.item_sku_id} size = {150} />
                    </div>
                    <button id='editbtn' onClick = {this.editData} style={{visibility: this.state.readonly ? 'visible' : 'hidden'}} className='rightpanel-btn'>Edit Item</button>
                    <button id='commitbtn' onClick = {this.commitEdit} style={{visibility: this.state.readonly ? 'hidden' : 'visible'}} className='rightpanel-btn-green'>Apply Changes</button>
                    <button id='cancelbtn' onClick = {this.cancelEdit} style={{visibility: this.state.readonly ? 'hidden' : 'visible'}} className='rightpanel-btn-red'>Cancel</button>
                </div>
            </div>
        );
    }
}