import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../api/restaurantAPI";
import { FaStar } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../assets/marker.png"; // Pastikan file marker ada di folder assets

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [32, 32], // Ukuran icon
  iconAnchor: [16, 32], // Posisi anchor (tengah bawah)
  popupAnchor: [0, -32], // Posisi popup
});

// Fungsi untuk generate lokasi random
const getRandomLocation = () => {
  const minLat = -8.0; //Indonesia
  const maxLat = -5.0;
  const minLng = 106.0;
  const maxLng = 110.0;

  return {
    lat: parseFloat((Math.random() * (maxLat - minLat) + minLat).toFixed(6)),
    lng: parseFloat((Math.random() * (maxLng - minLng) + minLng).toFixed(6)),
  };
};

function Detail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [randomLocation, setRandomLocation] = useState(getRandomLocation());
  const [address, setAddress] = useState("Loading address...");

  useEffect(() => {
    async function fetchData() {
      const data = await getRestaurantById(id);
      setRestaurant(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  // Fetch alamat dari OpenStreetMap berdasarkan koordinat random
  useEffect(() => {
    async function fetchAddress() {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${randomLocation.lat}&lon=${randomLocation.lng}&format=json`
        );
        const data = await response.json();
        setAddress(data.display_name || "Address not found");
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Failed to load address");
      }
    }

    fetchAddress();
  }, [randomLocation]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!restaurant) return <p className="text-center text-red-500">Restaurant not found.</p>;

  return (
    <div className="container mx-auto max-w-3xl p-6 bg-white shadow-md rounded-lg">
      {/* Nama & Gambar Restoran */}
      <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
      <p className="text-gray-500">
        {Array.isArray(restaurant.categories) ? restaurant.categories.join(", ") : restaurant.categories || "No Category"}
      </p>

      <div className="mt-4 flex space-x-4">
        {/* Gambar Utama */}
        <img
          src={restaurant.photos?.[0]}
          alt={restaurant.name}
          className="w-2/3 h-64 object-cover rounded-lg shadow-md"
        />

        {/* Gambar Tambahan Manual */}
        <div className="grid grid-cols-2 gap-2 w-1/3">
          <img
            src="../assets/no-image.jpg"
            alt="Food 1"
            className="w-full h-32 object-cover rounded-lg shadow-sm"
          />
          <img
            src="../assets/no-image.jpg"
            alt="Food 2"
            className="w-full h-32 object-cover rounded-lg shadow-sm"
          />
          <img
            src="../assets/no-image.jpg"
            alt="Food 3"
            className="w-full h-32 object-cover rounded-lg shadow-sm"
          />
          <img
            src="../assets/no-image.jpg"
            alt="Food 4"
            className="w-full h-32 object-cover rounded-lg shadow-sm"
          />
        </div>
      </div>


      {/* Detail Informasi */}
      <div className="mt-6 space-y-3 text-gray-700">
        {/* Rating dengan Icon Bintang */}
        <p className="flex items-center">
          <strong className="mr-2">⭐ Rating:</strong>
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-lg ${i < restaurant.rating ? "text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="ml-2 text-gray-700">({restaurant.rating})</span>
        </p>
        
        <p><strong>💰 Price : </strong> {restaurant.priceRange}</p>
        <p><strong>📍 Address : </strong> {address}</p>
        <p><strong>⏰ Status : </strong> {restaurant.isOpen ? "Open Now" : "Closed"}</p>
      </div>

      {/* Peta OpenStreetMap */}
      <div className="mt-5">
        <h2 className="text-2xl font-semibold">Location</h2>
        <div className="h-64 w-full rounded-lg shadow-md overflow-hidden">
          <MapContainer center={[randomLocation.lat, randomLocation.lng]} zoom={10} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[randomLocation.lat, randomLocation.lng]} icon={customIcon}>
              <Popup>{restaurant.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Review */}
      <h2 className="text-2xl font-semibold mt-8">Reviews</h2>
      <div className="mt-4 space-y-4">
        {restaurant.reviews.length === 0 ? (
          <p className="text-gray-500">Belum ada review.</p>
        ) : (
          restaurant.reviews.map((review, index) => (
            <div key={index} className="border p-4 rounded-md shadow-sm bg-gray-100 flex items-start space-x-4">
              {/* Image */}
              <img 
                src={review.image} 
                alt={review.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                {/* Name & Rating */}
                <p className="font-semibold text-gray-800">{review.name} ⭐ {review.rating}</p>
                {/* Text */}
                <p className="text-gray-700">{review.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Detail;
