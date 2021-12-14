import { Card, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import CustomizedSteppers from "./status_stepper";
import { DateTime } from "luxon";
import { useRole } from "../context";
import { green, red, yellow } from "@mui/material/colors";

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
        marginBottom: "30px",
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

const HistoryCard = (props) => {
    console.log(props.history);
    const [role, handleRole] = useRole();
    const styles = useStyles();
    const gap = { xs: 1, sm: 1.5, lg: 2 };
    return (
        <Grid item>
            <Stack
                className={styles.card}
                sx={{height: '600px', overflowY: 'scroll'}}
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
                    {props.history?props.history.map((r) => (
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
                                <b>Request #{r.requestID}</b>
                            </Typography>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography
                                    className={styles.subheader}
                                    sx={{ fontWeight: 'bold', margin: "10px", padding: '10px', paddingLeft: '0' }}
                                >
                                    {r.date + " [" + r.slot + "]"}
                                </Typography>
                                <Typography
                                    sx={{
                                        backgroundColor:
                                            r.status === "pending"
                                                ? yellow[500]
                                                : r.status === "rejected"
                                                ? red[500]
                                                : green[500],
                                         color:
                                            r.status === "pending"
                                                ? yellow[50]
                                                : r.status === "rejected"
                                                ? red[50]
                                                : green[50],
                                        padding: '10px',
                                        margin: '10px',
                                        borderRadius: '5px'
                                    }}
                                >{r.status}</Typography>
                            </Stack>
                            {/* <CustomizedSteppers logs={r.logs} /> */}
                        </Card>
                    )):null}
                </Stack>
            </Stack>
        </Grid>
    );
};
export default HistoryCard;
