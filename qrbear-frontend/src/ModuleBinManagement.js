import React from "react";
import { CardBinContents } from "./cards/CardBinContents";
import { CardBinInfo } from "./cards/CardBinInfo";
import { CardBinNewBin } from "./cards/CardBinNewBin";
import { CardItemNewItem } from "./cards/CardItemNewItem";
import { CardBinQuickActions } from "./cards/CardBinQuickActions";
import { BinListContainer } from "./Binlist";


export class ModuleBinManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bin_id: -1,
            data: {},
            bins: [],
            items: [],
            DataisLoaded: false,
            newBinMode: false
        }
        this.setBin = this.setBin.bind(this);
        this.newBin = this.newBin.bind(this);
        this.fetchBinList = this.fetchBinList.bind(this);
        this.fetchItemList = this.fetchItemList.bind(this);
        this.deleteBin = this.deleteBin.bind(this);
    }


    setBin(newIndex) {
        this.setState({
            bin_id: newIndex,
            newBinMode: false
        });
        this.fetchItemList(newIndex);
    }

    fetchBinList(newIndex) {
        fetch("/list/bins")  //select item_id, item_name, item_sku from item
        .then((res) => 
            res.json())
        .then((json) => {
            this.setState({
                bins: json,
                DataisLoaded: true
            });
        })
        .then(() => {
            if(this.state.bins.length > 0){
                let firstIndex = this.state.bins[this.state.newBinMode ? this.state.bins.length - 1 : 0].bin_id;
                this.setBin(newIndex === undefined ? firstIndex : newIndex);
            } else {
                this.newBin();
            }
        });   
    }

    fetchItemList(index) {
        let id;
        if(index !== undefined){
            id = index;
        } else{
            id = this.state.bin_id;
        }
        fetch("/list/binitems/" + index)  //select item_id, item_name, item_sku from item
        .then((res) => 
            res.json())
        .then((json) => {
            this.setState({
                items: json,
                DataisLoaded: true
            });
        });
    }

    newBin() {
        this.setState({
            bin_id: -1,
            newBinMode: true
        });
    }

    deleteBin(){
        if(window.confirm(`This will delete the record with Bin ID ${this.state.bin_id}. All data associated with it will be deleted as well.\nDo you want to continue?`)){
            fetch("/deletebin/" + this.state.bin_id)
            .then(response => {
                if(!response.ok){
                    console.log(response.statusText);
                    alert('There was a problem deleting this record.');
                } else {
                    this.fetchBinList();
                }
            });
        }
    }

    componentDidMount() {
        this.fetchBinList();
    }

    render() {
        return (
            <div className="module-reslist">
                <div className ='section-header'>
                    <input type='text'></input>
                    <button>Filter</button>
                </div>
                <div className = 'section-header'>
                    <h1 className='section-header-h1'>Bins management</h1>
                    <button onClick = {this.newBin}>[ + ] New Bin</button>
                    <button className = 'redbtn' disabled = {this.state.bin_id === -1} onClick={this.deleteBin}>[ x ] Delete Bin</button>                  
                </div>
                <BinListContainer items = {this.state.bins} opsCallback = {this.setBin}/>
                {this.state.newBinMode === true || this.state.bins.length == 0 ?
                (<div className='main-ops'>
                    <div style = {{display: "flex", flexDirection: "column", width: "50%", height: "100%", margin: "auto", justifyContent: "center"}}>
                        <CardBinNewBin callback = {this.fetchBinList} isEmpty = {this.state.bins.length == 0}/>
                    </div>
                </div>) :
                ( <div className = 'main-ops-grid'>
                    <CardBinInfo bin_id = {this.state.bin_id} callback = {this.fetchBinList}/>
                    <CardItemNewItem bin = {this.state.bin_id} callback = {this.fetchItemList}/>
                    <CardBinContents items = {this.state.items} callback = {this.fetchItemList} bin_id = {this.state.bin_id}/>
                    <CardBinQuickActions />
                </div> )}
            </div>
        )
    }
}