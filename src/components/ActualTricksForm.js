import DoneIcon from "@mui/icons-material/Done";
import StyleIcon from "@mui/icons-material/Style";
import { CardContent } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import { green } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React from "react";

export default class ActualTricksForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { actualTricks: [] };

    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, playerId) {
    const total = this.state.actualTricks
      .filter((trick) => trick.playerId !== playerId)
      .map((trick) => trick.value)
      .reduce((prev, cur) => prev + cur, 0);
    if (total + event.target.value > this.props.step.nrOfCards) {
      alert(
        "Het totaal aantal behaalde slagen is hoger dan het aantal kaarten."
      );
    }

    this.setState((state) => ({
      actualTricks: state.actualTricks
        .filter((trick) => trick.playerId !== playerId)
        .concat({
          playerId,
          value: event.target.value,
        }),
    }));
  }

  async handleSave() {
    if (this.state.actualTricks.length !== this.props.players.length) {
      alert("Er is nog niet voor alle spelers de behaalde slagen ingevoerd.");
      return;
    }
    const total = this.state.actualTricks
      .map((trick) => trick.value)
      .reduce((prev, cur) => prev + cur, 0);
    if (total > this.props.step.nrOfCards) {
      alert(
        "Het totaal aantal behaalde slagen is hoger dan het aantal kaarten."
      );
      return;
    }
    if (total < this.props.step.nrOfCards) {
      alert(
        "Het totaal aantal behaalde slagen is lager dan het aantal kaarten."
      );
      return;
    }
    this.props.onSave(this.state.actualTricks);
  }

  getValue(player) {
    const trick = this.state.actualTricks.find(
      (trick) => trick.playerId === player.id
    );
    return trick ? trick.value : "";
  }

  render() {
    const selectOptions = [];

    for (let i = 0; i <= this.props.step.nrOfCards; i++) {
      selectOptions.push(
        <MenuItem value={i} key={i} dense={true}>
          {i}
        </MenuItem>
      );
    }

    const tricks = this.props.players.map((player) => (
      <FormControl fullWidth key={player.id}>
        <InputLabel id={"actual-tricks-label-" + player.id}>
          {player.id === this.props.step.dealerId && <StyleIcon></StyleIcon>}{" "}
          {player.name} (gekozen:{" "}
          {
            this.props.step.scores.find((score) => score.playerId === player.id)
              .chosenTricks
          }
          )
        </InputLabel>
        <Select
          labelId={"actual-tricks-label-" + player.id}
          id={"actual-tricks" + player.id}
          label="Aantal slagen"
          value={this.getValue(player)}
          onChange={(event) => this.handleChange(event, player.id)}
        >
          {selectOptions}
        </Select>
      </FormControl>
    ));
    return (
      <>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: green[500] }}>
              <DoneIcon />
            </Avatar>
          }
          disableTypography
          title={<Typography variant="h5">Behaalde slagen</Typography>}
          subheader={
            <Typography variant="h6">
              Aantal kaarten: {this.props.step.nrOfCards}
            </Typography>
          }
        />
        <CardContent>
          <Box className="actual-tricks">
            <form>{tricks}</form>
            <Button variant="contained" onClick={this.handleSave}>
              Bekijk tussenstand
            </Button>
          </Box>
        </CardContent>
      </>
    );
  }
}
