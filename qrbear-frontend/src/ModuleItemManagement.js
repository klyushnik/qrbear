import React from "react";
import { CardItemCounts } from "./cards/CardItemCounts";
import { CardItemInfo } from "./cards/CardItemInfo";
import { CardItemNewItem } from "./cards/CardItemNewItem";
import { CardItemQuickActions } from "./cards/CardItemQuickActions";
import { ResListContainer } from "./Reslist";


export class ModuleItemManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            item_id: -1,
            data: {},
            items: [],
            binCounts: [],
            DataisLoaded: false,
            newItemMode: false
        }
        this.setItem = this.setItem.bind(this);
        this.newItem = this.newItem.bind(this);
        this.fetchItemList = this.fetchItemList.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.fetchBinCounts = this.fetchBinCounts.bind(this);
    }


    setItem(newIndex) {
        this.setState({
            item_id: newIndex,
            newItemMode: false
        });
        this.fetchBinCounts(newIndex);
    }

    fetchItemList(newIndex) {
        fetch("/list/items")  //select item_id, item_name, item_sku from item
        .then((res) => 
            res.json())
        .then((json) => {
            this.setState({
                items: json,
                DataisLoaded: true
            });
        })
        .then(() => {
            if(this.state.items.length > 0){
                let firstIndex = this.state.items[this.state.newItemMode ? this.state.items.length - 1 : 0].item_id;
                this.setItem(newIndex === undefined ? firstIndex : newIndex);
            } else {
                this.newItem();
            }
        }).then(() => {
            this.fetchBinCounts();
        })
    }

    newItem() {
        this.setState({
            item_id: -1,
            newItemMode: true
        });
        console.log(this.state.item_id);
    }

    deleteItem(){
        if(window.confirm(`This will delete the record with Item ID ${this.state.item_id}. All data associated with it will be deleted as well.\nDo you want to continue?`)){
            fetch("/deleteitem/" + this.state.item_id)
            .then(response => {
                if(!response.ok){
                    console.log(response.statusText);
                    alert('There was a problem deleting this record.');
                } else {
                    this.fetchItemList();
                }
            });
        }
    }

    fetchBinCounts(index){
        let id;
        if(index !== undefined){
            id = index;
        } else{
            id = this.state.item_id;
        }
        fetch("/list/bincounts/" + id)  //select item_id, item_name, item_sku from item
        .then((res) => 
            res.json())
        .then((json) => {
            this.setState({
                binCounts: json,
                DataisLoaded: true
            });
        }).then(() => {
            console.log(this.state.binCounts);
        });
    }

    componentDidMount() {
           this.fetchItemList();
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
                    <button onClick = {this.newItem}>[ + ] New Item</button> 
                    <button disabled = {this.state.item_id === -1}>[ * ] Duplicate Item</button>   
                    <button className = 'redbtn' disabled = {this.state.item_id === -1} onClick={this.deleteItem}>[ x ] Delete Item</button>                  
                </div>
                <ResListContainer items = {this.state.items} opsCallback = {this.setItem}/>
                {this.state.newItemMode === true || this.state.items.length == 0 ?
                (<div className='main-ops'>
                    <div style = {{display: "flex", flexDirection: "column", width: "50%", height: "100%", margin: "auto", justifyContent: "center"}}>
                        <CardItemNewItem callback = {this.fetchItemList} isEmpty = {this.state.items.length == 0}/>
                    </div>
                </div>) :
                ( <div className = 'main-ops-grid'>
                    <CardItemInfo item_id = {this.state.item_id} callback = {this.fetchItemList}/>
                    <CardItemQuickActions item_id = {this.state.item_id} callback = {this.fetchBinCounts}/>
                    <CardItemCounts items = {this.state.binCounts}/>
                </div> )}
            </div>
        )
    }
}