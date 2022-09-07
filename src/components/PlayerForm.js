import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";

export default class PlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [], newPlayer: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
  }

  handleChange(event) {
    this.setState({ newPlayer: event.target.value });
  }

  addPlayer() {
    const players = this.state.players.concat([this.createNewPlayer()]);
    this.setState({
      players,
      newPlayer: "",
    });
  }

  createNewPlayer() {
    return {
      id:
        this.state.players.length > 0
          ? this.state.players[this.state.players.length - 1].id + 1
          : 1,
      name: this.state.newPlayer,
    };
  }

  deletePlayer(id) {
    this.setState({
      players: this.state.players.filter((player) => player.id !== id),
    });
  }

  handleSave() {
    const currentPlayers = this.state.players.concat();
    if (this.state.newPlayer.length > 0) {
      currentPlayers.push(this.createNewPlayer());
    }
    if (currentPlayers.length < 3) {
      alert("Voeg ten minste 3 spelers toe");
    } else if (currentPlayers.length > 8) {
      alert("Te veel spelers, voeg maximaal 8 spelers toe");
    } else {
      this.props.onSave(currentPlayers);
    }
  }

  render() {
    const players = this.state.players.map((player) => (
      <li key={player.id}>
        {player.name}{" "}
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => this.deletePlayer(player.id)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </li>
    ));
    return (
      <Box className="add-players">
        <Typography gutterBottom variant="h5" component="h5">
          Spelers
        </Typography>
        <Typography gutterBottom component="p">
          Voeg minimaal 3 en maximaal 8 spelers toe.
        </Typography>
        <ol>{players}</ol>
        <form className="player-form">
          <TextField
            id="outlined-basic"
            label="Voornaam"
            variant="outlined"
            value={this.state.newPlayer}
            onChange={this.handleChange}
          />
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={this.addPlayer}
          >
            Voeg speler toe
          </Button>
          <Button variant="contained" onClick={this.handleSave}>
            Start spel
          </Button>
        </form>
      </Box>
    );
  }
}
