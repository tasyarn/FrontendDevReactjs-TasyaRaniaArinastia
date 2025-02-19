import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function RestaurantMap({ latitude, longitude, name }) {
  return (
    <MapContainer center={[latitude, longitude]} zoom={15} className="h-64 w-full rounded-lg shadow-md">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default RestaurantMap;
