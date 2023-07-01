import React, { useState, useEffect } from "react";
import "normalize.css";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import { useQuery, useQueryClient } from "react-query";
import { searchMovies } from "./services/api";
import "./index.css";

const lightTheme = {
  backgroundColor: "#ffffff",
  color: "#000000",
};

const darkTheme = {
  backgroundColor: "#1f1f1f",
  color: "#ffffff",
};

const AppContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
`;

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("a");
  const queryClient = useQueryClient();
  const [themeMode, setThemeMode] = useState("light");
  const [currentPage, setCurrentPage] = useState(0); // State for current page

  // Handle the search functionality
  const handleSearch = async (query: string, page: number) => {
    const movieResults = await searchMovies(query, page); // Call the searchMovies function with the query
    queryClient.setQueryData(["movies", searchQuery], movieResults);
    setSearchQuery(query);
    setCurrentPage(page);
  };

  // Toggle for Light/Dark theme
  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const {
    isLoading,
    isError,
    data: movies,
    error,
  } = useQuery(
    ["movies", searchQuery],
    () => searchMovies(searchQuery, currentPage),
    {
      enabled: false, // Disable the initial fetch
    }
  );

  // Manually trigger the query when searchQuery or currentPage changes
  React.useEffect(() => {
    if (searchQuery || currentPage) {
      queryClient.prefetchQuery(["movies", searchQuery], () =>
        searchMovies(searchQuery, currentPage + 1)
      );
    }
  }, [searchQuery, currentPage, queryClient]);

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <AppContainer>
        <Header
          onSearch={handleSearch}
          toggleThemeMode={toggleThemeMode}
          themeMode={themeMode}
        />
        {!isLoading ? (
          <MovieList
            movies={movies?.results || []}
            data={movies}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
        ) : (
          <div>Loading...</div>
        )}

        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
