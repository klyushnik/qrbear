
export function ListItem(props) {

    //set state variables after receiving props

        return (
            <div className='listitem-container' onClick = {(e) => props.opsCallback(props.mock_index)}>
                <p className='listitem-left-col'>{props.mock_index}</p>
                <p className='listitem-middle-col'>{props.name}</p>
                <p className='listitem-right-col'>{props.upc}</p>
            </div>
        );
}