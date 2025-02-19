import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../api/restaurantAPI";
import { FaStar } from "react-icons/fa";

function Detail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getRestaurantById(id);
      setRestaurant(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!restaurant) return <p className="text-center text-red-500">Restaurant not found.</p>;

  return (
    <div className="container mx-auto max-w-3xl p-6 bg-white shadow-md rounded-lg">
      {/* Nama & Gambar Restoran */}
      <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
      <p className="text-gray-500">
        {Array.isArray(restaurant.categories) ? restaurant.categories.join(", ") : restaurant.categories || "No Category"}
      </p>

      <div className="mt-4">
        <img
          src={restaurant.photos[0]}
          alt={restaurant.name}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
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
        
        <p><strong>💰 Price:</strong> {restaurant.priceRange}</p>
        <p><strong>📍 Address:</strong> {restaurant.address}</p>
        <p><strong>⏰ Status:</strong> {restaurant.isOpen ? "Open Now" : "Closed"}</p>
      </div>

      {/* Review */}
      <h2 className="text-2xl font-semibold mt-8">Reviews</h2>
      <div className="mt-4 space-y-4">
        {restaurant.reviews.length === 0 ? (
          <p className="text-gray-500">Belum ada review.</p>
        ) : (
          restaurant.reviews.map((review, index) => (
            <div key={index} className="border p-4 rounded-md shadow-sm bg-gray-100">
              <p className="font-semibold text-gray-800">{review.name} ⭐ {review.rating}</p>
              <p className="text-gray-700">{review.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Detail;
