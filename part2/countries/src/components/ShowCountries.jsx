const ShowCountries = ({countries, handleShow}) => {
    return(
        <div>
            {countries.map(country => (
                <p key={country.cca2}>{country.name.common} 
                    <button onClick={() => handleShow(country)}>Show</button>
                </p>
            ))}
        </div>
    )
}

export default ShowCountries