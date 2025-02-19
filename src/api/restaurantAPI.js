import axios from "axios";

const restaurantImages = [
  "/assets/restaurant1.jpg",
  "/assets/restaurant2.jpg",
  "/assets/restaurant3.jpg",
  "/assets/restaurant4.jpg",
  "/assets/restaurant5.jpg",
  "/assets/restaurant6.jpg",
  "/assets/restaurant7.jpg",
  "/assets/restaurant8.jpg",
  "/assets/restaurant9.jpg",
  "/assets/restaurant10.jpg",
];

const defaultImage = "/assets/no-image.jpg"; // Gambar default jika tidak ada foto

export const getRestaurants = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data.map((user, index) => ({
      id: user.id,
      name: user.name,
      photos: [restaurantImages[index % restaurantImages.length] || defaultImage], // Ambil dari asset
      categories: ["Fast Food", "Casual Dining", "Cafe"][index % 3],
      rating: (Math.random() * 5).toFixed(1),
      priceRange: ["$", "$$", "$$$"][index % 3],
      isOpen: Math.random() > 0.5,
      reviews: [
        { name: "User1", rating: 4, text: "Makanannya enak!" },
        { name: "User2", rating: 5, text: "Pelayanan sangat baik." }
      ],
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getRestaurantById = async (id) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    const index = (id - 1) % restaurantImages.length; // Gunakan index dari array gambar

    return {
      id: response.data.id,
      name: response.data.name,
      photos: [restaurantImages[index] || defaultImage], // Pakai gambar dari asset
      categories: ["Fast Food", "Casual Dining", "Cafe"][index % 3],
      rating: (Math.random() * 5).toFixed(1),
      priceRange: ["$", "$$", "$$$"][index % 3],
      isOpen: Math.random() > 0.5,
      reviews: [
        { name: "User1", rating: 4, text: "Makanannya enak!" },
        { name: "User2", rating: 5, text: "Pelayanan sangat baik." }
      ],
    };
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    return null;
  }
};