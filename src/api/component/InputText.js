const InputText = ( props ) => {
    const { name } = props;

    return(
        <input name={ name } onChange={onChange}/>
    )
}

export default InputText;


