import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from './../component/table';
import { get } from 'axios';

const AdminPortfolioList = ( props ) =>{
    const { history } = props;
    const columns = [
    {
        Header: 'No',
        accessor: 'no'
    }, {
        Header: '카테고리',
        accessor: 'category'
    
    },{
        Header : '썸네일',
        accessor : 'image',
        className : 'imageW100'
    
    },{
        Header: '제목',
        accessor: 'title',
        className:'textLeft'
    }, {
    /*
        Header: '날짜',
        accessor: 'date',
    }, {
    */
        Header : '등록날짜',
        accessor : 'createDate'
    }];

    const [ list , setList ] = useState([
        {category:'web', title:'제목', date:'2014년'},
        {category:'web', title:'제목', date:'2014년'}
    ]);

    useEffect(() => {
        async function fetchData() {
            //카테고리
            get('/api/web/list/all').then((result) => {
                let arr =[];
                result.data.list.forEach((item, index) => {
                    arr.push({
                        no : index,
                        PORTFOLIO_NO : item.PORTFOLIO_NO,
                        category : item.PORTFOLIO_CATEGORY,
                        title : item.PORTFOLIO_TITLE,
                        date : `${item.PORTFOLIO_YEAR}년${item.PORTFOLIO_MONTH}월`,
                        link: item.PORTFOLIO_URL,
                        createDate : item.PORTFOLIO_YMD,
                        image : `/imgUploads/${item.IMAGES_NAME}`,
                    })
                })
                setList(arr);
            });
        }
        fetchData();
    }, []);
    
    const styleBtn = {
        display : 'flex',
        marginTop : '10px',
        flexDirection: 'row'
    }
    const handleClickEvt = ( index ) =>{
        history.push(`/admin/portfolio/view/${list[index].PORTFOLIO_NO}`);
    }

    return(
        <div>
            <Table columns={columns} data={list} clickHandler={handleClickEvt}/>
            <div style={styleBtn}>
                    <Link className='button-color' to='/admin/portfolio/Write'>생성하기</Link>
            </div>
        </div>
    )
}

export default AdminPortfolioList;
