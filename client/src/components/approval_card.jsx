import { Card, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { DateTime } from "luxon";
import { blueGrey, green, red, teal } from "@mui/material/colors";
import Icon from "@mui/material/Icon";
import axios from "axios";

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



const ApprovalCard = (props) => {
    const {username, token} = JSON.parse(localStorage.getItem('login'))
    const submitDecision = async (d, id, room, date, slot) => {
        const res = await axios.post('https://prjm.srikar.tech/admin/requests', {decision: d, username, requestID: id, date, slot, room}, {headers: {'Authorization': `Bearer ${token}`}})
        if (res.message){
            return console.log('error', res.message)
        }
        const api_hist = res.data.requests
        let history=[]
        Object.keys(api_hist).forEach(h=>history.push({requestID: api_hist[h].requestID, date: api_hist[h].date, room:api_hist[h].room, slot: api_hist[h].slot, status: api_hist[h].status}))
        const pr=history.filter(r=>r.status==='pending')
        props.setPendingReqs(pr)
        history=history.filter(r=>r.status!=='pending')
        console.log('HISTORY', history)
        props.setPastRequests(history);
        const api_sched=res.data.schedule
        let dates = [];
        api_sched.forEach((item) => dates.push(item.date));
        let processedData = {};
        dates.forEach((date) => (processedData[date] = {}));
        api_sched.forEach(({ date, slots }) => {
            slots.forEach((slotObj) => {
                const { time, assignedTo, available, classroom } = slotObj;
                if (time==='5:00PM-6:00PM'){
                    return
                }
                if (!processedData[date][time]) {
                    processedData[date][time] = {}
                }
                processedData[date][time][classroom] = {
                    assignedTo,
                    available,
                };
            });
        });
        let classes = Object.keys(
            Object.values(Object.values(processedData)[0])[0]
        );
        classes=classes.map(x=>x.toUpperCase())
        console.log(processedData);
        props.setSchedule(processedData);
        props.setDateList(dates)
        props.setClassList(classes)
    }
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
                    {props.pendingReqs.map((r) => (
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
                                            {r.room}
                                        </span>
                                        <span
                                            style={{
                                                backgroundColor: green[500],
                                                color: green[50],
                                                borderRadius: "5px",
                                                padding: "3px",
                                            }}
                                        >
                                            {r.date}
                                        </span>
                                        <span
                                            style={{
                                                backgroundColor: teal[500],
                                                color: teal[50],
                                                borderRadius: "5px",
                                                padding: "3px",
                                            }}
                                        >
                                            {r.slot}
                                        </span>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <Icon sx={{ color: green[500], borderRadius:'5px'}} className={styles.a_btn} onClick={()=>{submitDecision('accept', r.requestID, r.room, r.date, r.slot)}}>
                                            check
                                        </Icon>
                                        <Icon sx={{ color: red[500],borderRadius: '5px'}}  className={styles.r_btn} onClick={()=>{submitDecision('reject', r.requestID, r.room, r.date, r.slot)}}>
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
