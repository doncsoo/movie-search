import { useParams } from "react-router-dom";
import query from "../extra/query";
import MovieItem from "./components/MovieItem/MovieItem";
import { useQuery } from "@apollo/client";
import { Backdrop, CircularProgress } from "@mui/material";
import "./SearchResult.css";

function SearchResult(props) {
  const { searchTerm, movieId } = useParams();
  const currentQuery = props.trending
    ? query.TrendingQuery
    : props.related
    ? query.RelatedQuery
    : query.SearchQuery;
  const currentVariable = props.related
    ? { movieId: movieId }
    : { term: searchTerm };
  const { loading, data } = useQuery(currentQuery, {
    variables: currentVariable,
  });

  const getMovieData = (list) => {
    let data;
    if (props.trending) data = list.movies;
    else if (props.related) data = list.movie.collection?.parts;
    else data = list.searchMovies;

    if (data === null || data === undefined) data = [];
    return data;
  };

  return (
    <div>
      <Backdrop sx={{ color: "#fff", zIndex: 1 }} open={loading}>
        <CircularProgress />
      </Backdrop>
      <div className="fadeDiv">
        <div className="resultRow">
          <h2 className="searchedFor">you searched for</h2>
          <h1 className="searchTerm">
            {props.trending
              ? "trending movies"
              : props.related
              ? "related movies"
              : searchTerm}
          </h1>
        </div>
        {loading === false ? (
          <ul>
            {getMovieData(data).length === 0 ? (
              <h3>Sorry. There are no results.</h3>
            ) : (
              getMovieData(data).map((movie) => (
                <MovieItem className="fadeDiv" key={movie.id} movie={movie} />
              ))
            )}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default SearchResult;
