import { gql } from "@apollo/client";

//Query from graphql
const SearchQuery = gql`
  query SearchMovies($term: String!) {
    searchMovies(query: $term) {
      id
      name
      overview
      releaseDate
      img: poster {
        url: custom(size: "w185_and_h278_bestv2")
      }
      score
      runtime
      genres {
        id
        name
      }
    }
  }
`;

const GetMovieById = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      name
      overview
      cast(limit: 10) {
        id
        person {
          name
        }
        role {
          ... on Cast {
            character
          }
        }
      }
      img: poster {
        url: custom(size: "w185_and_h278_bestv2")
      }
      score
      runtime
      genres {
        id
        name
      }
      tagline
      budget
      revenue
      releaseDate
      keywords {
        name
      }
    }
  }
`;

const TrendingQuery = gql`
  query fetchPopular {
    movies: popularMovies {
      id
      name
      overview
      releaseDate
      img: poster {
        url: custom(size: "w185_and_h278_bestv2")
      }
      score
      runtime
      genres {
        id
        name
      }
    }
  }
`;

const RelatedQuery = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      collection(language: English) {
        id
        name
        parts(language: English) {
          id
          name
          overview
          releaseDate
          img: poster {
            url: custom(size: "w185_and_h278_bestv2")
          }
          score
          runtime
          genres {
            id
            name
          }
        }
      }
    }
  }
`;

//Query using Wikipedia TextExtracts API
const querySnippetFromWikipedia = async (movieName) => {
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${movieName}&formatversion=2&exsentences=5&exlimit=1&explaintext=1`,
    { method: "GET" }
  ).then((r) => r.json());
  return response.query.pages[0].extract;
};

export default {
  SearchQuery,
  GetMovieById,
  TrendingQuery,
  RelatedQuery,
  querySnippetFromWikipedia,
};
