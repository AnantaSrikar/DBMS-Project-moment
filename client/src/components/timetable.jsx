import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import React, { useState } from "react";
import { useEffect } from "react";

const dummyData = {
    "21-11-2021": {
        "1700-1800": {
            LT1: {
                available: true,
                assignedTo: null,
            },
            TR1: {
                available: false,
                assignedTo: "Erudite",
            },
            LLT11: {
                available: false,
                assignedTo: "Sports",
            },
            LT2: {
                available: true,
                assignedTo: null,
            },
            TR2: {
                available: true,
                assignedTo: null,
            },
            LH1: {
                available: true,
                assignedTo: null,
            },
            SH1: {
                available: true,
                assignedTo: null,
            },
        },
        "1800-1900": {
            LT1: {
                available: false,
                assignedTo: "Enigma",
            },
            TR1: {
                available: true,
                assignedTo: null,
            },
            LLT11: {
                available: true,
                assignedTo: null,
            },
            LT2: {
                available: true,
                assignedTo: null,
            },
            TR2: {
                available: true,
                assignedTo: null,
            },
            LH1: {
                available: true,
                assignedTo: null,
            },
            SH1: {
                available: true,
                assignedTo: null,
            },
        },
        "1900-2000": {
            LT1: {
                available: false,
                assignedTo: "Enigma",
            },
            TR1: {
                available: true,
                assignedTo: null,
            },
            LLT11: {
                available: true,
                assignedTo: null,
            },
            LT2: {
                available: true,
                assignedTo: null,
            },
            TR2: {
                available: false,
                assignedTo: "Crypto",
            },
            LH1: {
                available: true,
                assignedTo: null,
            },
            SH1: {
                available: false,
                assignedTo: "EIC",
            },
        },
        "2000-2100": {
            LT1: {
                available: true,
                assignedTo: null,
            },
            TR1: {
                available: false,
                assignedTo: "Extra class",
            },
            LLT11: {
                available: false,
                assignedTo: "Extra class",
            },
            LT2: {
                available: true,
                assignedTo: null,
            },
            TR2: {
                available: true,
                assignedTo: null,
            },
            LH1: {
                available: true,
                assignedTo: null,
            },
            SH1: {
                available: true,
                assignedTo: null,
            },
        },
        "2100-2200": {
            LT1: {
                available: true,
                assignedTo: null,
            },
            TR1: {
                available: true,
                assignedTo: null,
            },
            LLT11: {
                available: false,
                assignedTo: "AERO",
            },
            LT2: {
                available: true,
                assignedTo: null,
            },
            TR2: {
                available: false,
                assignedTo: "Erudite",
            },
            LH1: {
                available: true,
                assignedTo: null,
            },
            SH1: {
                available: true,
                assignedTo: null,
            },
        },
        "2200-2300": {
            LT1: {
                available: true,
                assignedTo: null,
            },
            TR1: {
                available: false,
                assignedTo: "BAJA",
            },
            LLT11: {
                available: true,
                assignedTo: null,
            },
            LT2: {
                available: false,
                assignedTo: "Council",
            },
            TR2: {
                available: true,
                assignedTo: null,
            },
            LH1: {
                available: false,
                assignedTo: "Dance",
            },
            SH1: {
                available: true,
                assignedTo: null,
            },
        },
    },
    "22-11-2021": {
        "1700-1800": {
            LT1: {
                available: true,
                assignedTo: null,
            },
            TR1: {
                available: false,
                assignedTo: "Enigma",
            },
            LLT11: {
                available: true,
                assignedTo: null,
            },
            LT2: {
                available: true,
                assignedTo: null,
            },
            TR2: {
                available: true,
                assignedTo: null,
            },
            LH1: {
                available: true,
                assignedTo: null,
            },
            SH1: {
                available: true,
                assignedTo: null,
            },
        },
        "1800-1900": {
            LT1: {
                available: false,
                assignedTo: "Erudite",
            },
            TR1: {
                available: true,
                assignedTo: null,
            },
            LLT11: {
                available: true,
                assignedTo: null,
            },
            LT2: {
                available: true,
                assignedTo: null,
            },
            TR2: {
                available: true,
                assignedTo: null,
            },
            LH1: {
                available: true,
                assignedTo: null,
            },
            SH1: {
                available: true,
                assignedTo: null,
            },
        },
        "1900-2000": {
            LT1: {
                available: true,
                assignedTo: null,
            },
            TR1: {
                available: true,
                assignedTo: null,
            },
            LLT11: {
                available: true,
                assignedTo: null,
            },
            LT2: {
                available: true,
                assignedTo: null,
            },
            TR2: {
                available: true,
                assignedTo: null,
            },
            LH1: {
                available: true,
                assignedTo: null,
            },
            SH1: {
                available: true,
                assignedTo: null,
            },
        },
        "2000-2100": {
            LT1: {
                available: true,
                assignedTo: null,
            },
            TR1: {
                available: true,
                assignedTo: null,
            },
            LLT11: {
                available: true,
                assignedTo: null,
            },
            LT2: {
                available: true,
                assignedTo: null,
            },
            TR2: {
                available: true,
                assignedTo: null,
            },
            LH1: {
                available: true,
                assignedTo: null,
            },
            SH1: {
                available: true,
                assignedTo: null,
            },
        },
        "2100-2200": {
            LT1: {
                available: true,
                assignedTo: null,
            },
            TR1: {
                available: true,
                assignedTo: null,
            },
            LLT11: {
                available: true,
                assignedTo: null,
            },
            LT2: {
                available: true,
                assignedTo: null,
            },
            TR2: {
                available: true,
                assignedTo: null,
            },
            LH1: {
                available: true,
                assignedTo: null,
            },
            SH1: {
                available: true,
                assignedTo: null,
            },
        },
        "2200-2300": {
            LT1: {
                available: true,
                assignedTo: null,
            },
            TR1: {
                available: true,
                assignedTo: null,
            },
            LLT11: {
                available: false,
                assignedTo: "Enigma",
            },
            LT2: {
                available: true,
                assignedTo: null,
            },
            TR2: {
                available: true,
                assignedTo: null,
            },
            LH1: {
                available: true,
                assignedTo: null,
            },
            SH1: {
                available: true,
                assignedTo: null,
            },
        },
    },
};

