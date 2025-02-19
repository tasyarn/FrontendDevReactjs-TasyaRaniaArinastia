import { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurantAPI";
import RestaurantList from "../components/RestaurantList"; // Gunakan RestaurantList, bukan RestaurantCard

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [openNow, setOpenNow] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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
    if (selectedCategory && restaurant.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="container mx-5">
      {/* Judul di kiri */}
      <div className="font-poppins text-gray-900">
        <h1 className="text-[50px] font-regular">Restaurant</h1>
        <p className="text-lg">Nikmati makanan favoritmu dengan tampilan elegan!</p>
      </div>

      {/* Filter di tengah, "Filter By" di kiri, dan "Clear All" di kanan */}
      <div className="border-t border-b mb-4 mt-2 flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold">Filter By :</span>

          {/* Open Now Checkbox (Rounded) */}
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={openNow}
              onChange={() => setOpenNow(!openNow)}
              className="appearance-none w-5 h-5 border-2 border-gray-500 rounded-full checked:bg-blue-500 checked:border-blue-500 mr-2"
            />
            Open Now
          </label>

          {/* Price Dropdown */}
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Price</option>
            <option value="$">Murah</option>
            <option value="$$">Sedang</option>
            <option value="$$$">Mahal</option>
          </select>

          {/* Categories Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Categories</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Casual Dining">Casual Dining</option>
            <option value="Cafe">Cafe</option>
          </select>
        </div>

        {/* Clear All Button */}
        <button
          onClick={() => {
            setOpenNow(false);
            setSelectedPrice("");
            setSelectedCategory("");
          }}
          className="text-red-500 underline"
        >
          Clear All
        </button>
      </div>

      {/* Daftar Restoran (Menggunakan RestaurantList) */}
      {loading ? <p>Loading...</p> : <RestaurantList restaurants={filteredRestaurants} />}
    </div>
  );
}

export default Home;
