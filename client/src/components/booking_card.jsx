import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Filters from "./filters";
import { useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles(() => ({
    card: {
        border: "2px solid",
        borderColor: "#E7EDF3",
        borderRadius: 8,
        transition: "0.4s",
        "&:hover": {
            borderColor: "#5B9FED",
        },
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
    },
}));

const BookingCard = (props) => {
    const styles = useStyles();
    const [room, setRoom] = useState('dis');
    const [date, setDate] = useState(props.dateList[0]);
    const [slot, setSlot] = useState(props.slotList[0]);
    const [schedule, setSchedule]=useState({})
    const [classList, setClassList] = useState([])
    const [applied, setApplied]=useState(false)
    const [prp, setPrp]=useState('')

    useEffect(()=>{
        setSchedule(props.schedule)
    },[])
    const gap = { xs: 1, sm: 1, lg: 1 };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const {username, token, role} = JSON.parse(localStorage.getItem('login'))
        const res=await axios.post('https://prjm.srikar.tech/user/requests', {username, room, date, slot, purpose: prp}, {headers: {'Authorization': `Bearer ${token}`}})
        if (res.message) {
            props.setFailed(true)
        }
        let history=[]
        Object.keys(res.data).forEach(h=>history.push({requestID: h, date: res.data[h].date, room:res.data[h].room, slot: res.data[h].slot, status: res.data[h].status }))
        props.setPastRequests(history)
        setClassList([])
        setRoom('dis')
        setApplied(false)
    };
    const handleChange = (e) => {
        setRoom(e.target.value);
    };

    const filterSchedule = async ({date, minCap, slot}) => {
        const res = await axios.post('https://prjm.srikar.tech/schedule', {date, minCap, slot})
        if (res.message){
            props.setFailed(true)
        }
        setClassList(res)
        setApplied(true)
        setDate(date)
        setSlot(slot)
    }

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
                            <b>Book a classroom</b>
                        </Typography>
                    </Paper>
                </Stack>
                <Container component="main" sx={{ width: "100%" }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1, width:'100%' }}
                        >
                            <Filters applyFilter={filterSchedule} dateList={props.dateList} slotList={props.slotList}/>

                            {/* <Stack direction="row" my={2} spacing={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="date">
                                        Date
                                    </InputLabel>
                                    <Select
                                        labelId="date"
                                        id="date"
                                        value={date || ""}
                                        label="Date"
                                        onChange={(e) => {
                                            setDate(e.target.value);
                                        }}
                                        sx={{ textAlign: "left"}}
                                    >   
                                    {props.dateList ? props.dateList.map(date=><MenuItem value={date}>{date}</MenuItem>) : null}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="slot">
                                        Slot
                                    </InputLabel>
                                    <Select
                                        labelId="slot"
                                        id="slot"
                                        value={slot || ""}
                                        label="Slot"
                                        onChange={(e) => {
                                            setSlot(e.target.value);
                                        }}
                                        sx={{ textAlign: "left" }}
                                    >
                                        {props.slotList ? props.slotList.map(slot=><MenuItem value={slot}>{slot}</MenuItem>) : null}
                                    </Select>
                                </FormControl>
                            </Stack> */}
                            <FormControl fullWidth sx={{mb:2}}>
                                <InputLabel id="demo-simple-select-label">
                                    Room
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={room || ""}
                                    label="Room"
                                    onChange={handleChange}
                                    sx={{ textAlign: "left" }}
                                    disabled={!applied}
                                >
                                    {props.classList ? props.classList.map((classroom) => (
                                        <MenuItem value={classroom}>
                                            {classroom}
                                        </MenuItem>
                                    )):null}
                                    {!applied ? <MenuItem value='dis'>Please apply the filter first</MenuItem>:null}
                                </Select>
                            </FormControl>
                            <TextField
                                id="outlined-multiline-static"
                                label="Purpose"
                                multiline
                                rows={3}
                                placeholder="Enter your reason for requesting the room..."
                                sx={{ width: "100%" }}
                                onChange={(e)=>setPrp(e.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, minWidth: "50%" }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Stack>
        </Grid>
    );
};
export default BookingCard;