const TimeTable = (props) => {
    const role = JSON.parse(localStorage.getItem("login")).role;
    console.log("Schedule", props);
    const [date, setDate] = useState(props.dateList[0]);
    const handleChange = (event) => {
        setDate(event.target.value);
    };

    
    return (
        <Stack spacing={2} sx={{ marginLeft: "5px", marginBottom: '20px' }} alignItems="flex-end">
            <FormControl
                sx={{
                    width: "15%",
                    fontSize: "10px",
                    textAlign: "left",
                    marginRight: role === "student" ? "80px" : "0px",
                }}
            >
                <InputLabel
                    id="demo-simple-select-label"
                    sx={{ fontSize: "13px" }}
                >
                    Date
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={date}
                    label="Date"
                    onChange={handleChange}
                    sx={{ fontSize: "12px" }}
                >
                    {Object.keys(props.schedule).map((d) => (
                        <MenuItem value={d}>{d}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Grid container spacing={0}>
                <Grid
                    item
                    container
                    direction="column"
                    spacing={1}
                    sx={{ width: role === "admin" ? "15%" : "14%" }}
                >
                    <Grid item sx={{ height: "40px" }}>
                        {props.classList ? "Class/Time": ''}
                    </Grid>
                    {props.classList.map((classroom) => (
                        <Grid item sx={{ margin: "auto" }}>
                            {classroom}
                        </Grid>
                    ))}
                </Grid>
                {props.schedule[date] ? <>{Object.entries(props.schedule[date]).map(([timeslot, slotData]) => (
                    <Grid
                        item
                        container
                        direction="column"
                        spacing={1}
                        sx={{ width: role === "admin" ? "15%" : "14%" }}
                    >
                        <Grid item sx={{ height: "40px" }}>
                            {timeslot}
                        </Grid>
                        {Object.entries(slotData).map(([time, classroom]) => (
                            <Grid item>
                                <div
                                    style={{ margin: "auto" }}
                                    style={{
                                        height: "45px",
                                        width: "100%",
                                        backgroundColor: classroom.available
                                            ? green[100]
                                            : red[100],
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {classroom.assignedTo}
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ))}</>:null}
            </Grid>
        </Stack>
    );
};

export default TimeTable;
