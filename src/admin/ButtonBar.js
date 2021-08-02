import React, { Component } from 'react';
import './ButtonBar.css';

class ButtonBar extends Component {
  
  state = {
    list : ['btn1', 'btn2', 'btn3', 'btn4']
  }
  render(){
    
    const { list } = this.state;
    const { name } = this.props;
    const radioItem = list.map((item, i) => {
      return(   
        
        <div className='button-bar-container'>
         <label key = {i} >
            <input type='radio' name={name} className='button-bar' />
            { item }
          </label>
        </div>
      )
    });
    
    
    return (
      <div className='component-button-bar'>
        {radioItem}
      </div>
    );
  }
}

export default ButtonBar;