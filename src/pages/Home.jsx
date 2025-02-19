import { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurantAPI";
import RestaurantList from "../components/RestaurantList";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [openNow, setOpenNow] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getRestaurants();
      setRestaurants(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (openNow && !restaurant.isOpen) return false;
    if (selectedPrice && restaurant.priceRange !== selectedPrice) return false;
    return true;
  });

  return (
    <div className="container">
      <h1>Daftar Restoran</h1>

      <div>
        <label>
          <input
            type="checkbox"
            checked={openNow}
            onChange={() => setOpenNow(!openNow)}
          />
          Buka Sekarang
        </label>

        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="">Semua Harga</option>
          <option value="$">Murah</option>
          <option value="$$">Sedang</option>
          <option value="$$$">Mahal</option>
        </select>
      </div>

      {loading ? <p>Loading...</p> : <RestaurantList restaurants={filteredRestaurants} />}
    </div>
  );
}

export default Home;
