import { Grid, Paper, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import BookingCard from "./booking_card";
import HistoryCard from "./history_card";

const StudentHome = () => {
    return (
        <Box sx={{ mx: "40px" }}>
            <Grid container spacing={2} mt={5}>
                <Grid item xs={9}>
                    <Paper sx={{ height: "400px" }} elevation={0} />
                </Grid>
                <Grid item xs={3}>
                    <Stack
                        spacing={2}
                        sx={{ height: "100%", justifyContent: "center" }}
                    >
                        <BookingCard />
                        <HistoryCard />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentHome;
