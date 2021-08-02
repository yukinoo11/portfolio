import React, { useEffect, useReducer, useState } from 'react'
import QuizApp, { Success } from './stepGame';
import StudyResut from './result';
import Loading from "../component/Loading";
import Modal from '../component/Modal';
import Navigation, { BtnNavigation } from './navigation';
import axios from 'axios';
import styles from './main.module.css';
import Hint from './Hint';

const StudyApp = ( props ) => {
    const { match } = props;
    const [title, setTitle] = useState('');
    const [state, dispatch] = useReducer(reducer, {
        isLoading: true,
        popupOpen: false,          //모달팝업 오픈
        popupType: 'none',          //팝업타입 : hint, success, result
        modalType: 'none',         //모달타입 : none, box
        resultData: [{ index: 0, answer: 1 }], //게임결과
        lists: [],                 //문제리스트
        currentNum: 0,             //현재스테이지
        maxNum: 0,                 //전체스테이지
        quiz: { no: 0, qustionText: '', answer: 1, hint: '' }  //현재게임데이터
    });

    const { currentNum, maxNum, quiz, popupType, popupOpen, modalType, resultData, isLoading } = state;

    //스테이지 변경
    const onChangeStage = (num) => {
        dispatch({ type: 'SET_COUNT', data: { count: num } });
    };

    //한게임 결과
    const onClick = (_result) => {
        const { wrong, index } = _result;
        console.log('>>>>>>>>>>>>onClick', index, wrong);
        if (wrong) {
            dispatch({ type: 'HIT' });  //힌트
            dispatch({ type: 'SET_RESULT', data: { index: index, answer: 0 } });
        } else {
            //결과
            dispatch({ type: 'SUCCESS' });
            dispatch({ type: 'SET_RESULT', data: { index: index, answer: (wrong === true ? 0 : 1) } });
            setTimeout(() => {
                dispatch({ type: 'CLOSE_POPUP' });
                if (currentNum < maxNum - 1) {
                    onChangeStage(currentNum + 1);
                } else {
                    //로딩
                    dispatch({ type: 'LOADING', data: { isLoading: true } });
                    //결과창 오픈
                    setTimeout(() => {
                        dispatch({ type: 'LOADING', data: { isLoading: false } });
                        dispatch({ type: 'SHOW_RESULT' })
                    }, 1000)
                }
            }, 800)
        }
    }

    const closeResultPopup = () => {
        props.history.push('/study');
    }
    //UseEffect
    useEffect(() => {
        //결과 데이터를 갯수에 맞게 미리 생성
        async function fetchData() {
            await axios.get('/api/admin/getSubCategoryQuizItems?id=' + match.params.id)
            .then((result) => {
                if(result.data.list.length < 1){
                
                    dispatch({ type: 'LOADING', data: { isLoading: false } });       
                }else{
                    //데이터
                    setTitle(result.data.title);
                    dispatch({ type: 'CREATE_DATA', data: { list: result.data.list } });
                    dispatch({ type: 'SET_COUNT', data: { count: 0 } });
                    dispatch({ type: 'LOADING', data: { isLoading: false } });                   
                }                
            })
        }
        fetchData();

        return () => {
            console.log('메인컴포넌트가 사라짐');
        }
    }, [ match.params.id  ]);  //절대 다시 실행하지 않는다

    return (
        <>
            <div className={`${styles["wrap-study"]}`}>
                {popupType === 'result' ? (
                    <StudyResut
                        title={title}
                        open={popupType === 'result' ? true : true}
                        list={resultData}
                        close={closeResultPopup} />
                ) : (
                        <>
                            <BtnNavigation text= {title} link={'../study'} iconURL='/svg/back.svg'/>
                            <section>
                                {isLoading ? (<Loading />) : null}
                                {/**결과페이지**/}
                                <section>
                                    <Navigation number={currentNum} max={maxNum} onChange={onChangeStage} />
                                </section>

                                {/** 퀴즈페이지 */}
                                <QuizApp data={quiz} handleClick={onClick} />

                                {/** 모달 */}
                                <Modal open={popupOpen} modalType={modalType} close={(e) => dispatch({ type: 'CLOSE_POPUP' })}>
                                    {popupType === 'hint' ? (
                                        <Hint text={quiz.hint} />
                                    ) : null}
                                    {popupType === 'success' ? (
                                        <Success text={quiz.no} />
                                    ) : null}
                                </Modal>
                            </section>
                        </>
                    )}
            </div>
        </>
    )
}

export default StudyApp;

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            const { isLoading } = action.data;
            return {
                ...state,
                isLoading: isLoading
            }
        case 'SUCCESS':
            return {
                ...state,
                popupOpen: true,
                popupType: 'success',
                modalType: 'none',
            };
        case 'SET_RESULT':
            const { index, answer } = action.data;
            return {
                ...state,
                resultData: state.resultData.map(item =>
                    item.index === index ? { ...item, answer: (item.answer === 0 ? 0 : answer) } : item
                )
            }
        case 'HIT':
            return {
                ...state,
                popupOpen: false,
                popupType: 'hint',
                //modalType: 'box'
            }
        case 'CLOSE_POPUP':
            return {
                ...state,
                popupOpen: false,
            }
        case 'SHOW_RESULT':
            return {
                ...state,
                popupOpen: true,
                popupType: 'result'
            }
        case 'HIDE_RESULT':
            return {
                ...state,
                popupOpen: false,
                popupType: 'none'
            }
        case 'CREATE_DATA':
            const { list } = action.data;
            return {
                ...state,
                lists: list,
                resultData: createResultData(list.length),
                currentNum: 0,
                maxNum: list.length
            }
        case 'SET_COUNT':
            const { count } = action.data;
            return {
                ...state,
                currentNum: count,
                quiz: {
                    no: count,
                    qustionText: state.lists[count].qustion,
                    answer: state.lists[count].answer,
                    hint: state.lists[count].hint
                }
            }
        default:
            return {
                ...state,
                popupOpen: false,
            }
    }
}

//결과 데이터를 갯수에 맞게 미리 생성
const createResultData = (len) => {
    console.log('--------------createResult', len)
    let arr = [];
    for (var i = 0; i < len; i++) {
        arr.push({ index: i, answer: 2 });
    }
    return arr;
}
