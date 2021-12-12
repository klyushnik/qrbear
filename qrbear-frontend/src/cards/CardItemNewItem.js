import { useEffect, useState } from 'react';
export function CardItemNewItem (props) {

    const [itemName, setItemName] = useState('');
    const [itemDesc, setItemDesc] = useState('');
    const [itemUpc, setItemUpc] = useState(0);
    const [itemSkuId, setItemSkuId] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemSaleprice, setItemSaleprice] = useState(0.0);

    const priviligesCheck = () => {
        //this will check the login config for role priviliges
        return true;
    }

    useEffect(() =>{
        refreshSKU();
    }, []);

    const refreshSKU = () => {
        fetch('/next/items')
        .then(response => {
            response.json()
            .then(json => {
                if(json[0].AUTO_INCREMENT !== undefined){
                    setItemSkuId('SKU' + String(json[0].AUTO_INCREMENT).padStart(6, '0'));
                }
            })
        });
    }

    const reset = () =>{
        setItemName('');
        setItemDesc('');
        setItemUpc(0);
        setItemCategory('');
        setItemSaleprice(0.00);
    }

    const addNewItem = () => {
        let request = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                item_upc: itemUpc,
                item_name: itemName,
                item_desc: itemDesc,
                item_sku_id: itemSkuId,
                item_category: itemCategory,
                item_saleprice: itemSaleprice
            })
        };
        fetch('/additem', request)
            .then(response => {
                if(response.ok){
                    props.callback();
                }
            });
    }

    return (
        <div className='card-container'>
            <h2>Add new item</h2>
            {!priviligesCheck() ? 
            <h3>You do not have sufficient priviliges to add a new item</h3> :
            <div>
                
                <div>
                    <label htmlFor="item_name">Item name:</label><br/>
                    <input name="item_name" type='text' value = {itemName} onChange = {e => setItemName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="item_desc">Item description:</label><br/>
                    <input name="item_desc" type='text' value = {itemDesc} onChange = {e => setItemDesc(e.target.value)}></input>
                </div>
                <div className='row'>   
                <div>
                    <label htmlFor="item_upc">Item UPC:</label><br/>
                    <input name="item_upc" type='number' value = {itemUpc} onChange = {e => setItemUpc(parseInt(e.target.value))}></input>
                </div>
                <div>
                    <label htmlFor="item_sku_id">Item SKU (auto):</label><br/>
                    <input name="item_sku_id" type='text' readOnly = {true} value = {itemSkuId} onChange = {e => setItemSkuId(e.target.value)}></input>
                </div> 
                <div className='column-bottom'>  
                <button onClick={refreshSKU}>Refresh SKU</button>
                </div>
                </div>
                <div className='row'>
                <div>
                    <label htmlFor="item_category">Category:</label><br/>
                    <input name="item_category" type='text' value = {itemCategory} onChange = {e => setItemCategory(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="item_saleprice">Sale price:</label><br/>
                    <input name="item_saleprice" type='number' value = {itemSaleprice} onChange = {e => setItemSaleprice(parseInt(e.target.value))}></input><br/>
                </div>
                </div>
                <div className='row'>
                    <button className='greenbtn' onClick={addNewItem}>Add Item</button>
                    <button className='redbtn' onClick={reset}>Reset</button>
                </div>
            </div>
            }
        </div>
    );
}