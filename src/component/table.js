import React from "react";
import styles from './component.module.css';


const Table = ({ columns, data, clickHandler }) => {
    const header = columns.map((obj, index) => {
        return(
            <th key={'th'+index}>{ obj.Header }</th>
        )
    });

    const imgStyle = {
        height : '25px'
    }
    const trStyle = {
        cursor : clickHandler ? 'pointer' : 'none'
    }
    const handleClick = ( i ) => {
        if(clickHandler) clickHandler( i );
    }
    const body = data.map(( obj, index ) => {
        return(
        <tr key={'tr' + index} style={ trStyle } onClick = { (e) => handleClick(index) }>
            { columns.map((col, subindex) => { 
                let value = obj[col.accessor];
                if(col.accessor === 'no'){
                    return(
                        <td key ={index+'_'+subindex} className = { col.className }>{index + 1}</td> 
                    )
                }else if(col.accessor === 'answer'){
                    return(
                        <td key ={index+'_'+subindex} className = { col.className }>
                        { value === 1 ? 
                            <img style={imgStyle} src='/images/study/button_anwer_ok.png' alt='ok' /> : 
                            <img style={imgStyle} src='/images/study/button_anwer_wrong.png' alt='wrong' />
                        }
                        </td>
                    )
                }else if(col.accessor === 'image'){
                    return(
                        <td key ={index+'_'+subindex} className = { col.className }>
                            { value ? (
                                <img src={value} alt='img' /> 
                            ) : null }
                        </td>
                    )
                }else{
                    return(
                        <td key ={index+'_'+subindex} className = { col.className }>{ value }</td> 
                    )
                }
                })
            }
        </tr>
        )
    });

    return(
        <div>
            <table className= { styles.table }>
                <thead>
                    <tr>
                        { header }
                    </tr>
                </thead>
                <tbody>
                    { body }
                </tbody>
            </table>
        </div>
    )
}

export default Table;