import { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurantAPI";
import RestaurantList from "../components/RestaurantList";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [openNow, setOpenNow] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8); // Menampilkan 8 restoran awal

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
    if (selectedCategory && !restaurant.categories.includes(selectedCategory)) return false;
    return true;
  });

  return (
    <div className="container mx-5">
      {/* Judul */}
      <div className="font-poppins text-gray-900">
        <h1 className="text-[50px] font-regular">Restaurant</h1>
        <p className="text-lg">
          Please choose your favorite restaurant and enjoy a variety of delicious dishes with an unforgettable dining experience. 
          Find the perfect place that matches your taste and desired ambiance! 🍽️✨
        </p>
      </div>

      {/* Filter */}
      <div className="border-t border-b mb-4 mt-2 flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold">Filter By :</span>

          {/* Open Now */}
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={openNow}
              onChange={() => setOpenNow(!openNow)}
              className="appearance-none w-5 h-5 border-2 border-gray-500 rounded-full checked:bg-blue-500 checked:border-blue-500 mr-2"
            />
            Open Now
          </label>

          {/* Price */}
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Price</option>
            <option value="$">Affordable</option>
            <option value="$$">Moderate</option>
            <option value="$$$">Expensive</option>
          </select>

          {/* Categories */}
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

        {/* Clear All */}
        <button
          onClick={() => {
            setOpenNow(false);
            setSelectedPrice("");
            setSelectedCategory("");
          }}
          className="text-gray-400 border border-gray-400 px-3 py-1 rounded-md hover:bg-gray-100"
        >
          CLEAR ALL
        </button>
      </div>

      {/* Daftar Restoran */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <RestaurantList restaurants={filteredRestaurants.slice(0, visibleCount)} />

          {/* Tombol Load More */}
          {visibleCount < filteredRestaurants.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setVisibleCount(visibleCount + 8)}
                className="border border-blue-900 px-5 py-2 rounded-md w-[500px] hover:bg-gray-100"
              >
                LOAD MORE
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
