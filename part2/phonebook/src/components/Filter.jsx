const Filter = ({showName, handleNameChange}) => {
    return(
        <div>
            filter shown with <input value={showName} onChange={handleNameChange}/>
        </div>
    )
}

export default Filter