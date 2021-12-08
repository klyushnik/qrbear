import {ListItem} from './ListItem'

export function ResListContainer(props){
    return (        
        <div className = 'reslist-container'>
            <div className='reslist-header-container'>
                <label id='reslist-id'>ID</label>
                <label>Name</label>
                <label id='reslist-upc'>SKU</label>
                </div>
            {props.items.map((item, index) => {
                
                return <ListItem item_id={item.item_id} opsCallback = {props.opsCallback} key = {item.item_id} item_name = {item.item_name} item_sku_id = {item.item_sku_id} />
            })}
        </div>
    );
}
