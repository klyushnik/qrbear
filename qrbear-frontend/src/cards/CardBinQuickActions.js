import React from "react";

export class CardBinQuickActions extends React.Component{
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
            <div className='card-container'>
                <h2 className='card-title'>Quick actions</h2>
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