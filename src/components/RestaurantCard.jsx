import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col w-full">
      {/* Gambar Restoran */}
      <div className="w-full flex justify-center">
        <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center w-full">
          <img
            src={restaurant.photos[0] || "/assets/no-image.jpg"}
            alt={restaurant.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>

      {/* Informasi Restoran */}
      <div className="mt-2">
        {/* Nama & Rating */}
        <h3 className="text-md font-semibold">{restaurant.name}</h3>
        <div className="text-yellow-500 text-sm">
          {"★".repeat(Math.round(restaurant.rating))}{"☆".repeat(5 - Math.round(restaurant.rating))}
        </div>

        {/* Kategori & Status */}
        <div className="flex justify-between items-center mt-1">
          <p className="text-gray-600 text-sm">{restaurant.categories} • {restaurant.priceRange}</p>
          <span className={restaurant.isOpen ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
            ● {restaurant.isOpen ? "OPEN NOW" : "CLOSED"}
          </span>
        </div>
      </div>

      {/* Tombol "LEARN MORE" Lebar Penuh */}
      <Link to={`/restaurant/${restaurant.id}`} className="mt-3">
        <button className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800">
          LEARN MORE
        </button>
      </Link>
    </div>
  );
};

export default RestaurantCard;
