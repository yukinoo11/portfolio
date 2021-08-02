import React from "react";

const ListView = ( props ) => {
    const { data, handleDelete , handleModifyBtn} = props;
    return(
        <>
        <div className='content-view'>
            <div className='row'>
                <div className='block'>
                    <label>quKey</label>
                    <span>{data.qzKey}</span>
                </div>
            </div>

            <div className='row'>
                <div className='block'>
                <label>대분류</label>
                <span>{ data.headTitle }</span></div>
            </div>
            
            <div className='row'>
                <div className='block'>
                <label>소분류</label>
                <span>{ data.subTitle }</span></div>
            </div>

            <div className='row'>
                <div className='block'>
                    <label>문제</label>
                    <span>{data.qustion}</span></div>
            </div>
            <div className='row'>
                <div className='block'>
                    <label>답변</label>
                    <span>
                        {data.answer === 1 ? <img src='/images/study/button_anwer_ok.png' alt='ok' /> : <img src='/images/study/button_anwer_wrong.png' alt='wrong' />}
                    </span>
                </div>
            </div>
            <div className='row'>
                <div className='block'>
                <label>힌트</label>
                <span>{data.hint}</span></div>
            </div>
        </div>
        <div className='footer'>
            <button className='button-color' onClick={(e) => handleDelete( data.qzKey )}>삭제하기</button>
            <button className='button-color' onClick={(e) => handleModifyBtn( data.qzKey )}>수정하기</button>
        </div>
        </>
    )
}

export default ListView;