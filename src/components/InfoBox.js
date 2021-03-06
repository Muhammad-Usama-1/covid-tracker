import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./../styles/InfoBox.css";
// import { useStateValue } from "./../stateProvider";

const InfoBox = ({ title, cases, active, isRed, total, ...props }) => {
  //   const [{ user }] = useStateValue();

  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
