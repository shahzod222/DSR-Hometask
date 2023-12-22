import { Typography, Paper, Container } from "@mui/material";

function MainPage() {
  return (
    <Container>
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h3">Main Page</Typography>
        <p>This is the Main Page.</p>
      </Paper>
    </Container>
  );
}

export default MainPage;
