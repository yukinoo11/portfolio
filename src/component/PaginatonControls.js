import React from 'react'
import styles from './component.module.css';

const PaginatonControls = ({PerPage, usersLength, handleCLick}) => {
  
  const pageNumbers = [];

    for(let i=1; i<=Math.ceil(usersLength / PerPage); i++)
    {
      pageNumbers.push(i)
    }

  return (
    <div className= { styles.paginationControls }>
      <button className= {`${styles.pageBtn} ${styles.left}`}>&laquo;</button>
      {pageNumbers.map(number => (
        <button key={number} className= { styles.pageBtn }>
          {number}
        </button>
        )
      )}
      <button className= {` ${styles.pageBtn} ${styles.right}`}>&raquo;</button>
    </div>
  )
}

export default PaginatonControls;