import React from "react";
import { CardItemCounts } from "./CardItemCounts";
import { CardItemInfo } from "./CardItemInfo";
import { CardItemQuickActions } from "./CardItemQuickActions";
import { ResListContainer } from "./Reslist";

const items = require('./MOCK_DATA.json');

export class ModuleItemManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index: -1,
            data: [],
            items: [],
            DataisLoaded: false
        }
        this.mainOpsSetup = this.mainOpsSetup.bind(this);
    }


    mainOpsSetup(newIndex) {
        this.setState({index: newIndex});
    }

    componentDidMount() {
        fetch("/api")
        .then((res) => 
            res.json())
        .then((json) => {
            this.setState({
                items: json,
                DataisLoaded: true
            });
        })
        .then(() => {console.log(this.state.items[0]);});      
    }

    render() {
        return (
            <div className="module-reslist">
                <div className ='section-header'>
                    <input type='text'></input>
                    <button>Filter</button>
                </div>
                <div className = 'section-header'>
                    <h1 className='section-header-h1'>Item management</h1>
                    <button >[ + ] New Item</button> 
                    <button>[ * ] Duplicate Item</button>   
                    <button className = 'redbtn'>[ x ] Delete Item</button>                  
                </div>
                <ResListContainer items = {items} opsCallback = {this.mainOpsSetup}/>
                <div className = 'main-ops-container'>
                    <CardItemInfo data = {this.state.items.length > 0 ? this.state.items[0] : {}} />
                    <CardItemQuickActions data = {this.state.index === -1 ? {} : items[this.state.index]} />
                    <CardItemCounts data = {this.state.index === -1 ? {} : items[this.state.index]} />
                </div>
            </div>
        )
    }
}