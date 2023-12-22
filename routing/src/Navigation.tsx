import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ marginLeft: "auto" }}>
          <Link
            to="/"
            style={{
              color: "inherit",
              textDecoration: "none",
              marginRight: "15px",
            }}
          >
            Home Page
          </Link>
          <Link
            to="/main"
            style={{
              color: "inherit",
              textDecoration: "none",
              marginRight: "15px",
            }}
          >
            Main Page
          </Link>
          <Link
            to="/profile"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Profile Page
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
