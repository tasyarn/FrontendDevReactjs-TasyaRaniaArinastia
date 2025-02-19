import { Link } from "react-router-dom";

function RestaurantItem({ restaurant }) {
  return (
    <div className="restaurant-card">
      <img src={restaurant.photos[0]} alt={restaurant.name} width="100" />
      <h2>{restaurant.name}</h2>
      <p>Kategori: {restaurant.categories[0]}</p>
      <p>Rating: {restaurant.rating} ⭐</p>
      <p>Harga: {restaurant.priceRange}</p>
      <p>Status: {restaurant.isOpen ? "Buka" : "Tutup"}</p>
      <Link to={`/restaurant/${restaurant.id}`}>Lihat Detail</Link>
    </div>
  );
}

export default RestaurantItem;
