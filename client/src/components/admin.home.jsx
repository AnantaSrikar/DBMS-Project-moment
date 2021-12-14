import { Grid, Stack } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ApprovalCard from "./approval_card";
import HistoryCard from "./history_card";
import TimeTable from "./timetable";

const AdminHome = () => {
    const {username, token, role} = JSON.parse(localStorage.getItem('login'))
    const [schedule, setSchedule]=useState({})
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [pastRequests, setPastRequests] = useState([])
    const [pendingReqs, setPendingReqs]=useState([])
    const [dateList, setDateList] = useState([])
    const [classList, setClassList] = useState([])
    useEffect(()=>{
        const fetchSchedule = async () => {
            console.log("fetchScheudle");
            const api_sched = await axios.get(
                "https://prjm.srikar.tech/schedule"
            );
            const api_hist = await axios.get(
                "https://prjm.srikar.tech/admin/requests",
                {
                    headers: { "Authorization": `Bearer ${token}` },
                    params: {username}
                }
            );
            let history=[]
            Object.keys(api_hist.data).forEach(h=>history.push({requestID: api_hist.data[h].requestID, date: api_hist.data[h].date, room:api_hist.data[h].room, slot: api_hist.data[h].slot, status: api_hist.data[h].status, requestor:api_hist.data[h].username }))
            const pr=history.filter(r=>r.status==='pending')
            setPendingReqs(pr)
            history=history.filter(r=>r.status!=='pending')
            console.log('HISTORY', history)
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
            console.log(processedData);
            setSchedule(processedData);
            setDateList(dates)
            setClassList(classes)
            setLoading(false);
        };
        fetchSchedule();
    },[])
    return (
        <Stack spacing={2}>
            <Grid container spacing={2} mt={3}>
                <Grid item xs={7}>
                    <TimeTable schedule={schedule} dateList={dateList} classList={classList} />
                </Grid>
                <Grid item xs={5}>
                    <ApprovalCard pendingReqs={pendingReqs} setPastRequests={setPastRequests} setPendingReqs={setPendingReqs} setSchedule={setSchedule} setClassList={setClassList} setDateList={setDateList} />
                </Grid>
            </Grid>
            <div style={{margin: 'auto', width: '90%' }}>
                <HistoryCard history={pastRequests}/>
            </div>
        </Stack>
    );
};

export default AdminHome;
