import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React from "react";

export default function ScoreBoard(props) {
  let scores = props.step.scores
    .sort((scoreA, scoreB) => scoreB.total - scoreA.total)
    .map((score, index) => (
      <TableRow
        key={score.playerId}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell>
          {props.players.find((player) => player.id === score.playerId).name}
        </TableCell>
        <TableCell
          align="right"
          sx={{ display: { md: "table-cell", xs: "none" } }}
        >
          {score.chosenTricks}
        </TableCell>
        <TableCell
          align="right"
          sx={{ display: { md: "table-cell", xs: "none" } }}
        >
          {score.actualTricks}
        </TableCell>
        <TableCell align="right">{score.added}</TableCell>
        <TableCell align="right">{score.total}</TableCell>
      </TableRow>
    ));

  return (
    <Box className="scoreboard">
      <Typography gutterBottom variant="h4" component="h4">
        {"Score ronde: " + props.step.id}
      </Typography>
      <TableContainer>
        <Table
          sx={{ minWidth: 250 }}
          size="small"
          aria-label="scoreboard table"
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Naam</TableCell>
              <TableCell
                align="right"
                sx={{ display: { md: "table-cell", xs: "none" } }}
              >
                Gekozen
              </TableCell>
              <TableCell
                align="right"
                sx={{ display: { md: "table-cell", xs: "none" } }}
              >
                Behaald
              </TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Totaal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{scores}</TableBody>
        </Table>
      </TableContainer>
      {!props.lastStep && (
        <Button variant="contained" onClick={props.onClick}>
          Volgende ronde
        </Button>
      )}
    </Box>
  );
}
