import React, { useState } from "react";
import styled from "styled-components";
import { IMAGE_BASE_URL } from "../constants";
import ReactPaginate from "react-paginate";

const MovieListContainer = styled.div`
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  .pagination-container {
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
        background-color: #0755a8;
      }
    }

    a {
      padding: 8px 12px;
      background-color: #007bff;
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

const CustomPagination = styled(ReactPaginate)`
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

  a {
    padding: 8px 12px;
    background-color: #007bff;
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
`;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 10; // Change this value as per your requirement
  const startIndex = currentPage * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const displayedMovies = movies.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <>
      <MovieListContainer>
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id}>
            <MovieImage
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </MovieCard>
        ))}
      </MovieListContainer>
      <PaginationContainer>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          className={"pagination-container"}
          pageCount={Math.ceil(movies?.length / moviesPerPage)}
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
