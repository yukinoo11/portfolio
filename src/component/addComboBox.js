import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./component.module.css";
import Modal from './Modal';
import axios from 'axios';

const AddComboBox = (props) => {
    const { handleSubmit } = props;
    const scrollRef = useRef();
    const [state, setState] = useState({
        categoryName: '',
        oldCategoryList: [],
        categoryList: [],
        oldSubCategoryList: [],
        subCategoryList: []
    });

    //원본카테고리리스트
    const [originalState, setOriginalState] = useState({
        categoryList: [],
        subCategoryList: []
    });

    const [notice, setNotice] = useState({
        open: false,
        message: ''
    });

    const [resultData, setResultData] = useState({
        ids: [],
        categoryList: []
    });

    useEffect(() => {

        async function topCategory() {
            return await axios.get('/api/admin/getQuizCategory');
        }

        async function subCategory() {
            return await axios.get('/api/admin/subCategoryAll');
        }

        Promise.all([topCategory(), subCategory()])
            .then((result) => {
                setOriginalState( prev => ({
                    ...prev,
                    subCategoryList: result[1].data.list,
                    categoryList: result[0].data.list,
                }));

                setState( prev => ({
                    ...prev,
                    oldCategoryList: result[0].data.list,
                    oldSubCategoryList: result[1].data.list
                }));
            });
    }, []);


    const normalStyle = {
        display: 'flex',
        flexDirection: 'row'
    }
    const newStyle = {
        background: '#fcffe1',
        display: 'flex',
        flexDirection: 'row'
    }
    const newLabelStyle = {
        flex: '1'
    }

    //팝업 삭제
    const hideNotice = () => {
        setNotice({
            ...notice,
            open: false
        })
    }

    /** 추가 카테고리 삭제 */
    const onDeleteBtn = (index) => {
        state.categoryList.splice(index, 1);
        setState({
            ...state,
            categoryList: state.categoryList
        })
    }


    /** 기존 카테고리 삭제 */
    const onClickSubmitBtn = (arr) => {

        const ids = arr[0];
        const l = arr[1];
        setResultData({
            ids: arr[0],
            categoryList: arr[1]
        })

        const mess = l.map((item, index) => {
            return `[${item.categoryID}] ${item.category_Detail_NM}`
        });
        setNotice({
            open: true,
            message: `categoryID (  ${ids} )  삭제합니다.      
                        ${mess} 을 추가합니다.
                    적용하시겠습니까?`
        });
    }

    const onSubCategoySubmit = () => {
        if (resultData.ids.length < 1 &&
            resultData.categoryList.length < 1) {
            return;
        }

        //추가        
        async function addCategory() {
            if (resultData.categoryList.length < 1) return null;
            return await axios.post('/api/admin/subCategory', { list: resultData.categoryList });
        }

        var arr = resultData.ids.reduce((pre, value) => {
            async function deleteCategory() {
                await axios.delete('/api/admin/subCategory', { data: { id: value } })
            }

            pre.push(deleteCategory())
            return pre
        }, [addCategory()]);

        //삭제
        Promise.all(arr)
            .then((result) => {
                console.log(result, 'http 요청 코드')
                handleSubmit();
                setNotice({
                    ...notice,
                    open: false,
                })
            });

    }

    const listItems = state.oldCategoryList.map((data, index) => {
        const { category_Detail_NM, categoryID } = data;
        return (
            <li style={normalStyle} key={index}>
                <span className={styles.spanKey}>{categoryID} </span>
                <span style={newLabelStyle}>{category_Detail_NM}</span>
            </li>
        )
    });

    const newListItems = state.categoryList.map((data, index) => {
        const { category_Detail_NM } = data;
        return (
            <li style={newStyle} key={'new_' + index}>
                <span style={newLabelStyle}>{category_Detail_NM}</span>
                <button onClick={(e) => onDeleteBtn(index)} className='button-close'>&times;</button>
            </li>
        )
    });
    return (
        <>
            <Modal open={notice.open} close={hideNotice}>
                <div className='notice'>
                    <div className='messageStyle'>{notice.message}</div>
                    <div className='footer'>
                        <button className='button-color' onClick={onSubCategoySubmit}>적용</button>
                        <button className='button-color' onClick={hideNotice}>취소</button>
                    </div>
                </div>
            </Modal>
            <h1>카테고리 관리</h1>
            <div className={styles['category-top-wrap']}>
                <div className={styles['category-wrap']}>
                    <span className='count'>total : {state.categoryList.length}</span>
                    <div className={`${styles['round-border']} ${styles['category-list-wrap']}`}>
                        <ul ref={scrollRef} >
                            {listItems}
                            {newListItems}
                        </ul>
                    </div>
                    <div className={`${styles['category-input-wrap']}`}>
                        {/*
                        <div className={styles.top}>
                            <input className={styles['category-input']}
                                onChange={handleOnChangeCategory} type="text" value={state.categoryName} />
                            <button type='button' className='button-color' onClick={handleClikcAddCategory}>카테고리추가</button>
                        </div>
                        */}
                    </div>
                </div>

                <CateogryCompoent list={originalState.subCategoryList}
                    submitHandler={onClickSubmitBtn} />
            </div>
        </>
    )
}


