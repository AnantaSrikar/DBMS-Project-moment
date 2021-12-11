import { Grid, Paper } from "@mui/material";
import React from "react";
import ApprovalCard from "./approval_card";

const AdminHome = () => {
    return <div>
        <Grid container spacing={2} mt={3}>
            <Grid item xs={6}>
                <Paper sx={{ height: "400px" }} elevation={0} />
            </Grid>
            <Grid item xs={6}>
                <ApprovalCard />
            </Grid>
        </Grid>
    </div>;
};

export default AdminHome;
