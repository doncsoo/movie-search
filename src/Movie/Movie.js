import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import query from "../extra/query";
import { useQuery } from "@apollo/client";
import {
  Backdrop,
  CircularProgress,
  Button,
  Tooltip,
  IconButton,
  Alert,
  Grid,
  Divider,
  Rating,
  Chip,
} from "@mui/material";
import CrewList from "./components/CrewList/CrewList";
import { Link } from "@mui/icons-material";
import ExpansionPanel from "./components/ExpansionPanel/ExpansionPanel";
import "./Movie.css";

function Movie() {
  let navigate = useNavigate();

  const { movieId } = useParams();
  const [wikipediaSnippet, setWikipediaSnippet] = useState("");

  const { loading, data } = useQuery(query.GetMovieById, {
    variables: { movieId: movieId },
    onCompleted: async (fetchedData) => {
      const data = await query.querySnippetFromWikipedia(
        fetchedData.movie.name
      );
      setWikipediaSnippet(data);
    },
  });

  const genresList = !loading
    ? data?.movie.genres.map((genre) => genre.name).join(", ")
    : null;
  const formattedRevenue = !loading
    ? new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(data?.movie.revenue)
    : null;
  const formattedBudget = !loading
    ? new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(data?.movie.budget)
    : null;
  const rating = !loading ? Number((data?.movie.score / 2).toFixed(1)) : null;
  const releaseDate = !loading
    ? new Date(data?.movie.releaseDate).toISOString().slice(0, 10)
    : null;

  if (loading === true) {
    return (
      <Backdrop sx={{ color: "#fff", zIndex: 1 }} open={true}>
        <CircularProgress />
      </Backdrop>
    );
  } else
    return (
      <div>
        <div className="flexRow">
          <img
            className="moviePoster"
            alt={data.movie.name}
            src={data.movie.img?.url}
          ></img>
          <div className="alignLeftWithMargin">
            <div className="flexRow">
              <h1 className="bottom-space-sm">{data.movie.name}</h1>
              <Tooltip title="List related movies">
                <IconButton
                  sx={{ marginTop: "20px" }}
                  disableRipple
                  size="medium"
                  onClick={() => navigate(`/related/${data.movie.id}`)}
                >
                  <Link />
                </IconButton>
              </Tooltip>
            </div>
            <h3 className="tagline">{data.movie.tagline}</h3>
            <Grid sx={{ marginBottom: "10px" }} container spacing={2}>
              <Grid item xs={4}>
                <h5 className="movieProperty">GENRES</h5>
                <label>{genresList}</label>
              </Grid>
              <Divider orientation="vertical" variant="fullWidth" flexItem />
              <Grid item xs={3}>
                <h5 className="movieProperty">RUNTIME</h5>
                <label>{data.movie.runtime + " minutes"}</label>
              </Grid>
              <Divider orientation="vertical" variant="fullWidth" flexItem />
              <Grid item xs={3}>
                <h5 className="movieProperty">BUDGET</h5>
                <label>{formattedBudget}</label>
              </Grid>
              <Divider orientation="vertical" variant="fullWidth" flexItem />
              <Grid item xs={4}>
                <h5 className="movieProperty">BOX OFFICE</h5>
                <label>{formattedRevenue}</label>
              </Grid>
              <Divider orientation="vertical" variant="fullWidth" flexItem />
              <Grid item xs={3}>
                <h5 className="movieProperty">RELEASE DATE</h5>
                <label>{releaseDate}</label>
              </Grid>
              <Divider orientation="vertical" variant="fullWidth" flexItem />
              <Grid item xs={3}>
                <h5 className="movieProperty">RATING</h5>
                <Rating value={rating} precision={0.1} readOnly />
              </Grid>
              <Divider orientation="vertical" variant="fullWidth" flexItem />
              <Grid item xs={12}>
                <h5 className="movieProperty">KEYWORDS</h5>
                {data.movie.keywords.map((keyword) => (
                  <Chip key={keyword.name} label={keyword.name} />
                ))}
              </Grid>
            </Grid>
            <ExpansionPanel
              title="Overview"
              content={<p>{data.movie.overview}</p>}
            />
            <ExpansionPanel
              title="Inferred information from wikipedia"
              content={
                wikipediaSnippet?.length === 0 ? (
                  <Alert severity="warning">
                    Warning: This may be inaccurate.
                  </Alert>
                ) : (
                  <p>{wikipediaSnippet}</p>
                )
              }
              action={
                <Button
                  variant="outlined"
                  onClick={() =>
                    window.open(
                      `https://en.wikipedia.org/wiki/${data.movie.name}`,
                      "_blank"
                    )
                  }
                >
                  Go to wikipedia article
                </Button>
              }
            />
            <ExpansionPanel
              title="Cast"
              content={<CrewList crew={data.movie.cast} />}
            />
          </div>
        </div>
      </div>
    );
}

export default Movie;
