import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../api/restaurantAPI";

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

  if (loading) return <p>Loading...</p>;
  if (!restaurant) return <p>Restoran tidak ditemukan.</p>;

  return (
    <div className="container">
      <h1>{restaurant.name}</h1>
      <img src={restaurant.photos[0]} alt={restaurant.name} width="300" />
      <p>Kategori: {restaurant.categories}</p>
      <p>Rating: {restaurant.rating} ⭐</p>
      <p>Harga: {restaurant.priceRange}</p>
      <p>Status: {restaurant.isOpen ? "Buka" : "Tutup"}</p>

      <h2>Review</h2>
      {restaurant.reviews.length === 0 ? (
        <p>Belum ada review.</p>
      ) : (
        restaurant.reviews.map((review, index) => (
          <div key={index} className="review-card">
            <p><strong>{review.name}</strong> ⭐ {review.rating}</p>
            <p>{review.text}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Detail;
