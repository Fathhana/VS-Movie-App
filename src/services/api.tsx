import axios from "axios";

const API_KEY = "685ed9e9a43086a99afd4506615200f9"; // Replace with your MovieDB API key

const API_BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (query: string, page: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
};