const CateogryCompoent = (props) => {
    const { list, submitHandler } = props;
    const scrollRef = useRef();

    const [state, setState] = useState({
        categoryName: '',
        oldCategoryList: [],
        categoryList: [],
        categoryID: '',
        topID: '',
    });

    useEffect(() => {
        console.log('useEfeect')
        setState({
            categoryName: '',
            oldCategoryList: list.concat(),
            categoryList: [],
            categoryID: '',
            topID: '',
        })
    }, [list])

    const [ids, setIDs] = useState([]);
    const newStyle = {
        background: '#fcffe1',
        display: 'flex',
        flexDirection: 'row'
    }
    /** 추가 카테고리 삭제 */
    const onDeleteBtn = (index) => {
        state.categoryList.splice(index, 1);
        setState({
            ...state,
            categoryList: state.categoryList
        })
    }

    const onDeleteOldBtn = (index) => {
        console.log('delete', index)
        const result = state.oldCategoryList.splice(index, 1);
        console.log('결과', state.oldCategoryList, result[0].categoryID)
        //삭제 categoryID 추가
        const cid = result[0].categoryID;
        //console.log(result[0].categoryID)
        setIDs([...ids, cid]);
        setState({
            ...state,
            oldCategoryList: state.oldCategoryList
        })

        console.log('ids', ids)
    }
    const handleClikcAddSubCategory = () => {
        if (state.categoryName.length < 1) return;
        const n = state.categoryName.trim();
        const t = state.topID;
        const c = state.categoryID;

        if (n.length < 1) return;
        if (t.length < 1) return;
        if (c.length < 1) return;
        setState({
            ...state,
            categoryName: '',
            topID: '',
            categoryID: '',
            categoryList: [...state.categoryList, { topID: t, categoryID: c, category_Detail_NM: n }],
        });
        setTimeout(() => {
            scrollToBottom();
        }, 100)
    }

    const scrollToBottom = useCallback(() => {
        // 스크롤 내리기
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        const target = e.target;
        let value = target.value;
        if (target.name !== 'categoryName') {
            value = target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        }
        setState({
            ...state,
            [target.name]: value
        });
    }

    const onInit = () => {
        setState({
            categoryName: '',
            oldCategoryList: list.concat(),
            categoryList: [],
            categoryID: '',
            topID: '',
        })
    }

    const onSubmitBtn = (e) => {
        e.preventDefault()
        console.log('state.ids', ids);
        console.log('state.categoryList', state.categoryList);

        if (ids.length < 1 && state.categoryList < 1) return;
        submitHandler([ids, state.categoryList])
        //{deleteId: state.ids, addItem: state.categoryList }
    }
    const newListItems = state.categoryList.map((data, index) => {
        const { topID, categoryID, category_Detail_NM } = data;
        return (
            <li style={newStyle} key={'new_' + index}>
                <span className={styles.spanKey}>{topID}</span>
                <span className={styles.spanKey}>{categoryID}</span>
                <span className={styles.flex1}>{category_Detail_NM}</span>
                <button onClick={(e) => onDeleteBtn(index)} className='button-close'>&times;</button>
            </li>
        )
    });

    const count = state.categoryList.length + state.oldCategoryList.length;
    return (
        <div className={styles['category-top-wrap']}>
            <div className={styles['category-wrap']}>
                <span className='count'>total : {count}</span>
                <div className={`${styles['round-border']} ${styles['category-list-wrap']}`}>
                    <ul ref={scrollRef} >
                        {console.log(state.oldCategoryList)}
                        <RendererItems list={state.oldCategoryList}
                            handleDeleteBtn={onDeleteOldBtn} />
                        {newListItems}

                    </ul>
                </div>
                <div className={`${styles['category-input-wrap']}`}>
                    <div className={styles.top}>
                        category_Detail_NM
                    <input name='categoryName' className={styles['category-input']}
                            onChange={handleChange} type="text" value={state.categoryName} />
                        topID
                    <input name='topID' className={styles['category-input']}
                            onChange={handleChange} type="text" value={state.topID} />
                        categoryID
                    <input name='categoryID' className={styles['category-input']}
                            onChange={handleChange} type="text" value={state.categoryID} />
                        <button type='button' onClick={handleClikcAddSubCategory} className='button-color'>카테고리추가</button>
                        <button type='button' onClick={onInit} className='button-color'>초기화</button>
                        <button type='button' onClick={onSubmitBtn} className='btn'>적용하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RendererItems = (props) => {
    const { list, handleDeleteBtn } = props;
    const normalStyle = {
        display: 'flex',
        flexDirection: 'row'
    }
    const renderers = list.map((data, index) => {
        const { category_Detail_NM, categoryID, topID } = data;
        return (
            <li style={normalStyle} key={index}>
                <span className={styles.spanKey}>{topID} </span>
                <span className={styles.spanKey}>{categoryID} </span>
                <span className={styles.flex1}>{category_Detail_NM}</span>
                <button type='button' onClick={(e) => handleDeleteBtn(index)} className='button-close' >&times;</button>
            </li>
        )
    });
    return (
        <>
            { renderers}
        </>
    )
}
export default AddComboBox;