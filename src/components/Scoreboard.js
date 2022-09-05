import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

export default function ScoreBoard(props) {
  return (
    <Box>
      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="scoreboard table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Naam</TableCell>
              <TableCell align="right">Gekozen</TableCell>
              <TableCell align="right">Behaald</TableCell>
              <TableCell align="right">Punten</TableCell>
              <TableCell align="right">Totaal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.scores.map((score) => (
              <TableRow
                key={score.playerId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {
                    props.players.find((player) => player.id === score.playerId)
                      .name
                  }
                </TableCell>
                <TableCell align="right">{score.chosenTricks}</TableCell>
                <TableCell align="right">{score.actualTricks}</TableCell>
                <TableCell align="right">{score.added}</TableCell>
                <TableCell align="right">{score.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={props.onClick}>
        Volgende ronde
      </Button>
    </Box>
  );
}
