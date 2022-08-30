import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import PlayerForm from "./PlayerForm";

const StepCard = () => {
  return (
    <Grid item xs={10}>
      <Card>
        <CardContent>
          <PlayerForm></PlayerForm>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StepCard;
