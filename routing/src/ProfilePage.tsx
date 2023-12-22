import { Typography, Paper, Container } from "@mui/material";

function ProfilePage() {
  return (
    <Container>
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h3">Profile Page</Typography>
        <p>Your profile information goes here.</p>
      </Paper>
    </Container>
  );
}

export default ProfilePage;
