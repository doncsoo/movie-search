import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Movie from "./Movie/Movie";
import SearchResult from "./SearchResult/SearchResult";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const client = new ApolloClient({
  uri: "https://tmdb.sandbox.zoosh.ie/dev/graphql",
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
  },
});

export default function App() {
  return (
    <div className="centerAlign">
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="movies">
                <Route path=":movieId" element={<Movie />} />
                <Route index element={<Home />} />
              </Route>
              <Route path="search">
                <Route path=":searchTerm" element={<SearchResult />} />ű
                <Route index element={<Home />} />
              </Route>
              <Route path="trending" element={<SearchResult trending />} />
              <Route path="related">
                <Route path=":movieId" element={<SearchResult related />} />
                <Route index element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
