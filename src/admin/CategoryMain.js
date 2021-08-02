import React, { useEffect, useState } from "react";
import AddComboBox from './../component/addComboBox';
const CategoryMain = () => {

    const [ isBoolean , setBoolean ] = useState(false);

    useEffect(() => {
    }, [ isBoolean ])

    //카테고리추가 버튼을 클릭
    const handleSubmitCategory = () => {
        //초기화
        setBoolean(!isBoolean)
    }

    return(
        <AddComboBox handleSubmit={handleSubmitCategory} />        
    )
}

export default CategoryMain;