import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import { TextField, Button, IconButton } from "@mui/material";
import { Search, LocalFireDepartment } from "@mui/icons-material";

function Home() {
  const [input, setInput] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        navigate(`/search/${input}`);
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [input, navigate]);

  return (
    <div className="fadeDiv">
      <h1>Search for any movie you'd like</h1>
      <div>
        <TextField
          sx={{ width: "50vw" }}
          variant="outlined"
          focused
          value={input}
          onChange={(e) => setInput(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => navigate(`/search/${input}`)}>
                <Search />
              </IconButton>
            ),
          }}
        />
      </div>
      <div>
        <Button
          sx={{ marginTop: "10px" }}
          variant="outlined"
          onClick={() => navigate("/trending")}
          startIcon={<LocalFireDepartment />}
        >
          What's trending right now?
        </Button>
      </div>
    </div>
  );
}

export default Home;
