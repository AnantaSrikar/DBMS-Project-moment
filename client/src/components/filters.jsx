import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { pink, blueGrey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";

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

export default function Filters() {
    const [expanded, setExpanded] = React.useState(false);
    const [value, setValue] = React.useState(new Date());
    const [loc, setLoc] = React.useState(0);
    const [cap, setCap] = React.useState(10);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [duration, setDuration] = React.useState(0);

    const handleChange = (event) => {
        setDuration(event.target.value);
    };

    const handleLoc = (e) => {
        setLoc(e.target.value);
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
                        <Grid item xs={8}>
                            <DateTimePicker
                                renderInput={(props) => (
                                    <TextField {...props} />
                                )}
                                label="Start date/time"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Minutes
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={duration}
                                    label="Duration"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Location
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={loc}
                                    label="Location"
                                    onChange={handleLoc}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
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
                    </Grid>
                </CardContent>
            </Collapse>
        </Paper>
    );
}
