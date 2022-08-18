import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import "./MovieItem.css";

function MovieItem(props) {
  let navigate = useNavigate();

  const rating = Number((props.movie.score / 2).toFixed(1));
  const releaseDate = new Date(props.movie.releaseDate)
    .toISOString()
    .slice(0, 10);
  const genresList = props.movie.genres.map((genre) => genre.name).join(", ");

  return (
    <li>
      <Container
        sx={{ display: "flex" }}
        onClick={() => navigate(`/movies/${props.movie.id}`)}
        maxWidth="sm"
      >
        <img className="smallPoster" alt={props.movie.name} src={props.movie.img?.url}></img>
        <div className="left-space-md">
          <h3 className="movieItemName">{props.movie.name}</h3>
          <div className="flexRow bottom-space-sm">
            <h4 className="movieItemProperty">Released</h4>
            <label>{releaseDate}</label>
          </div>
          <div className="flexRow">
            <h4 className="movieItemProperty">Genres</h4>
            <label>{genresList}</label>
          </div>
          <div className="minutesRatingDiv">
            <div>
              <h2 className="runtime">{props.movie.runtime}</h2>
              <h3 className="noMargin">minutes</h3>
            </div>
            <div>
              <Rating value={rating} precision={0.1} readOnly />
              <h2 className="score">{props.movie.score}</h2>
            </div>
          </div>
        </div>
      </Container>
    </li>
  );
}

export default MovieItem;
