const Button = ({className , text, onClick}) => {
    return(
        <>
            <button onClick={onClick} className={className}>{text.replace(/^\w/, (c) => c.toUpperCase())}</button>
        </>
    )
}

export default Button;