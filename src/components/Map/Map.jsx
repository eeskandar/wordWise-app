import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useCities } from "../../contexts/CitiesContext";
import { useUrlLocation } from "../../hooks/useUrlLocation";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button/Button";

import styles from "./Map.module.css"


function Map() {
  const {cities} = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [mapLat, mapLng] = useUrlLocation();
  const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
      }, [mapLat, mapLng]);
    
  // Here we exclude the navigate function from the dependency array to avoid an infinite loop -also, navigate is a stable function from react, so there's no need to useCallback here
  useEffect (
    function () {
      if (geolocationPosition) {
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        navigate(`/app/form?lat=${geolocationPosition.lat}&lng=${geolocationPosition.lng}`);}
  }, [geolocationPosition]);
  
  
  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>{isLoadingPosition ? "Loading..." : "Use my position"}</Button>
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      <ChangeCenter position={mapPosition} />
      <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter ({position}) {
  const map = useMap()
  map.setView(position, 6)
  return null
}

function DetectClick () {
  const navigate = useNavigate()

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
  return null
}


export default Map
