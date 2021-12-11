import { Card, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { makeStyles, styled } from "@mui/styles";
import CustomizedSteppers from "./status_stepper";
import { DateTime } from "luxon";
import { useTheme } from "@emotion/react";

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
        height: "300px",
        overflowY: "scroll",
    },
    root: { paddingBottom: 0 },
    title: {
        fontSize: "1rem",
        color: "#122740",
        margin: "10px",
    },
    subheader: {
        fontSize: "0.875rem",
        color: "#495869",
        textAlign: "left",
    },
}));

const history = [
    {
        requestId: 1,
        classroomName: "TR1",
        startTime: DateTime.now(),
        endTime: DateTime.now().plus({ hour: 1 }),
        purpose: "Sex",
        logs: [DateTime.now()],
    },
    {
        requestId: 2,
        classroomName: "LT1",
        startTime: DateTime.now().minus({ hour: 2 }),
        endTime: DateTime.now(),
        purpose: "Sex",
        logs: [DateTime.now().minus({ hour: 2 }), DateTime.now()],
    },
];

const HistoryCard = () => {
    const styles = useStyles();
    const gap = { xs: 1, sm: 1.5, lg: 2 };
    return (
        <Grid item>
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
                            <b>Your Previous Requests</b>
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
                                {r.startTime.toFormat("ccc, LLL d") +
                                    " [" +
                                    r.startTime.toLocaleString(
                                        DateTime.TIME_SIMPLE
                                    ) +
                                    " - " +
                                    r.endTime.toLocaleString(
                                        DateTime.TIME_SIMPLE
                                    ) +
                                    "]"}
                            </Typography>
                            <CustomizedSteppers logs={r.logs} />
                        </Card>
                    ))}
                </Stack>
            </Stack>
        </Grid>
    );
};
export default HistoryCard;
