import ReplayIcon from "@mui/icons-material/Replay";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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
    this.startNew = this.startNew.bind(this);
  }

  componentDidMount() {
    const state = window.localStorage.getItem("GAME_STATE");
    if (state) {
      this.setState(JSON.parse(state));
    }
  }

  componentDidUpdate() {
    window.localStorage.setItem("GAME_STATE", JSON.stringify(this.state));
  }

  startNew() {
    window.localStorage.removeItem("GAME_STATE");
    this.setState({
      players: [],
      steps: [],
      currentStep: 0,
    });
  }

  nextStep() {
    this.setState((state) => ({
      currentStep: state.currentStep + 1,
    }));
  }

  savePlayers(players) {
    this.setState(
      {
        players: players,
      },
      () => this.setSteps()
    );
  }

  setSteps() {
    this.setState(
      (state) => ({
        steps: this.createSteps(state),
      }),
      () => this.nextStep()
    );
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

  createSteps(state) {
    const cardsPerPlayer = Math.floor(52 / state.players.length);
    const maxCards = cardsPerPlayer > 10 ? 10 : cardsPerPlayer;
    const steps = [];
    let id = 1;
    let dealerIndex = 0;
    for (let i = maxCards; i >= 1; i--) {
      steps.push({
        id,
        nrOfCards: i,
        dealerId: state.players[dealerIndex].id,
        scores: [],
      });
      id++;
      dealerIndex = this.getDealerIndex(dealerIndex, state.players);
    }
    for (let i = 1; i <= maxCards; i++) {
      steps.push({
        id,
        nrOfCards: i,
        dealerId: state.players[dealerIndex].id,
        scores: [],
      });
      id++;
      dealerIndex = this.getDealerIndex(dealerIndex, state.players);
    }

    return steps;
  }

  getDealerIndex(dealerIndex, players) {
    return dealerIndex + 1 < players.length ? dealerIndex + 1 : 0;
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
            step={step}
            lastStep={step.id === this.state.steps.length}
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
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h3" gutterBottom>
            Boerenbridge Scorebord
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            endIcon={<ReplayIcon />}
            onClick={this.startNew}
          >
            Begin opnieuw
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>{step}</Card>
        </Grid>
      </Grid>
    );
  }
}
