
import React, { useEffect, useState } from "react";
import styles from './FileRenderer.module.scss';

const FileListRenderer = (props) => {

    const { index, text, path, handleChecked } = props;
    const [ isCheck , setCheck] = useState(false);

    useEffect(()=>{
        setCheck(false);
    },[props.path, props.text ]);

    const handleChange = (e) => {
        setCheck(e.target.checked);
        handleChecked({
            index:index, 
            check : e.target.checked
        });
    }

    return (
        <li>
            <div className={ styles.deleteBtn }>
                <input type='checkbox'
                    onChange={handleChange} 
                    checked = { isCheck } />
            </div>
            <div className= { styles.fileImg}>
                <img src={`${path}/${text}`} title={text} alt={text} />
            </div>
            <div className= { styles.fileName }>
                {text}
            </div>
        </li>
    )
}

export default FileListRenderer;