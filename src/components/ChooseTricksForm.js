import QuizIcon from "@mui/icons-material/Quiz";
import StyleIcon from "@mui/icons-material/Style";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React from "react";
import { grey } from "@mui/material/colors";

export default class ChooseTricksForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosenTricks: [] };

    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, playerId) {
    if (!this.amountOfTricksValid(event.target.value, playerId)) {
      alert(
        "Totaal van gekozen slagen mag niet gelijk zijn aan aantal kaarten"
      );
      return;
    }
    this.setState({
      chosenTricks: this.state.chosenTricks
        .filter((trick) => trick.playerId !== playerId)
        .concat({
          playerId,
          value: event.target.value,
        }),
    });
  }

  async handleSave() {
    if (this.state.chosenTricks.length !== this.props.players.length) {
      alert("Nog niet alle spelers hebben hun slagen gekozen");
      return;
    } else if (!this.amountOfTricksValid()) {
      alert(
        "Totaal van gekozen slagen mag niet gelijk zijn aan aantal kaarten"
      );
      return;
    } else {
      this.props.onSave(this.state.chosenTricks);
    }
  }

  getValue(player) {
    const trick = this.state.chosenTricks.find(
      (trick) => trick.playerId === player.id
    );
    return trick ? trick.value : "";
  }

  amountOfTricksValid(value, playerId) {
    const totalChosen = this.state.chosenTricks
      .filter((trick) => trick.playerId !== playerId)
      .map((trick) => trick.value)
      .reduce((prev, cur) => prev + cur, 0);
    const playersChosen = this.state.chosenTricks.filter(
      (trick) => trick.playerId !== playerId
    );

    if (
      (playersChosen.length === this.props.players.length - 1 ||
        playersChosen.length === this.props.players.length) &&
      totalChosen + value === this.props.step.nrOfCards
    ) {
      return false;
    }
    return true;
  }

  render() {
    const selectOptions = [];

    for (let i = 0; i <= this.props.step.nrOfCards; i++) {
      selectOptions.push(
        <MenuItem value={i} key={i} dense>
          {i}
        </MenuItem>
      );
    }

    const tricks = this.props.players.map((player) => (
      <FormControl fullWidth key={player.id}>
        <InputLabel id={"choose-tricks-label-" + player.id}>
          {player.name}{" "}
          {player.id === this.props.step.dealerId && <StyleIcon></StyleIcon>}
        </InputLabel>
        <Select
          labelId={"choose-tricks-label-" + player.id}
          id={"choose-tricks" + player.id}
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
            <Avatar sx={{ bgcolor: grey[500] }}>
              <QuizIcon />
            </Avatar>
          }
          title={<Typography variant="h5">Kies aantal slagen</Typography>}
          subheader={
            <Typography variant="h6">
              Aantal kaarten: {this.props.step.nrOfCards}
            </Typography>
          }
        />
        <CardContent>
          <Box className="choose-tricks">
            <form>{tricks}</form>
            <Button variant="contained" onClick={this.handleSave}>
              Start ronde
            </Button>
          </Box>
        </CardContent>
      </>
    );
  }
}
