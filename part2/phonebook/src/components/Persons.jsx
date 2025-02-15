import PhoneBook from "./phonebook"

const Persons = ({nameToShow}) => {
    return (
        <div>
            {nameToShow.map(person => 
                <PhoneBook key={person.id} name={person.name} number={person.number}/>
            )}
        </div>
    )
}

export default Persons