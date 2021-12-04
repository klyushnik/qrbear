import {ListItem} from './ListItem'

export function ResListContainer(props){
    return (        
        <div className = 'reslist-container'>
            <div className='reslist-header-container'>
                <label id='reslist-id'>ID</label>
                <label>Name</label>
                <label id='reslist-upc'>UPC</label>
                </div>
            {props.items.map((item, index) => {
                /* mock_index is used for fetching data from MOCK_DATA, so it will correspond to the item clicked. Replace with key so that it will fetch from DB instead. */
                return <ListItem mock_index={index} opsCallback = {props.opsCallback} key = {item.id} name = {item.item_name} upc = {item.item_upc} />
            })}
        </div>
    );
}
