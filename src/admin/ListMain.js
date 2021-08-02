import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from './ListMain.module.css';
import ListQuiz from "./ListQuiz";
import ListView from './ListView';
import { RegisterQuiz } from "./RegisterQuiz";
import Modal from './../component/Modal';

const ListMain = ( props ) => {
    
    const [state, setState] = useState({
        categoryID: 'none',
        subCategoryID: 'none',
        categoryList : [],
        list : []
    });

    const [ view , setView ] = useState(null);
    const [ isEdit , setEdit ] = useState(false);

    useEffect(() => {

        console.log('리스트effect')
        async function fetchData() {
            //카테고리
            const result = await axios.get('/api/admin/getQuizCategory');
            setState( prevState => ({
                ...prevState,
                categoryList : result.data.list
            }));
        }
        fetchData();
    }, []);

    const onChange = (index, subindex) => {
        //변경
        async function fetchData() {
            const result = await axios.get(`/api/admin/listQuiz?categoryID=${index}&subID=${subindex}`);
            setState({
                ...state,
                categoryID: index,
                subCategoryID: subindex,
                list : result.data.list
            });   
        }   
        fetchData();
    }

    const onClickListItem = ( index ) => {
        setView(state.list[index]);
        setEdit(false)
    }

    const onClickModifyItem = () => {
        setEdit(true);
    }
    const onDelete = ( _qzKey ) => {
        //삭제하기
        const fetchData = async () => {
            await axios.delete('/api/admin/deleteQuiz', { data: { qzKey: _qzKey }})
            .then((res => {
                setEdit(false);
                setView(false);
                //갱신
                console.log(state.categoryID, state.subCategoryID)
                onChange(state.categoryID, state.subCategoryID);
            }))
        }
        
        fetchData();
    }

    const handleSubmit = ( formData ) => {
        axios.post('/api/admin/modifyQuiz', formData)
        setEdit(false);
        setView(false);
    }
    return (
        <div className={styles.ListQuizMain}>
            <CategoryModel list = { state.categoryList } 
                            onChange = {onChange} />
            { view ? (
                <div className='ListQuiz'>
                    <Modal open={true} close={()=> setView(null) }>
                        { isEdit ? (
                            <RegisterQuiz data={ view } 
                                    isEdit = { true }
                                    categoryList = {state.categoryList}
                                    onSubmitHandler={ handleSubmit } />
                        ) : (
                            <ListView data = { view } 
                                handleDelete = { onDelete }
                                handleModifyBtn = { onClickModifyItem } />
                        )}
                    </Modal>
                </div>
            ) : null }

            <ListQuiz list = { state.list} 
                    clickHandler = { onClickListItem } />
        </div>
    )
}


export const CategoryModel = (props) => {
    const { list , topID , subID , onChange } = props;
    const [ category , setCategory ] = useState(topID);

    const [ subCategory , setSubCategory ] = useState({
        list : [],
        id : null
    })

    useEffect(() => {

        if( topID !== undefined ){
            setCategory(topID);
            const fetchData = async () => {
                const result = await axios.get(`/api/admin/subCategory/${topID}`)
                //소분류
                setSubCategory({
                    id : subID,
                    list : result.data.list
                });    
            }
    
            fetchData();
        }


        /*
        console.log('useEffect',topID)
        let arr = []
        if(subCategoryID !== undefined){
            arr.push(getSubCategory())
            Promise.all(arr)
            .then((result) =>{
                if(result[0]){
                    setSubCategory({
                        id : subCategoryID,
                        list : result[0].data.list
                    });               
                }
            })
        }
        */
    }, [ subID , topID]);

    /** 선택된 _topID 의 소분류 카테고리를 등록 */
    const changeTopIndex = ( _topID ) => {
        console.log('선택된 _topID 의 소분류 카테고리를 등록 ')
        setCategory(_topID);
        const fetchData = async () => {
            const result = await axios.get(`/api/admin/subCategory/${_topID}`)
            //소분류
            setSubCategory({
                id : 'none',
                list : result.data.list
            });    
        }

        fetchData();
    }

    //소분류 클릭
    const onChangeSubCategory = (id) => {
        setSubCategory({
            ...subCategory,
            id : id
        });

        if (onChange) onChange(category, id);
    }

    return (
        <div className={styles.CategoryModel}>
            <div className={styles.category}>
                <label>대분류</label>
                <div className={styles.selectbox}><Cateory list={list} value={category} hadleChange={ ( index ) => changeTopIndex(index)} /></div>
            </div>
            <div className={styles.category}>
                <label>소분류</label>
                <div className={styles.selectbox}><Cateory list={subCategory.list} value={subCategory.id} hadleChange={onChangeSubCategory} /></div>
            </div>
        </div>
    );
}

const Cateory = (props) => {
    const { value , list, hadleChange, handleClick } = props;

    const onChangeHandler = (e) => {
        e.preventDefault();
        if (hadleChange) hadleChange(e.target.value);
    }

    useEffect(()=>{
        
    },[])
    
    const renderer = list.map((data, index) => {
        const { category_Detail_NM, categoryID } = data;
        return (
            <option key={index} value={categoryID}>{category_Detail_NM}</option>
        );
    });

    return (
        <>
            <select value={value} onChange={onChangeHandler} >
                <option value="none">선택하시오</option>
                { renderer }
            </select>
            { handleClick ? (
                <button type='button' className='button-color editBtn' onClick={handleClick}>편집</button>
            ) : null}
        </>
    )
}


export default ListMain;