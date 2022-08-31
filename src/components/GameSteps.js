import PlayerForm from "./PlayerForm";
import ChooseTricksForm from "./ChooseTricksForm";
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
      currentStep: 0,
    };
    this.savePlayers = this.savePlayers.bind(this);
    this.saveChosenTricks = this.saveChosenTricks.bind(this);
  }

  nextStep() {
    this.setState({
      currentStep: this.state.currentStep + 1,
    });
  }

  async savePlayers(players) {
    await this.setState({
      players: players,
    });
    this.setSteps(players.length);
  }

  saveChosenTricks(tricks) {
    this.setState({
      chosenTricks: tricks,
    });
  }

  async setSteps(nrOfPlayers) {
    const cardsPerPlayer = Math.floor(52 / nrOfPlayers);
    const maxCards = cardsPerPlayer > 10 ? 10 : cardsPerPlayer;
    const steps = [];
    let id = 1;
    let dealerIndex = 0;
    for (let i = maxCards; i >= 1; i--) {
      steps.push({
        id,
        nrOfCards: i,
        dealerId: this.state.players[dealerIndex].id,
        chosenTricks: [],
        score: [],
      });
      id++;
      dealerIndex = this.getDealerIndex(dealerIndex);
    }
    for (let i = 1; i <= maxCards; i++) {
      steps.push({
        id,
        nrOfCards: i,
        dealerId: this.state.players[dealerIndex].id,
        chosenTricks: [],
        score: [],
      });
      id++;
      dealerIndex = this.getDealerIndex(dealerIndex);
    }

    await this.setState({
      steps,
    });

    this.nextStep();
  }

  getDealerIndex(dealerIndex) {
    return dealerIndex + 1 < this.state.players.length ? dealerIndex + 1 : 0;
  }

  renderStep() {
    if (this.state.currentStep === 0) {
      return (
        <PlayerForm
          onSave={(players) => this.savePlayers(players)}
        ></PlayerForm>
      );
    } else {
      const step = this.state.steps.find(
        (step) => step.id === this.state.currentStep
      );
      if (step.chosenTricks.length < 1) {
        return (
          <ChooseTricksForm
            players={this.state.players}
            step={step}
            onSave={(tricks) => this.saveChosenTricks(tricks)}
          ></ChooseTricksForm>
        );
      } else {
        // voer gehaalde slagen in en toon scorebord
      }
    }
  }

  render() {
    const step = this.renderStep();
    return (
      <Grid item xs={10}>
        <Card>
          <CardContent>{step}</CardContent>
        </Card>
      </Grid>
    );
  }
}
