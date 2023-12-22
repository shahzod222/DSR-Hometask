import { Typography, Paper, Container } from "@mui/material";

function NotFound() {
  return (
    <Container>
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h3">404 Not Found</Typography>
        <p>Sorry, the page you are looking for does not exist.</p>
      </Paper>
    </Container>
  );
}

export default NotFound;
