import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";

export default class PlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [], newPlayer: "" };

    this.handleChange = this.handleChange.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
  }

  handleChange(event) {
    this.setState({ newPlayer: event.target.value });
  }

  addPlayer() {
    const player = this.state.players.concat([
      {
        id:
          this.state.players.length > 0
            ? this.state.players[this.state.players.length - 1].id + 1
            : 1,
        name: this.state.newPlayer,
      },
    ]);
    this.setState({
      players: player,
      newPlayer: "",
    });
  }

  render() {
    const players = this.state.players.map((player) => <li key={player.id}>{player.name}</li>);
    return (
      <Box className="add-players">
        <Typography gutterBottom variant="h5" component="div">
          Spelers
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
          <Button variant="contained">Start spel</Button>
        </form>
      </Box>
    );
  }
}
