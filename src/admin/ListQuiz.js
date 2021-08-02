import React, { useEffect } from "react";
import Table from './../component/table';
import PaginatonControls from './../component/PaginatonControls';

const ListQuiz = (props) => {
    const { list, clickHandler } = props;
    const columns = [{
        Header: 'No',
        accessor: 'no'
    }, {
        /*
            Header : 'Primary Key',
            accessor : 'qzKey'
        },{
        */
        Header: 'Answer',
        accessor: 'answer'
    }, {
        Header: 'Qustion',
        accessor: 'qustion',
        className: 'subject'
        /*
        },{
            Header : 'Hint',
            accessor : 'hint',
            className : 'subject'
        */
    }];

    const onClickItem = (index) => {
        if (clickHandler) clickHandler(index);
        //dispatch({ type: 'SHOW_VIEW' });
    }

    useEffect(() => {
    }, []);

    return (
        <div className='ListQuiz'>
            <div className="page-wrap">Showing {list.length}  entries</div>
            <Table columns={columns} data={list} clickHandler={onClickItem} />
            <div className='paging-wrap'>
                < PaginatonControls PerPage={15} usersLength={list.length} />
            </div>
        </div>
    )
}

export default ListQuiz;

