import React, { useState } from "react";
import "normalize.css";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import { useQuery, useQueryClient } from "react-query";
import { searchMovies } from "./services/api";
import "./index.css";

const AppContainer = styled.div`
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
`;

const App: React.FC = () => {
  const [searchQuery] = useState("a");
  const queryClient = useQueryClient();

  // Handle the search functionality
  const handleSearch = async (query: string) => {
    const movieResults = await searchMovies(query); // Call the searchMovies function with the query
    queryClient.setQueryData(["movies", searchQuery], movieResults);
  };

  // Fetch movies data using the useQuery hook
  const {
    isLoading,
    isError,
    data: movies,
    error,
  } = useQuery(["movies", searchQuery], () => searchMovies(searchQuery));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <AppContainer>
      <Header onSearch={handleSearch} />
      <MovieList movies={movies.results} />
      <Footer />
    </AppContainer>
  );
};

export default App;
