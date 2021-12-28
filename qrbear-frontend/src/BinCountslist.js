import {ListItem} from './ListItem'


export function BinCountsListContainer(props){
    return (        
        <div className = 'reslist-container'>
            <div className='reslist-header-container'>
                <label id='reslist-id'>Bin ID</label>
                <label>Bin Name</label>
                <label id='reslist-upc'>Counts</label>
                </div>
            {props.items.map((item, index) => {
                // return <ListItem bin_id={item.bin_id} opsCallback = {props.opsCallback} key = {item.bin_id} bin_name = {item.bin_name}/>
                return <ListItem item_id={item.bin_id} opsCallback = {props.callback} key = {item.bin_id} item_name = {item.bin_name} item_sku_id = {item.item_count} />
            })}
        </div>
    );
}
