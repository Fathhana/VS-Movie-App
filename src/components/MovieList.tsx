import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IMAGE_BASE_URL } from "../constants";
import ReactPaginate from "react-paginate";
import { BiCameraMovie } from "react-icons/bi";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const MovieListContainer = styled.div`
  padding: 20px;
  font-size: 1.2em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const MovieCard = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
`;

const MovieImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const NoDataDiv = styled.div`
  text-align: center;

  svg {
    display: block;
    margin: 20px auto;
    font-size: 100px;
    border: 5px solid #a0a0a0;
    padding: 10px;
    border-radius: 15px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;

  .pagination-container {
    padding: 0;

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      padding: 0;
    }

    li {
      margin: 0 5px;
      list-style: none;
      display: inline-block;
    }

    .pagination__link--disabled {
      a {
        background-color: #a0a0a0;
      }
    }

    .pagination__link--active {
      a {
        background-color: #b22222;
      }
    }

    svg {
      polyline {
        stroke: #fff;
      }
    }

    a {
      padding: 8px 12px;
      background-color: #dc143c;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
    }

    .active a {
      background-color: #0056b3;
    }

    .disabled a {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieListProps {
  movies: Movie[];
  currentPage: number;
  searchQuery: string;
  data: any; // Replace with the appropriate data type for your response
  setCurrentPage: (currentPage: number) => void;
  handleSearch: (query: string, page: number) => void; // Add handleSearch prop
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  data,
  setCurrentPage,
  searchQuery,
  handleSearch, // Add handleSearch prop
}) => {
  const [totalMovies, setTotalMovies] = useState(0);
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
    handleSearch(searchQuery, selectedPage.selected + 1); // Call handleSearch with updated page number
  };

  useEffect(() => {
    if (data && data.total_pages) {
      setTotalMovies(data.total_pages);
    }
  }, [data]);

  const pageCount = Math.ceil(totalMovies);

  return (
    <>
      <MovieListContainer>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id}>
              <MovieImage
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </MovieCard>
          ))
        ) : (
          <NoDataDiv>
            <BiCameraMovie />
            <div>No result found</div>
          </NoDataDiv>
        )}
      </MovieListContainer>
      <PaginationContainer>
        <ReactPaginate
          previousLabel={<GrFormPrevious />}
          nextLabel={<GrFormNext />}
          className={"pagination-container"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"paginations"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </PaginationContainer>
    </>
  );
};

export default MovieList;
