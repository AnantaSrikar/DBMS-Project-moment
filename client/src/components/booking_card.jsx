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
import { makeStyles, styled } from "@mui/styles";
import { DateTime } from "luxon";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TimePicker from "@mui/lab/TimePicker";
import Filters from "./filters";
import DateTimePicker from "@mui/lab/DateTimePicker";

const classrooms = [
    {
        classroomId: 1,
        location: 0,
        capacity: 60,
        availability: true,
        name: "LT1",
    },
    {
        classroomId: 2,
        location: 0,
        capacity: 30,
        availability: true,
        name: "TR1",
    },
    {
        classroomId: 3,
        location: 0,
        capacity: 120,
        availability: true,
        name: "LLT1",
    },
    {
        classroomId: 4,
        location: 1,
        capacity: 60,
        availability: true,
        name: "LT2",
    },
    {
        classroomId: 5,
        location: 1,
        capacity: 30,
        availability: true,
        name: "TR2",
    },
    {
        classroomId: 6,
        location: 1,
        capacity: 50,
        availability: true,
        name: "LH1",
    },
    {
        classroomId: 7,
        location: 1,
        capacity: 60,
        availability: true,
        name: "SH1",
    },
];

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

const BookingCard = () => {
    const styles = useStyles();
    const [room, setRoom] = useState("");
    const [startTime, setStartTime] = useState(DateTime.now());
    const [endTime, setEndTime] = useState(DateTime.now().plus({ hours: 1 }));
    const gap = { xs: 1, sm: 1, lg: 1 };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };
    const handleChange = (e) => {
        console.log(e.target);
        setRoom(e.target.value);
    };

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
                <Container component="main" maxWidth="xs">
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
                            sx={{ mt: 1 }}
                        >
                            <Filters />
                            <FormControl fullWidth>
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
                                >
                                    {classrooms.map((classroom) => (
                                        <MenuItem value={classroom.classroomId}>
                                            {classroom.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Stack direction="row" my={3} spacing={2}>
                                <DateTimePicker
                                    renderInput={(props) => (
                                        <TextField {...props} />
                                    )}
                                    label="Start date/time"
                                    value={startTime}
                                    onChange={(newValue) => {
                                        setStartTime(newValue);
                                    }}
                                />
                                <DateTimePicker
                                    renderInput={(props) => (
                                        <TextField {...props} />
                                    )}
                                    label="End date/time"
                                    value={endTime}
                                    onChange={(newValue) => {
                                        setEndTime(newValue);
                                    }}
                                />
                            </Stack>
                            <TextField
                                id="outlined-multiline-static"
                                label="Purpose"
                                multiline
                                rows={3}
                                placeholder="Enter your reason for requesting the room..."
                                sx={{ width: "100%" }}
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
