import RestaurantItem from "./RestaurantItem";

function RestaurantList({ restaurants }) {
  return (
    <div>
      {restaurants.length === 0 ? (
        <p>Tidak ada restoran yang ditemukan.</p>
      ) : (
        restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))
      )}
    </div>
  );
}

export default RestaurantList;
