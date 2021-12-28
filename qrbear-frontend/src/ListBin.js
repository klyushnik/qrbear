
export function ListBin(props) {

    //set state variables after receiving props
        console.log(props)
        return (
            <div className='listitem-container' onClick = {(e) => props.opsCallback(props.bin_id)}>
                <p className='listitem-left-col'>{props.bin_id}</p>
                <p className='listitem-middle-col'>{props.bin_name}</p>
            </div>
        );
}