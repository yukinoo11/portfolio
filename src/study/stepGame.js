import React, { useEffect, useState } from 'react'
import styles from './stepGame.module.scss';
import Hint from './Hint';

const QuizApp = (props) => {
    const { data, handleClick } = props;
    const { no, qustionText, answer, hint } = data;
    const [hintOpen, setHintOpen] = useState(false);

    useEffect(() => {
        console.log('StepGame 컴포넌트가 화면에 나타남');
        return () => {
            setHintOpen(false)
            console.log('StepGame 컴포넌트가 화면에 사라짐');
        }
    }, [ data ]);

    //답변버튼 클릭
    const onClick = (isAnswer) => {

        if (isAnswer !== answer) {
            setHintOpen(true);
        } else {
            handleClick({ index: no, wrong: isAnswer === answer ? false : true });
        }
    }

    return (
        <>
            <div className={`${styles['quiz-wrap']}`}>
                {/* 질문 */}
                <div className={`${styles['qustions-Container']}`}>
                    <div className={`${styles['qustions-Text']}`}>
                        <Qustion text={qustionText} />
                    </div>
                </div>
                <div className={styles.hintContainer}>
                    {hintOpen ? (
                        <Hint text={hint} />
                    ) : null}            
                </div>
                {/* 답변 OX */}
                <div className={`${styles["answer-container"]}`}>
                    <Answer handleClick={onClick} />
                </div>
            </div>
        </>
    )
}

export const Success = (props) => {
    return (
        <div className='reuslt-wrap'>
            <span><img src='/images/study/button_anwer_ok.png' alt='img' /></span>
            <span>정답입니다.</span>
        </div>
    )
}

const Qustion = ({ text }) => {
    const [animate, setAnimate] = useState('');
    useEffect(() => {

        setAnimate('fadeIn');
        const id = setTimeout(() => {
            setAnimate('');
        }, 500);

        return () => {
            //setAnimate(false);
            setAnimate('fadeOut');
            clearTimeout(id);
        }
    }, [text]);

    return (
        <div className={`${styles['qustion-tx']} ${animate}`}>
            {text}
        </div>
    )
}

const Answer = ({ handleClick }) => {
    return (
        <div className={`${styles["answer-container"]}`}>
            <div className={`${styles["answer-icon"]}`}>
                <button className={styles.blue} onClick={(e) => handleClick(1)}>
                    <img src="/images/study/button_anwer_ok.png" alt="정답" />
                </button>
            </div>
            <div className={`${styles["answer-icon"]}`}>
                <button className={styles.red} onClick={(e) => handleClick(0)}>
                    <img src="/images/study/button_anwer_wrong.png" alt="오답" />
                </button>
            </div>
        </div>
    )
}

export default QuizApp;
