import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React from "react";
import StyleIcon from "@mui/icons-material/Style";

export default class ChooseTricksForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosenTricks: [] };

    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(event, playerId) {
    this.setState({
      chosenTricks: this.state.chosenTricks.concat({
        playerId,
        value: event.target.value,
      }),
    });
  }

  async handleSave() {
    this.props.onSave(this.state.chosenTricks);
  }

  getValue(player) {
    const trick = this.state.chosenTricks.find(
      (trick) => trick.playerId === player.id
    );
    return trick ? trick.value : "";
  }

  render() {
    const selectOptions = [];

    for (let i = 0; i <= this.props.step.nrOfCards; i++) {
      selectOptions.push(
        <MenuItem value={i} key={i}>
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
      <Box>
        <Typography gutterBottom variant="h5" component="h5">
          Kies aantal slagen per speler
        </Typography>
        <form>{tricks}</form>
        <Button variant="contained" onClick={this.handleSave}>
          Start ronde
        </Button>
      </Box>
    );
  }
}
