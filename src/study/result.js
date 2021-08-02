import React, { useEffect } from 'react'

const StudyResut = ( props ) =>{
    const { title, open , list, close } = props;
    const renderers = list.map((item, index) => {
        let styleName = '';
        if(item.answer === 1){
            styleName = 'right';
        }else if(item.answer === 2){
            styleName = '';
        }else{
            styleName= 'wrong';
        }
        return(
            <div key={index} className={`${'result-item'} ${styleName}`}>{ item.index }</div>
        )
    
    });

    useEffect(() => {
        console.log('Result 컴포넌트가 화면에 나타남');
        return() =>{
            console.log('Result 컴포넌트가 화면에 사라짐');
        }
    });

    return(
        <div className = 'result-box'>
            { open ? (
                <>
                <header>
                    <h1>{ title }</h1>
                    <button onClick={close}>&times;</button>
                </header>
                <section>
                    <div className='result-box-inner'>
                        { renderers }
                    </div>
                </section>
                <footer>
                    수고하셨습니다.
                </footer>
                </>
            ) : null}
        </div>
    )
}

export default StudyResut;