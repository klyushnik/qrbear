import {ListBin} from './ListBin'


export function BinListContainer(props){
    return (        
        <div className = 'reslist-container'>
            <div className='reslist-header-container'>
                <label id='reslist-id'>ID</label>
                <label>Name</label>
                <label id='reslist-upc'>Desc</label>
                </div>
            {props.items.map((item, index) => {
                return <ListBin bin_id={item.bin_id} opsCallback = {props.opsCallback} key = {item.bin_id} bin_name = {item.bin_name}/>
            })}
        </div>
    );
}
