import { Grid, Paper, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import BookingCard from "./booking_card";
import HistoryCard from "./history_card";
import TimeTable from "./timetable";
import axios from "axios";

const StudentHome = () => {
    const { username, token, role } = JSON.parse(localStorage.getItem("login"));
    const [schedule, setSchedule] = useState({});
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [pastRequests, setPastRequests] = useState([]);
    const [dateList, setDateList] = useState([])
    const [classList, setClassList] = useState([])
    const [slotList, setSlotList] = useState([])
    useEffect(() => {
        const fetchSchedule = async () => {
            console.log("fetchScheudle");
            const api_sched = await axios.get(
                "https://prjm.srikar.tech/schedule"
            );
            const api_hist = await axios.get(
                "https://prjm.srikar.tech/user/requests",
                {
                    headers: { "Authorization": `Bearer ${token}` },
                    params: {username}
                }
            );
            let history=[]
            Object.keys(api_hist.data).forEach(h=>history.push({requestID: api_hist.data[h].requestID, date: api_hist.data[h].date, room:api_hist.data[h].room, slot: api_hist.data[h].slot }))
            setPastRequests(history);
            let dates = [];
            
            api_sched.data.forEach((item) => dates.push(item.date));
            let processedData = {};
            dates.forEach((date) => (processedData[date] = {}));
            api_sched.data.forEach(({ date, slots }) => {
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
            let slots = Object.keys(Object.values(processedData)[0])
            setSchedule(processedData);
            setDateList(dates)
            setSlotList(slots)
            setClassList(classes)
            setLoading(false);
        };
        fetchSchedule();
    }, []);
    return (
        <Box sx={{ mx: "40px" }}>
            <Grid container spacing={2} mt={5}>
                <Grid item xs={8}>
                    <TimeTable schedule={schedule} dateList={dateList} classList={classList} />
                </Grid>
                <Grid item xs={4}>
                    <Stack
                        spacing={2}
                        sx={{ height: "100%", justifyContent: "flex-start" }}
                    >
                        <BookingCard
                            setPastRequests={setPastRequests}
                            schedule={schedule}
                            loading={loading}
                            failed={failed}
                            setLoading={setLoading}
                            setFailed={setFailed}
                            dateList={dateList}
                            classList={classList}
                            slotList={slotList}
                        />
                        <HistoryCard history={pastRequests}/>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentHome;
