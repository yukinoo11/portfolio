import React, { Component } from "react"

class FileUploaderComponent extends Component{
  
  state = {
    list : []
  }

  fileRef = null; //Input File ref

  /** 파일 추가 클릭 */
  onClickedFileAdd = (e) => {
    e.stopPropagation();
    if(this.fileRef){
      this.fileRef.click();
    }
  }
  
  /** input File 변경 */
  onChangeFile = (e) => {
    
    const { files ,onChange } = this.props;
    const arr = e.target.files;
    const fileArr = Array.from(arr);
    
    console.log('event 발생')
    fileArr.forEach((item, index) => {
      console.log('아이템', item)
      
      for(var i=0; i<this.state.list.length; i++){
        if(this.state.list[i] === item)
          {
            console.log(i, '같다')
          }
      }
      if(this.state.list.indexOf(item) > -1)
        {
          console.log('찾았다.');
        }
      else{
        console.log('아니다.')
      }
      
    });
    
    
    onChange( files.concat(fileArr) );
    //this.setState( { list : this.state.list.concat(fileArr) } )
    //
    //console.log(this.state.list)
		//let fileArr = Array.from(files);
  }
  
  /** 파일 사이즈 반환 */
  getFileSize = (fileSize) => {
    let n = fileSize;
    if(fileSize > 1024 * 1024)
    {
      n = fileSize / (1024 * 1024);
      return n.toFixed(3) + ' MB';
    }
    else if(fileSize > 1024)
    {
      n= fileSize / 1024;
      return n.toFixed(3) + ' kB';
    }
    else
    {
      return fileSize + ' byte';
    }
  }
  
  /** 파일 삭제버튼 클릭 */
  onClickedRemoveItem = (index) => {
    console.log('삭제',index);
    
    let arr = this.state.list;
    arr.splice(index, 1);
    this.setState({list :arr});
  }
  
  render(){
    const { files , accept } = this.props;
    const fileList = files.map((file, i) => {
      return (
        
        <li key={i}>
          <span className='file-name-field'>
            <input type='checkbox'/>
            <label>{file.name}</label>
          </span>
          <span className='file-size-field'>
            {this.getFileSize(file.size)}
          </span>
          <span className='file-delete-field'>
            <input type='button' className='btn-sm' onClick ={(e) => {this.onClickedRemoveItem(i)}} value='X' />
          </span>
        </li>
      )
    })
    return(
      <div className="preview">
        {/*전체 선택*/}
        <div className="checkbox-component">
          <input type="checkbox" className='checkbox-type2'/>
          <label>전체 선택</label>
        </div>

        {/*파일리스트 등록 UL 시작*/}
        <div className='preview-list'>
          <ul className='fileList-container'>
          {/*리스트 */}
            {fileList}
          </ul>
        </div>

        {/*파일등록 관련 네이게이터*/}
        <div className='preview-footer'>
          <input type='button' 
                  value='파일삭제' />
          <input type="button" 
                  value='파일추가' 
                  onClick={ this.onClickedFileAdd } />

          <input type="file" 
                accept= {accept}
                className='hide-input'
                ref = { ref => { this.fileRef = ref }}
                onChange = { this.onChangeFile }
                multiple />
        </div>
      </div>  
    )
  }
}

export default FileUploaderComponent;
