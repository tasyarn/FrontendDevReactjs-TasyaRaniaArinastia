import axios from "axios";

// const API_URL = "https://mockapi.io/projects"; // Ganti dengan API yang sesuai
const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getRestaurants = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      return response.data.map(user => ({
        id: user.id,
        name: user.name,
        photos: [`https://picsum.photos/seed/${user.id}/200`], // Gambar random unik untuk tiap restoran
        categories: ["General"],
        rating: Math.floor(Math.random() * 5) + 1,
        priceRange: "$$",
        isOpen: Math.random() > 0.5,
        reviews: [
          { name: "User1", rating: 4, text: "Makanannya enak!" },
          { name: "User2", rating: 5, text: "Pelayanan sangat baik." }
        ]
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
};  
  

export const getRestaurantById = async (id) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      return {
        id: response.data.id,
        name: response.data.name,
        photos: [`https://picsum.photos/seed/${response.data.id}/200`], // Gambar random
        categories: ["General"],
        rating: Math.floor(Math.random() * 5) + 1,
        priceRange: "$$",
        isOpen: Math.random() > 0.5,
        reviews: [
          { name: "User1", rating: 4, text: "Makanannya enak!" },
          { name: "User2", rating: 5, text: "Pelayanan sangat baik." }
        ]
      };
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
      return null;
    }
};
  
  
  