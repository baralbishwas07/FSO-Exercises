import PhoneBook from "./Phonebook"

const Persons = ({nameToShow, deletePhoneBook}) => {
    return (
        <div>
            {nameToShow.map(person => 
                <PhoneBook 
                    id={person.id}
                    key={person.id} 
                    name={person.name} 
                    number={person.number}
                    deletePhoneBook={deletePhoneBook}
                />
            )}
        </div>
    )
}

export default Persons