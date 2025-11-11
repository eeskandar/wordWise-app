import { useCities } from "../../contexts/CitiesContext";
import Spinner from "../Spinner/Spinner"
import Message from "../Message/Message"
import CountryItem from "../CountryItem/CountryItem"

import styles from "./CountryList.module.css"


function CountryList() {
  const {cities, isLoading, handleDelete} = useCities();

  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map"/>

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, {country: city.country, emoji: city.emoji}]
    } else {
      return arr
    }
  }, [])

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} handleDelete={handleDelete}/>
      ))}
    </div>
  )
}


export default CountryList
