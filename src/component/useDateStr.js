const useDateString = ( year, month ) => {    
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    
    let str ='';

    if(month){
        str = `${monthNames[ month ]} , `;
    }

    str  += `${year}`;
    return str;
}

export default useDateString;