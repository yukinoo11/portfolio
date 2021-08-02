import React, { useEffect, useState } from "react";
import AddComboBox from './../component/addComboBox';
import Modal from './../component/Modal';
import { CategoryModel } from './ListMain';
import axios from 'axios';
import './RegisterQuiz.css';

const resultMessageStyle = {
    color: '#ff0000',
    textAlign: 'center',
    margin: '10px',
    height: '30px'
}

const RegisterQuizMain = () => {
    const [ categoryList , setCategoryList ] = useState([]);
    const [ message, setMessage ] = useState('');

    const onSubmit = (data) => {
        console.log('등록하기', data)
        
        //등록하기
        axios.post('/api/admin/createQuiz', data)
            .then(res => {
                setMessage('등록하였습니다.');
            })
            .catch(res => {
                setMessage('ERROR');
            });
    }

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get('/api/admin/getQuizCategory');
            setCategoryList(result.data.list);
        }
        fetchData();
    }, [])

    return (
        <div>
            <RegisterQuiz 
                data = { null }
                categoryList = { categoryList } 
                onSubmitHandler={onSubmit} >
                <div style={resultMessageStyle}> {message} </div>
            </RegisterQuiz>
        </div>
    )
}

export default RegisterQuizMain;

export const RegisterQuiz = (props) => {
    const { data, categoryList, onSubmitHandler } = props;
    const [bChecked, setChecked] = useState(true);
    const [message, setMessage] = useState('');

    const [state, setState] = useState({
        categoryID : 'none',  //대분류
        subCategory : 'none', //소분류 
        qustion: "",
        answer: true,
        hint: "",
        isShowEditCategory: false,
    });

    const [isBoolean, setBoolean] = useState(false);

    //useEffect
    useEffect(() => {
        console.log('---RegisterQuiz useEffect');
        if( data ){
            setState({
                categoryID : data.category_id,
                subCategory : data.subCategory,
                qustion : data.qustion,
                answer : data.answer,
                hint : data.hint,
                isShowEditCategory: false,
            });

            setChecked(data.answer)
        }

        //clean up Function
        return () => {

        }
    }, [ data ]);

    const onChangeCategory = ( index, subIndex ) => {
        console.log(index, subIndex);
        setState({
            ...state,
            categoryID : index,
            subCategory : subIndex
        })
    }
    //카테고리추가 버튼을 클릭
    const handleSubmitCategory = () => {
        //초기화
        setState({
            ...state,
            isShowEditCategory: false,
        });

        setBoolean(!isBoolean);
    }

    //카테고리관리 닫기버튼 클릭
    const handleCloseCategory = () => {
        setState({
            ...state,
            isShowEditCategory: false
        })
    }
    const handleChange = (e) => {
        e.preventDefault();
        const target = e.target;
        let value = target.value;

        //힌트가 변경됐을경우
        if (target.name === 'hint') {
            const check = (value === '' ? true : false)
            setChecked(check);
        }

        setState({
            ...state,
            [target.name]: value,
        });
    }

    const handleChangeCheckBox = (e) => {
        const value = e.target.checked;
        setChecked(value);

        setState({
            ...state,
            hint: (value ? "" : state.hint)
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        if(state.categoryID === 'none' || state.subCategory === 'none'){
            setMessage('카테고리를 등록해주세요.');
            return;
        }

        if (state.qustion.trim().length < 1) {
            setMessage('문제를 등록해주세요.');
            return;
        }

        if (bChecked === false && state.hint.trim().length < 1) {
            setMessage('힌트를 등록해주세요.');
            return;
        }

        if (data) {

            console.log(data)
            if ( data.category_id === state.categoryID &&
                data.subCategory === state.subCategory &&
                data.qustion === state.qustion &&
                data.answer === state.answer &&
                data.hint === state.hint) {
                    setMessage('이전데이터와 같습니다. 변경할수없습니다.')
                return;
            }
        }
        const formData = {
            qzKey : (data ? data.qzKey : null),
            categoryID: state.categoryID,
            subCategory : state.subCategory,
            qustion: state.qustion.trim(),
            answer: bChecked,
            hint: state.hint.trim()
        };

        onSubmitHandler(formData);
        
        const init = () => {
            //초기화
            setState({
                ...state,
                qustion: '',
                answer: 1,
                hint: ''
            });
            setChecked(true);
            setMessage( data === null ? '등록하였습니다.' : '수정하였습니다.');
        }

        init();
    }

    return (
        <>
            <div>
                {state.isShowEditCategory ? (
                    <Modal open={true} close={handleCloseCategory}>
                        <AddComboBox
                            list={categoryList}
                            handleClose={handleCloseCategory}
                            handleSubmit={handleSubmitCategory} />
                    </Modal>
                ) : null}
                <form>
                    <div className='content-view'>
                        {data ? (
                            <div className='row'>
                                <div className='block'>
                                    <label>quKey</label>
                                    <span>{data.qzKey}</span>
                                </div>
                            </div>
                        ) : null}

                        <div className='row'>
                            { data ? (
                                <CategoryModel
                                    list = { categoryList }
                                    topID = { data.category_id}
                                    subID = { data.subCategory } 
                                    onChange = { onChangeCategory }/>
                            ) : (
                                <CategoryModel
                                    list = { categoryList }
                                    onChange = { onChangeCategory }/>
                            )}
                        </div>

                        { /* 
                        <div className='row'>
                            <div className='block'>
                                <Cateory list={categoryList} 
                                        value = { state.subCategory } 
                                        hadleChange = { onChangeCategory }
                                        handleClick={handleClickedShowCategoryComponent} />
                            </div>
                        </div>
                        */}
                        <div className='row'>
                            <div className='block'>
                                <TextareaComponent name={'qustion'} text={state.qustion} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='block'>
                                <label>답변</label>
                                <span>
                                <CheckBoxComponent name={'answer'} onChange={handleChangeCheckBox} isCheck={bChecked} />
                                </span>
                            </div>
                        </div>
                        <div className='row'>
                            <label>힌트</label>
                            <div className='block'>
                                <TextareaComponent name={'hint'} text={state.hint} onChange={handleChange} />
                            </div>
                        </div>
                        <div style={resultMessageStyle}>{message}</div>
                        <div className='submitWrap'>
                            <button type='button' onClick={submitHandler} className='button-color'>{ data === null ? '등록하기' : '수정하기'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}


export const TextareaComponent = ({ name, title, text, onChange }) => {
    return (
        <>
            <textarea name={name}
                value={text}
                onChange={onChange}
                rows="5" cols="33">{ }</textarea>
        </>
    )
}


const CheckBoxComponent = ({ name, title, isCheck, onChange }) => {
    return (
        <>
            <div>
                <input type="checkBox" name={name} checked={isCheck} onChange={onChange} />
                <label>정답</label>
            </div>
        </>
    )
}
