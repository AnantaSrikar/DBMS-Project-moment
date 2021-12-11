import { Card, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { makeStyles, styled } from "@mui/styles";
import CustomizedSteppers from "./status_stepper";
import { DateTime } from "luxon";
import { useTheme } from "@emotion/react";
import { blue, blueGrey, green, grey, red, teal } from "@mui/material/colors";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import Icon from "@mui/material/Icon";

const useStyles = makeStyles(() => ({
    innerCard: {
        border: "2px solid",
        borderColor: "#E7EDF3",
        transition: "0.4s",
        "&:hover": {
            borderColor: "#5B9FED",
        },
    },
    card: {
        border: "2px solid",
        borderColor: "#E7EDF3",
        borderRadius: 8,
        transition: "0.4s",
        minHeight: "600px",
        overflowY: "scroll",
    },
    root: { paddingBottom: 0 },
    title: {
        fontSize: "1rem",
        color: "#122740",
        margin: "10px",
    },
    subheader: {
        fontSize: "1rem",
        color: "#495869",
        textAlign: "left",
        fontWeight: "bold",
    },
    a_btn: {
        transition: "0.4s",
        "&:hover": {
            backgroundColor: green[300],
            color: green[900]
        },
        cursor: 'pointer'
    },
    r_btn: {
        transition: "0.4s",
        "&:hover": {
            backgroundColor: red[300],
            color: red[900]
        },
        cursor: 'pointer'
    }
}));

const history = [
    {
        requestId: 1,
        classroomName: "TR1",
        startTime: DateTime.now(),
        endTime: DateTime.now().plus({ hour: 1 }),
        purpose: "Event",
        logs: [DateTime.now()],
        creator: "Enigma",
    },
    {
        requestId: 2,
        classroomName: "LT1",
        startTime: DateTime.now().minus({ hour: 2 }),
        endTime: DateTime.now(),
        purpose: "Aether",
        logs: [DateTime.now().minus({ hour: 2 }), DateTime.now()],
        creator: "Erudite",
    },
];

const ApprovalCard = () => {
    const styles = useStyles();
    const gap = { xs: 1, sm: 1.5, lg: 2 };
    return (
        <Grid item pr={2}>
            <Stack
                className={styles.card}
                p={{ xs: 0.5, sm: 0.75, lg: 1 }}
                gap={gap}
            >
                <Stack direction="row">
                    <Paper
                        elevation={0}
                        sx={{
                            borderBottom: "2px solid #9daebf",
                            width: "100%",
                            textAlign: "left",
                            borderRadius: "0",
                        }}
                    >
                        <Typography className={styles.title}>
                            <b>Pending Requests</b>
                        </Typography>
                    </Paper>
                </Stack>
                <Stack spacing={1}>
                    {history.map((r) => (
                        <Card
                            variant="outlined"
                            className={styles.innerCard}
                            raised={true}
                        >
                            <Typography
                                className={styles.subheader}
                                style={{
                                    backgroundColor: "#1976d2",
                                    color: "white",
                                    padding: "10px",
                                }}
                            >
                                <b>Request #{r.requestId}</b>
                            </Typography>
                            <Typography
                                className={styles.subheader}
                                sx={{ margin: "10px", marginBottom: "20px" }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    justifyContent="space-between"
                                >
                                    <Stack direction="row" spacing={2}>
                                        <span
                                            style={{
                                                backgroundColor: blueGrey[500],
                                                color: blueGrey[50],
                                                borderRadius: "5px",
                                                padding: "3px",
                                            }}
                                        >
                                            {r.classroomName}
                                        </span>
                                        <span
                                            style={{
                                                backgroundColor: green[500],
                                                color: green[50],
                                                borderRadius: "5px",
                                                padding: "3px",
                                            }}
                                        >
                                            {r.startTime.toFormat("ccc, LLL d")}
                                        </span>
                                        <span
                                            style={{
                                                backgroundColor: teal[500],
                                                color: teal[50],
                                                borderRadius: "5px",
                                                padding: "3px",
                                            }}
                                        >
                                            {r.startTime.toLocaleString(
                                                DateTime.TIME_SIMPLE
                                            ) +
                                                " - " +
                                                r.endTime.toLocaleString(
                                                    DateTime.TIME_SIMPLE
                                                )}
                                        </span>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <Icon sx={{ color: green[500], borderRadius:'5px'}} className={styles.a_btn}>
                                            check
                                        </Icon>
                                        <Icon sx={{ color: red[500],borderRadius: '5px'}}  className={styles.r_btn}>
                                            close
                                        </Icon>
                                        
                                    </Stack>
                                </Stack>
                            </Typography>
                        </Card>
                    ))}
                </Stack>
            </Stack>
        </Grid>
    );
};
export default ApprovalCard;
