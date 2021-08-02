import React, { useState, useRef } from "react";
import FileUploaderComponent from "./FileUploaderComponent";
import ImgViewerComponent from "./ImgViewerComponent";
import ButtonBar from './ButtonBar';
import "./AdminWrite.css";

const AdminWrite = ({ submitCallBack }) => {
  const [inputs, setInputs] = useState({
    gameId:'DKFJ',
    category:'Casual',
    gamename:'FEFE',
    description:'FFFFF'
  });
  
  const inputGameKey = useRef();
  const btnKeycheck = useRef();
  
  // 비구조화 할당을 통해 값 추출
  const {gameId, gamename, description} = inputs;
  //게임 아이디 체크
  const [gameIdCheck, setGameIdCheck] = useState('');
  const [gameIdCheckErr, setGameIdCheckErr] = useState('고유 아이디를 등록합니다');
  const [gametitleimg, setGametitleimg] = useState('');
  const [imgFiles, setImgFiles] = useState([]);
  const [jsFiles, setJsFiles] = useState([]);
  const [soundFiles, setSoundFiles] = useState([]);
  
  const onChange = (e) => {
    //우선 e.target 에서 name 과 value 를 추출
    const {value, name}= e.target; 
    
    setInputs({
      ...inputs,  // 기존의 input 객체를 복사한 뒤
      [name] : value // name 키를 가진 값을 value 로 설정
    });
  };
  
  const onChangeGameImg = ( file ) => {
    setGametitleimg(file);
  }
  
  const onChangeJsFiles = ( files ) => {
    setJsFiles(files);
  }
  
  const onChangeImgFiles = ( files ) => {
    setImgFiles(files);
  }
  
  const onReset = () => {
    setInputs({
      gameId:'',
      gamename:'',
      description:''
    });
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    //중복체크가되어있는지를체크  
    /*
    if(gameId !== gameIdCheck){
      btnKeycheck.current.focus();
      return setGameIdCheckErr('중복 체크 해 주세요');
    }  
    */
    const formData = new FormData();
    formData.append('gameId', gameId)
    formData.append('gamename', gamename)
    formData.append('description', description)
    formData.append('gametitleimg', gametitleimg)
    formData.append('imgFiles', imgFiles);
    formData.append('jsFiles' , jsFiles);
    formData.append('soundFiles' , soundFiles);
    
    fetch('/admin/write', {
      method :'POST',
      body: formData
    }).then(res => res.json())
      .then(data => submitCallBack(data))
      .catch(err => console.log(err));
  }
  
  //게임키gamekey 중복체크
  const handleOnCheckId = () => {
    if(gameIdCheck === gameId) return;   
    
    fetch('/admin/checkID', {
      method :'POST',
      body:JSON.stringify({
        json:{id:gameId}
      }),
      headers:{
        'Content-Type' : 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => { 
      if(data.isUniqe === true){
        alert('중복 체크 되었습니다.');
        setGameIdCheck(gameId);
        btnKeycheck.current.disabled=true;
      }else{
        alert('사용할수없는 gamekey입니다. \n다른 gamekey로 변경해주세요.');
        inputGameKey.current.value = '';
        inputGameKey.current.focus();
      }
      });
  }
  
  return (
    <div className='write'>
      <h2>regist game</h2>
      <form name='upload' 
            onSubmit={ onSubmit } 
            className='adminWrite'>
        <div className="container">
          <ul className="write-list">
    
      {/*고유 아이디를 등록합니다. 절대로 중복되어서는 안됩니다.*/}
      <li className="write_tr">
        <label className='label-title'>Game Key</label>

        <div className="value">
           <input type="text"
              name = 'gameId'
              value = {gameId}
              onChange={onChange} 
              ref = {inputGameKey}
              required />

           <input type="button" 
              value = "중복체크" 
              onClick = {handleOnCheckId}
              ref = {btnKeycheck} />
           <div className="description">
              {gameIdCheckErr}
          </div>
        </div>
      </li>
    
      {/* 게임 카테고리를 등록합니다 */}
      <li className="write_tr">
        <label className='label-title'>게임 분류</label>
        <div className="value">
          <ButtonBar />
        </div>
      </li>
    
			{/* 게임이름을 등록합니다.
			게임이름은 20자 이하로등록해야합니다 */}
			<li className="write_tr">
				<label className='label-title'>게임 이름</label>
				<div className="value">
					<input type="text" 
            className='width-90p'
            name= 'gamename'
            maxLength='20'
            value = { gamename }
            onChange = { onChange }
            required />
					<div className="description">20자이하로 등록가능합니다.</div>
				</div>
			</li>
      {/*게임의 타이틀 이미지를 올리는부분*/}
			<li className="write_tr">
				<label className='label-title'>타이틀 이미지</label>
        <ImgViewerComponent 
              name = { gametitleimg.name }
              onChange = { onChangeGameImg } 
              width={120} height={240}/>
			</li>

			<li className="write_tr">
				<label className='label-title'>설명</label>
				<div className="value">
					<textarea name="description" 
                    value={description}
                    onChange={onChange} />
				</div>
			</li>
      {/* 아틸라스 이미지 등록 */}
			<li className="write_tr">
				<label className='label-title'>이미지등록</label>
				<div className="value">
          {/* 아틸라스 이미지 ID */}
          <FileUploaderComponent 
            files = { imgFiles }
            onChange = { onChangeImgFiles }
            accept={".gif, .jpg, .png"}/>
				</div>
			</li>
      {/* 아틸라스 이미지 끝 */}
      {/* 자바스크립트 소스 등록 */}
			<li className="write_tr">
				<label className='label-title'>Javascript 등록</label>
				<div className="value">
          {/*자바스크립트 ID*/}
          <FileUploaderComponent 
            files = { jsFiles }
            onChange = { onChangeJsFiles }
            accept={".js"}/>
				</div>
			</li>
      {/*자바스크립트 소스 등록 끝*/}
		</ul>
	</div>
	<div className="footer">
		<input type="submit" 
          className='btn-skyblue'
          value='등록하기' />
		<input type="button" onClick={onReset} value="취소하기" />
	</div>
</form>  
      </div>
  );
}

export default AdminWrite;

