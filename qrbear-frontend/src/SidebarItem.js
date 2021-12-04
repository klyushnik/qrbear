import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export function SidebarItem(props){
    return (
        <div className='sidebaritem' onClick = {(e) => props.click(props.mode)}>
            <p><span style={{paddingRight: '20px'}}>{props.text}</span><FontAwesomeIcon icon={props.icon} /></p>
        </div>
    );
}