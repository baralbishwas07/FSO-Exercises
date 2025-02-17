const PhoneBook = ({id, name, number, deletePhoneBook}) => {
    return (
    <p>
        {name} {number} <button onClick={() => deletePhoneBook(id)}>delete</button>    
    </p>)
}

export default PhoneBook