import React, { useRef, useState } from "react";
import styles from './FilePostForm.module.scss';

const FilePostForm = ( props ) => {
    const { id , onChange  } = props;
    const fileRef  = useRef();
    const [imgBase64, setImgBase64] = useState(""); // 파일 base64
    const [ state, setState ] = useState({
        file : null, 
        image : '',
        name : '선택된 파일없음',
        isShowFile : true
    });

    const handleChangeFile = ( e ) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // 2. 읽기가 완료되면 아래코드가 실행됩니다.
            const base64 = reader.result;
            if(base64) setImgBase64(base64.toString())
        }
        const files = e.target.files;
        if(files[0]){
            // 1. 파일을 읽어 버퍼에 저장합니다.
            reader.readAsDataURL( files[0] );
            // 파일 상태 업데이트
            setState( prev => ({
                ...prev,
                file : files[0],
                name : files[0].name,
                isShowFile : false
            })); 

            //Dispatch
            onChange({ id : id , file : files[0] });
        } 
    }

    const handleDeleteBtn = ( ) => {
        setState( prev => ({
            ...prev,
            file : null,
            name : '선택된 파일없음',
            isShowFile : true,
        }));

        setImgBase64('');
         //Dispatch
         onChange({ id : id , file : null });
    }

    /*
    const handleClick = ( e ) => {

        async function fetchData(){
            const formData = new FormData();
            formData.append('file', state.file);

            await axios.post('/api/img/upload', formData )
                // 응답(성공)
                .then( (res) => {
                    console.log(res.data.url);
                    console.log(res.data.path);

                    setState( prevState => ({
                        ...prevState,
                        image : res.data.url
                    }));
                })
                // 응답(실패)
                .catch( (error) => {
                    if (error.response) {
                        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                      }
                      else if (error.request) {
                        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                        // Node.js의 http.ClientRequest 인스턴스입니다.
                        console.log(error.request);
                      }
                      else {
                        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                        console.log('Error', error.message);
                      }
                })
        }
        fetchData()
    }
    */

    const ShowStyle = {
        display : ( state.isShowFile  ? 'none' : 'flex')
    }

    const InputStyle = {
        display : ( state.isShowFile ? 'flex' : 'none')
    }
    return(
        <>
        <div className= { styles.file }>

            { imgBase64 ? (
                <div className={ styles.imgViewer }>
                <img src={imgBase64} alt='imgBase64'/>
            </div>
            ) : null }
            
            <div className = { styles.form }>
                <div style={InputStyle} className={styles.fileForm}>
                        <label htmlFor = { id } className={styles.left}>업로드</label> 
                        <input type="file" id= { id } name="img" accept="image/*" 
                            onChange={ handleChangeFile } 
                            ref={ fileRef } />
                </div>
                <div className={ styles.info}>
                    { state.name }
                </div>
                <div className={styles.buttonArea} style={ShowStyle}>
                    <button className={styles.right} type ='button' onClick={ handleDeleteBtn }>삭제</button>    
                </div>
            </div>
        </div>
        </>
    )
}

export default FilePostForm;