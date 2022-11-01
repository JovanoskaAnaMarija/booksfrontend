import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
      position: "absolute",
      top: 0,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress style={{ color: "#F58634" }} />
    </div>
  );
}
