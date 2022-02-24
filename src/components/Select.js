const Select = ({types}) => {
    return(
        <select className="select">
        <option value="all">All</option>
        {types.map((type,index) => {
            return(<option key={index} value={type}>{type}</option>)
        })}
        </select>
    )
}

export default Select;