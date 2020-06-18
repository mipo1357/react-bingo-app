import React, { useState, useEffect } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  mainPaper: {
    minWidth: 200,
    minHeight: 200,
    backgroundColor: '#3f51b5',
  },
  mainPaper2: {
    minWidth: 200,
    minHeight: 200,
    backgroundColor: '#f50057',
  },
  mainNumber: {
    fontSize: 130,
    fontWeight: 500,
    color: 'white',
  },
  noHitPaper: {
    minWidth: 30,
    minHeight: 30,
    backgroundColor: '#3f51b5',
    color: 'white',
    fontSize: 18,
  },
  hitPaper: {
    minWidth: 30,
    minHeight: 30,
    backgroundColor: '#f50057',
    color: 'white',
    fontSize: 18,
  },
});

function App() {
  const classes = useStyles();
  const [drawNumber, setDrawNumber] = useState<number>();
  const [hitNumber, setHitNumber] = useState<number[]>([]);
  const [noHitNumber, setNoHitNumber] = useState<number[]>(
    [...Array(75).keys()].map((i) => ++i)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const effectCallback = () => {
    if (isLoading) {
      let drawing = setInterval(() => {
        setDrawNumber(
          noHitNumber[Math.floor(Math.random() * noHitNumber.length)]
        );
      }, 70);
      return () => clearInterval(drawing);
    } else {
      let hit: number[] = noHitNumber.filter((value) => {
        return drawNumber === value;
      });
      let hitArray: number[] = hitNumber.concat(hit);
      let nohitArray = noHitNumber.filter((value) => {
        return !(drawNumber === value);
      });
      setHitNumber(hitArray);
      setNoHitNumber(nohitArray);
    }
  };

  useEffect(effectCallback, [isLoading]);

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item container justify="center">
            {isLoading ? (
              <Paper className={classes.mainPaper}>
                <div className={classes.mainNumber}>{drawNumber}</div>
              </Paper>
            ) : (
              <Paper className={classes.mainPaper2}>
                <div className={classes.mainNumber}>{drawNumber}</div>
              </Paper>
            )}
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            {isLoading ? (
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setIsLoading(false);
                  }}
                >
                  Stop
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setIsLoading(true);
                  }}
                >
                  Start
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  setDrawNumber(undefined);
                  setHitNumber([]);
                  setNoHitNumber([...Array(75).keys()].map((i) => ++i));
                  setIsLoading(false);
                }}
              >
                RESET
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            {noHitNumber.map((number) => (
              <Grid item>
                <Paper className={classes.noHitPaper}>{number}</Paper>
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            {hitNumber.map((number) => (
              <Grid item>
                <Paper className={classes.hitPaper}>{number}</Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
