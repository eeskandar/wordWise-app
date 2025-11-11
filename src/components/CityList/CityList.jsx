import { useCities } from "../../contexts/CitiesContext"
import Spinner from "../Spinner/Spinner"
import Message from "../Message/Message"
import CityItem from "../CityItem/CityItem"

import styles from "./CityList.module.css"


function CityList() {
  const {cities, isLoading} = useCities();
  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map"/>

  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </div>
  )
}


export default CityList
