
export function ListItem(props) {

    //set state variables after receiving props
        return (
            <div className='listitem-container' onClick = {(e) => props.opsCallback(props.item_id)}>
                <p className='listitem-left-col'>{props.item_id}</p>
                <p className='listitem-middle-col'>{props.item_name}</p>
                <p className='listitem-right-col'>{props.item_sku_id}</p>
            </div>
        );
}