import * as React from "react";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blueGrey } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
} from "@mui/material";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Filters(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [value, setValue] = React.useState(props.dateList[0]);
    const [cap, setCap] = React.useState(10);
    const [slot, setSlot] = React.useState(props.slotList[0]);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleCap = (e) => {
        setCap(e.target.value);
    };

    return (
        <Paper
            sx={{
                mb: "20px",
                border: "none",
                backgroundColor: blueGrey[50],
                borderRadius: "0px",
                border: "2px solid black",
            }}
            elevation={0}
        >
            <CardActions disableSpacing>
                <Typography sx={{ ml: "5px" }}>Filters</Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Grid container spacing={2} sx={{ textAlign: "left" }}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Date
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={value}
                                    label="Date"
                                    onChange={(e) => setValue(e.target.value)}
                                >
                                    {props.dateList?props.dateList.map(d=><MenuItem value={d}>{d}</MenuItem>):null}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Time Slot
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={slot}
                                    label="Time Slot"
                                    onChange={(e) => {
                                        setSlot(e.target.value);
                                    }}
                                >
                                   {props.slotList?props.slotList.map(s=><MenuItem value={s}>{s}</MenuItem>):null}
                                </Select>
                            </FormControl>
                        </Grid>
                       
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Min. Capacity
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={cap}
                                    label="Min. Capacity"
                                    onChange={handleCap}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <Button sx={{height: '100%', width: '100%'}} variant='outlined' onClick={()=>props.applyFilter({date: value, minCap: cap, slot})}>Apply</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Collapse>
        </Paper>
    );
}
