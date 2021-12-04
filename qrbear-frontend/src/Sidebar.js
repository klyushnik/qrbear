import React from 'react';
import {SidebarItem} from './SidebarItem';
import logo from './img/qrbear-logo.png';
import {faPaw, faBoxes, faTable, faMapSigns, faListAlt, faTools} from '@fortawesome/free-solid-svg-icons'

export function SidebarMenu(props){

    return(
        <div className ='sidebar'>
            <div className ='section-header'>
                <div id='logo-div'>
                <p id='logo-text'>QRBear 0.1</p>
                <img id='logo-img' alt='' src={logo}/>
                    
                </div>
                
            </div>
            <SidebarItem click = {props.callback} mode = {props.modes.ITEM_QUICK_ACTIONS} icon={faPaw} text="Item quick actions"/>
            <SidebarItem click = {props.callback} mode = {props.modes.ITEM_MANAGEMENT} icon={faBoxes} text="Item management"/>
            <SidebarItem click = {props.callback} mode = {props.modes.BINS_MANAGEMENT} icon={faTable} text="Bins management"/>
            <SidebarItem click = {props.callback} mode = {props.modes.AISLES_LOCATIONS} icon={faMapSigns} text="Aisles & locations"/>
            <SidebarItem click = {props.callback} mode = {props.modes.COUNTS_REPORTS} icon={faListAlt} text="Counts & reports"/>
            <SidebarItem click = {props.callback} mode = {props.modes.APP_PREFERENCES} icon={faTools} text="App preferences"/>
        </div>
        );
}
