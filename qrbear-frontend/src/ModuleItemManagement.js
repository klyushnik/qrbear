import React from "react";
import { CardItemCounts } from "./cards/CardItemCounts";
import { CardItemInfo } from "./cards/CardItemInfo";
import { CardItemQuickActions } from "./cards/CardItemQuickActions";
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
        fetch("/api") //select * from item
        //fetch("/list/items") //select item_id, item_name, item_sku from item
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
                <ResListContainer items = {this.state.items} opsCallback = {this.mainOpsSetup}/>
                {this.state.index == -1 ?
                (<div className='main-ops'>
                    <div style = {{display: "flex", flexDirection: "column", width: "75%", height: "100%", margin: "auto", justifyContent: "center"}}>
                        <div className='card-inside'>   
                        <h2>No item selected</h2>
                        <p>Select an item from the list or add a new item.</p>
                        </div>
                    </div>
                </div>) :
                ( <div className = 'main-ops-grid'>
                    <CardItemInfo data = {this.state.items.length > 0 ? this.state.items[0] : {}} />
                    <CardItemQuickActions data = {this.state.index === -1 ? {} : this.state.items[0]} />
                    <CardItemCounts data = {this.state.index === -1 ? {} : this.state.items[0]} />
                </div> )}
            </div>
        )
    }
}