import '../styles/btn-container.css'

const ButtonContainer = ({children}) => {
    return(
        <div className={"btn-container"}>
        {children}
        </div>
    )
}

export default ButtonContainer;