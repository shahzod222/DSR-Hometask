import { Container, Paper, Typography } from "@mui/material";

function HomePage() {
  return (
    <Container>
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h3">Home Page</Typography>
        <p>Welcome to the Home Page!</p>
      </Paper>
    </Container>
  );
}

export default HomePage;
