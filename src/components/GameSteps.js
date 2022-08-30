import PlayerForm from "./PlayerForm";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import React from "react";

export default class GameSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      steps: [],
    };
    this.savePlayers = this.savePlayers.bind(this);
  }

  savePlayers(players) {
    this.setState({
      players: players,
    });
    this.setSteps(players.length);
  }

  setSteps(nrOfPlayers) {
    const cardsPerPlayer = Math.floor(52 / nrOfPlayers);
    const maxCards = cardsPerPlayer > 10 ? 10 : cardsPerPlayer;
    const steps = [];
    let id = 1;
    for (let i = maxCards; i >= 1; i--) {
      steps.push({ id, nrOfCards: i });
      id++;
    }
    for (let i = 1; i <= maxCards; i++) {
      steps.push({ id, nrOfCards: i});
      id++;
    }

    this.setState({
      steps,
    });
  }

  render() {
    return (
      <Grid item xs={10}>
        <Card>
          <CardContent>
            <PlayerForm
              onSave={(players) => this.savePlayers(players)}
            ></PlayerForm>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}
