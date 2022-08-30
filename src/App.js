import "./App.scss";
import StepCard from "./components/StepCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function App() {
  return (
    <div>
      <Container>
        <Box paddingY={1}>
          <Typography variant="h1" component="h1" gutterBottom>
            Boerenbridge Scorebord
          </Typography>
        </Box>
        <Grid container spacing={5}>
          <StepCard />
        </Grid>
      </Container>
    </div>
  );
}

export default App;
