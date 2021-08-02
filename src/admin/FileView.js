import React, { useEffect, useState } from "react";
import { get, post } from 'axios';
import useConfirm from "../component/useConfirm";
import FileListRenderer from './FileRenderer';
import styles from './FileView.module.scss';
const FileView = () => {

    const [ isCheck , setCheck ] = useState(false);
    const [ state, setState ] = useState({
        path : '',
        files : [],
    });

    const [ deleteFiles, setDeleteFiles ] = useState([])

    useEffect(() => {

        get('/api/img/fileView')
            .then( result => {
                setState({
                    path : result.data.path,
                    files : result.data.files
                });

            })
            .catch(err => {
                //console.log(err);
            });
        return ()=>{

        }
    },[]);
    
    const hadnelCheck = ( data )=>{
        if(data.check === true){
            if(deleteFiles.indexOf(data.index) < 0){
                setDeleteFiles([...deleteFiles, data.index]);
            }
        }else{
            if(deleteFiles.indexOf(data.index) > -1){
                setDeleteFiles(deleteFiles.filter( item => item !== data.index))
            }
        }
    }

    const okConfirm = () => removeItems( true );
    const okConfirm2 = () => removeItems( false );
    const cancelConfirm = () => console.log('취소되었습니다.');
    const confirmDelete = useConfirm('전체를 삭제하시겠습니까?' , okConfirm, cancelConfirm);
    const confirmDelete2 = useConfirm('선택한 아이템을 삭제하시겠습니까?' , okConfirm2, cancelConfirm);

    const removeItems = ( isAll ) => {

        const arr = [];
        if(isAll){
            state.files.forEach(( file, index ) =>{
                arr.push(state.files[index]);
            })
        }else{
            deleteFiles.forEach((index) => {
                arr.push(state.files[index]);
            });
        }

        if(arr.length === 0) return; 
        const url = '/api/img/deleteImg';
        post(url, { list:arr }).then((result)=>{
            setState({
                path : result.data.path,
                files : result.data.files
            });
        });    
    }

    const handleCheckAll = ( e ) => {
        setCheck(e.target.checked);
    }
    const renderer = state.files.map((item, index) => {
        return(
            <FileListRenderer key={index} 
                index = {index}
                path = { state.path } 
                text={item} 
                handleChecked = { hadnelCheck } />
        )
    });
    
    return (
        <div className={ styles.wrap}>
            <div className= { styles.header }>
                <div className='flex1'>
                    <label><input type='checkbox' onChange = { handleCheckAll } checked ={ isCheck }/> 전체선택</label>
                </div>
                <button onClick={ confirmDelete2 }><img src='/svg/delete_black_24dp.svg' alt='선택삭제' />선택 삭제하기</button>
                <button onClick={ confirmDelete }><img src='/svg/delete_black_24dp.svg' alt='전체삭제' />전체 삭제하기</button>
            </div>
            <ul>
                { renderer }
            </ul>
        </div>
    )
}

export default FileView;