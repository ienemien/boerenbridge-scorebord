import "./App.scss";
import GameSteps from "./components/GameSteps";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function App() {
  return (
    <div>
      <Container>
        <Box paddingY={1}>
          <Typography variant="h3" component="h3" gutterBottom>
            Boerenbridge Scorebord
          </Typography>
        </Box>
        <Grid container spacing={5}>
          <GameSteps />
        </Grid>
      </Container>
    </div>
  );
}

export default App;
