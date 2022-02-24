import '../styles/card-container.css';

const Container = ({ children }) => {
    
    return(
        <div className="card-container">
            {children}
        </div>
    )
}

export default Container;