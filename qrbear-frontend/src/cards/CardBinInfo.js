import React from "react";
import QRCode from "react-qr-code";

export class CardBinInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bin_id: 0,
            bin_name: '',
            bin_desc: '',

            //rather than contacting the database for new data, let's save a local copy of the state with editData(), and restore it with cancelEdit().
            //this will be overwritten in commitEdit() after DB contact, and in editData() before entering edit mode.
            //this will be used to restore edit fields to their original text in cancelEdit(), since the state is modified in onChange().
            //this is a temp measure, though.
            undoState: {
                def_bin_id: 0,
                def_bin_name: '',
                def_bin_desc: ''
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
                def_bin_id: this.state.bin_id,
                def_bin_name: this.state.bin_name,
                def_bin_desc: this.state.bin_desc
            }
        });
    }

    cancelEdit(){
        //set inputs to readonly, reload state from undoState
        this.setState({readonly: true});
        this.setState({
            bin_id: this.state.undoState.def_bin_id,
            bin_name: this.state.undoState.def_bin_name,
            bin_desc: this.state.undoState.def_bin_desc,
        });
    }

    commitEdit(){
        let request = {
            method: 'PUT',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                bin_name: this.state.bin_name,
                bin_desc: this.state.bin_desc,
                bin_id: this.state.bin_id
            })
        };
        fetch('/updatebin', request)
            .then(response => {
                if(response.ok){
                    this.setState({readonly: true});
                } else {
                    this.setState({readonly: true});
                    alert('There was a problem processing you request.');
                }
            })
            .then(this.props.callback(this.state.bin_id));
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
        if(this.props.bin_id != -1){
            this.fetchItem(this.props.bin_id);
        }
    }

    componentDidUpdate(propsPrev){
        if(propsPrev.bin_id != this.props.bin_id){
            this.fetchItem(this.props.bin_id);
        }
        console.log(this.state.bin_id);
    }

    fetchItem(bin_id){
        let data = {};
        fetch("/bin/" + bin_id)
        .then((res) => res.json())
        .then((json) => {
            data = json[0];
            if(typeof(data.bin_id) === 'undefined') return;
            this.setState({
                bin_id: parseInt(data.bin_id),
                bin_name: data.bin_name,
                bin_desc: data.bin_desc,
            });
        });
    }

    //append it_ prefix to avoid browser autocomplete
    render(){
        return (
            <div className='card-container-grid'>
                <h2 className='card-title'>Bin information</h2>
                <div className = 'card-leftpanel-wrapper'>
                    <div>
                        <label htmlFor="bin_id">Bin ID (auto):</label><br/>
                        <input name="bin_id" type='text' readOnly = {true} value = {this.state.bin_id} onChange={this.handleInputChange}></input>
                    </div>               
                    <div>
                        <label htmlFor="bin_name">Bin name:</label><br/>
                        <input name="bin_name" type='text' readOnly = {this.state.readonly} value = {this.state.bin_name} onChange={this.handleInputChange}></input>
                    </div>
                    <div>
                        <label htmlFor="bin_desc">Bin description:</label><br/>
                        <input name="bin_desc" type='text' readOnly = {this.state.readonly} value = {this.state.bin_desc} onChange={this.handleInputChange}></input>
                    </div>
                </div>

                <div className='card-rightpanel-wrapper'>
                    <h2>Bin QR:</h2>
                    <div className='card-qrcode-wrapper'>
                        <QRCode value = {this.state.bin_id} size = {150} />
                    </div>
                    <button id='editbtn' onClick = {this.editData} style={{visibility: this.state.readonly ? 'visible' : 'hidden'}} className='rightpanel-btn'>Edit Item</button>
                    <button id='commitbtn' onClick = {this.commitEdit} style={{visibility: this.state.readonly ? 'hidden' : 'visible'}} className='rightpanel-btn-green'>Apply Changes</button>
                    <button id='cancelbtn' onClick = {this.cancelEdit} style={{visibility: this.state.readonly ? 'hidden' : 'visible'}} className='rightpanel-btn-red'>Cancel</button>
                </div>
            </div>
        );
    }
}