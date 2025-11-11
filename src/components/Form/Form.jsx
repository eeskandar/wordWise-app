import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlLocation } from "../../hooks/useUrlLocation";
import { useCities } from "../../contexts/CitiesContext";
import DatePicker from "react-datepicker";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";


export function ConvertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const { createCity, isLoading } = useCities();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [emoji, setEmoji] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(function () {
    async function fetchCityData ()  {
      if (!lat && !lng) return;
      try {
        setIsLoadingForm(true);
        setError(null);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.city && !data.locality) throw new Error("No city data found. Please, click somewhere else on the map. ⭐");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(ConvertToEmoji(data.countryCode));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadingForm(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = { cityName, country, emoji, date, notes, position: { lat: Number(lat), lng: Number(lng) } };
    await createCity(newCity);
    navigate("/app/cities");
  }


  if (error) return <Message message={error} />;
  if (isLoadingForm) return <Spinner />;
  if (!lat && !lng) return <Message message="Start by clicking somewhere on the map 🗺️" />;

  return (
  <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
    <div className={styles.row}>
      <label htmlFor="cityName">City name</label>
      <input
        id="cityName"
        onChange={(e) => setCityName(e.target.value)}
        value={cityName}
      />
      <span className={styles.flag}>{emoji}</span>
    </div>

    <div className={styles.row}>
      <label htmlFor="date">When did you go to {cityName}?</label>
      <DatePicker id="date" onChange={date => setDate(date)} selected={date} dateFormat={"dd/MM/yyyy"}/>
    </div>

    <div className={styles.row}>
      <label htmlFor="notes">Notes about your trip to {cityName}</label>
      <textarea
        id="notes"
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
      />
    </div>

    <div className={styles.buttons}>
      <Button type="primary">Add</Button>
      <Button type="back" onClick={(e) => {e.preventDefault(); navigate("/app/cities")}}>&larr; Back</Button>
    </div>
  </form>
  );
}

export default Form;
