import React, { Component } from 'react';

class Renderer extends Component{
  
    onClickedEvent = (e) => {
      const { gameKey, clickEvt } = this.props;
      clickEvt(gameKey , false);
    }
    
    onClickedEditEvent = (e) => {
      const { gameKey, clickEvt } = this.props;
      clickEvt(gameKey , true);
    }
    
      render(){
        let items = this.props.items.map(( $data , index)=>{
            let label ="";
            if(typeof($data) === 'boolean'){
                label = $data === true ? "O" : "X";
            }else{
                label = $data;
            }
            return(
                <td>{ label }</td>
            );
        });
          return(
            <tr onClick = { this.onClickedEvent } >
                { items }
                <td><button className='btn-sm red' type="button">Delete</button></td>
            </tr>
          );
      }
  }


  export default Renderer;