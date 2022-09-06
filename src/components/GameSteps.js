import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import React from "react";
import ActualTricksForm from "./ActualTricksForm";
import ChooseTricksForm from "./ChooseTricksForm";
import PlayerForm from "./PlayerForm";
import Scoreboard from "./Scoreboard";

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
    this.saveScore = this.saveScore.bind(this);
    this.nextStep = this.nextStep.bind(this);
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

  saveChosenTricks(stepId, tricks) {
    const steps = this.state.steps.slice();
    const step = steps.find((step) => stepId === step.id);
    step.scores = tricks.map((trick) => ({
      playerId: trick.playerId,
      chosenTricks: trick.value,
    }));
    this.setState({
      steps: steps,
    });
  }

  saveScore(stepId, tricks) {
    const step = this.state.steps.find((step) => stepId === step.id);
    const prevStep = this.state.steps.find((step) => step.id === stepId - 1);
    let scores = step.scores.slice();
    scores = tricks.map((trick) => {
      const score = step.scores.find(
        (score) => trick.playerId === score.playerId
      );
      const actualTricks = trick.value;
      const added = this.calculateAddedScore(score.chosenTricks, actualTricks);
      return {
        ...score,
        actualTricks,
        added,
        total: this.calculateTotal(prevStep, trick, added),
      };
    });

    const newSteps = this.state.steps.slice();
    const newStepState = newSteps.find((step) => step.id === stepId);
    newStepState.scores = scores;
    this.setState({
      steps: newSteps,
    });
  }

  calculateAddedScore(chosenTricks, actualTricks) {
    return chosenTricks === actualTricks ? 5 + actualTricks : actualTricks;
  }

  calculateTotal(prevStep, trick, added) {
    const prevScore = prevStep?.scores.find(
      (score) => score.playerId === trick.playerId
    );

    return prevScore ? prevScore.total + added : added;
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
        scores: [],
      });
      id++;
      dealerIndex = this.getDealerIndex(dealerIndex);
    }
    for (let i = 1; i <= maxCards; i++) {
      steps.push({
        id,
        nrOfCards: i,
        dealerId: this.state.players[dealerIndex].id,
        scores: [],
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
      if (step.scores.length === 0) {
        return (
          <ChooseTricksForm
            players={this.state.players}
            step={step}
            onSave={(tricks) => this.saveChosenTricks(step.id, tricks)}
          ></ChooseTricksForm>
        );
      } else if (
        step.scores.length > 0 &&
        typeof step.scores[0].chosenTricks !== "undefined" &&
        typeof step.scores[0].actualTricks !== "undefined"
      ) {
        return (
          <Scoreboard
            players={this.state.players}
            scores={step.scores}
            onClick={this.nextStep}
          ></Scoreboard>
        );
      } else {
        return (
          <ActualTricksForm
            players={this.state.players}
            step={step}
            onSave={(tricks) => this.saveScore(step.id, tricks)}
          ></ActualTricksForm>
        );
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
