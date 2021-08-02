import { React, Component } from "react"
import './ImgViewerComponent.css';

class ImgViewerComponent extends Component{
  
  state = {
    img : './images/gameimageblank.png',
  }

  inputFileRef = null;
  
  //게임타이틀 이미지 추가
  AddGameImgFile = (e) => {
    if(e.target.files && e.target.files[0]){
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onload = (e)=>{
        this.setState( {img:e.target.result, name:file.name})
      }
      
      reader.readAsDataURL(file);
      this.props.onChange(file);
    }
  }
  
  onClickedFileAdd = (e) => {
    
    if(this.inputFileRef){
      this.inputFileRef.click(); 
    }
  }
  
  render(){
    
    const { img } = this.state;
    const { name } = this.props; 
    const { width, height } = this.props;
    
    return(
      
		<div className="ImgViewerComponent">
        <img className='titleImg' src={ img } alt='game title'/>
      
      <span className='input-box-container'> 
        <label>{ name }</label>
        <input type='button' value='이미지 선택' onClick={ this.onClickedFileAdd }/>
      
        <span className="red-ft">
          {width} x {height} 사이즈의 이미지를 올려주세요.
        </span>
      </span>
      <input type="file" 
              ref = { ref => { this.inputFileRef = ref}} 
              onChange={ this.AddGameImgFile } 
              accept=".gif, .jpg, .png" />   
    </div>
    )
  }
}

export default ImgViewerComponent;