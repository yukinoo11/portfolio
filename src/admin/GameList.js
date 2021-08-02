import React, { Component } from "react";
import Table from './../component/table';
import PaginatonControls from './../component/PaginatonControls';
class ListGame extends Component{

    constructor( props ){
        super(props);

        this.state = {
            list : [
                {id: 0, gameKey:'gameKey0', title:'제목1', gameimgpath:'img1.png', backgroundImg:'gg', playCount:'0', time:'2020-20.20'},
                {id: 1, gameKey:'gameKey0', title:'제목2', gameimgpath:'img1.png', backgroundImg:'gg', playCount:'0', time:'2020-20.20'},
                {id: 2, gameKey:'gameKey0', title:'제목3', gameimgpath:'img1.png', backgroundImg:'gg', playCount:'0', time:'2020-20.20'},
                {id: 3, gameKey:'gameKey0', title:'제목4', gameimgpath:'img1.png', backgroundImg:'gg', playCount:'0', time:'2020-20.20'},
                {id: 4, gameKey:'gameKey0', title:'제목5', gameimgpath:'img1.png', backgroundImg:'gg', playCount:'0', time:'2020-20.20'},
            ]
        }

        this.columns = [{
            Header : 'No',
            accessor : 'id'
        },{
            Header : 'GameKey',
            accessor : 'gameKey'
        },{
            Header : 'Title',
            accessor : 'title'
        },{
            Header : 'Thumbnail',
            accessor : 'backgroundImg'
        },{
            Header : 'play',
            accessor : 'playCount'
        },{
            Header : 'date',
            accessor : 'time'
        }];
    }

    componentDidMount(){
        fetch("/admin/listGame")
        .then(res => res.json())
        .then(res => this.setState({ list: res.list}))
        .catch(err => err);
    }

    render(){
        return(
            <div className='content-inner-wrap'>
                <p className="page-wrap">Showing { 5 }  entries</p>
                < Table columns = { this.columns } data = { this.state.list } />
                <div className='paging-wrap'>
                < PaginatonControls PerPage = { 15 } usersLength = { this.state.list.length } />    
                </div>
            </div>
        )
    }
}

export default ListGame;