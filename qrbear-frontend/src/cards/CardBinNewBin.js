import { useEffect, useState } from 'react';
export function CardBinNewBin (props) {

    const [binName, setBinName] = useState('');
    const [binDesc, setBinDesc] = useState('');

    const priviligesCheck = () => {
        //this will check the login config for role priviliges
        return true;
    }

    const reset = () =>{
        setBinName('');
        setBinDesc('');
    }

    const addNewItem = () => {
        let request = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                bin_name: binName,
                bin_desc: binDesc,
            })
        };
        fetch('/addbin', request)
            .then(response => {
                if(response.ok){
                    props.callback();
                }
            });
    }

    return (
        <div className='card-container'>
            <h2>Add new bin</h2>
            {!priviligesCheck() ? 
            <h3>You do not have sufficient priviliges to add a new bin</h3> :
            <div>
                
                <div>
                    <label htmlFor="item_name">Bin name:</label><br/>
                    <input name="item_name" type='text' value = {binName} onChange = {e => setBinName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="item_desc">Bin description:</label><br/>
                    <input name="item_desc" type='text' value = {binDesc} onChange = {e => setBinDesc(e.target.value)}></input>
                </div>
                <div className='row'>
                    <button className='greenbtn' onClick={addNewItem}>Add Bin</button>
                    <button className='redbtn' onClick={reset}>Reset</button>
                </div>
            </div>
            }
        </div>
    );
}