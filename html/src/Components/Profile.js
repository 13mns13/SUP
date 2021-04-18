import * as React from "react";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {createMuiTheme, makeStyles} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

import '../styles/profile.css';
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

import fetchData from "./FetchData";

import star from '../img/star.png';
import avatar from '../img/ava2.png';
import {Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import Tooltip from "@material-ui/core/Tooltip";
import {ThemeProvider} from "@material-ui/styles";
import {Fragment, useEffect, useState} from "react";
import FetchData from "./FetchData";
import Header3 from "./Header3";
import CircularProgress from "@material-ui/core/CircularProgress";
import Navigation from "./Navigation";

import youtube from "../img/youtube.png";
import github from "../img/github.png";

const data = [
    {
        name: "1",
        uv: 5,
        pv: 2,
        amt: 2400
    },
    {
        name: "2",
        uv: 3,
        pv: 1,
        amt: 2210
    },
    {
        name: "3",
        uv: 2,
        pv: 9,
        amt: 2290
    },
    {
        name: "4",
        uv: 2,
        pv: 3,
        amt: 2000
    },
    {
        name: "5",
        uv: 1,
        pv: 4,
        amt: 2181
    },
    {
        name: "6",
        uv: 2,
        pv: 3,
        amt: 2500
    },
    {
        name: "7",
        uv: 3,
        pv: 4,
        amt: 2100
    }
];

const useStyles = makeStyles({
    root: {
        minWidth: 175,
        marginTop: 10,
        boxShadow: "0px 3.76px 16.92px -6.58px rgba(0, 0, 0, 0.2)",
        borderRadius: 12
    },
    root2: {
        minWidth: 175,
        marginTop: 10,
        border: 0,
        boxShadow: "none",
        borderRadius: 12
    },
    bullet: {
        display: 'inline-block',
        margin: '5px 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        color: "#2D2D2D",
        textAlign: "center"
    },
    titleYellow: {
        fontSize: 14,
        color: "#FFC850",
        textAlign: "center"
    },
    pos: {
        marginBottom: 12,
    },
});

const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: "#FFC850",
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
    },
});

function LinearProgressWithLabel(props) {
    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress color="primary" variant="determinate" {...props} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                        props.val,
                    )}/` + props.max}</Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex" marginRight="12px">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function Profile({props}) {
    const [progress, setProgress] = React.useState(54);
    const fetchData = new FetchData()
    const classes = useStyles();
    const [user, getUser] = useState(false)

    useEffect(() => {
        console.log(window.location.pathname.replace("/profile/", ""))
        if (window.location.pathname.replace("/profile/", "") === "home") {
            fetchData.auth().then(e => {
                getUser(e)
            })
        } else {
            fetchData.user(window.location.pathname.replace("/profile/", "")).then(e => {
                getUser(e)
            })

        }

    }, []);

    return (
        <Fragment>
            <Navigation/>
            <Header3 user={user}/>
            <div className="profile_main_container">
                {user &&
                <div className="profile_cont">
                    <div className="main_title">
                        Ваш профиль
                    </div>
                    <div className="main_subtitle">
                        Следите за всеми операциями вашего аккаунта, следите за своим развитием и статистикой!
                    </div>
                    <Grid container spacing={2} style={{marginTop: "52px"}}>
                        <Grid item lg={4}>
                            <Grid container justify="center" spacing={4}>
                                <Grid item lg={12}>
                                    <Card className={classes.root}>
                                        <CardContent>
                                            <div className="profile_userdata_block1">
                                                <img src={user?.avatar} className="profile_avatar"/>
                                                <div className="profile_userdata_block1_right">
                                                    <div className="profile_title_black">
                                                        {user?.first_name + " " + user?.last_name}
                                                    </div>
                                                    <span className="profile_title_id">id: {user?._id}</span>
                                                    <span className="profile_title_tag">Ученик</span>
                                                </div>
                                            </div>
                                            <div className="profile_userdata_block2">
                                                <div className="profile_userdata_block2_title" style={{
                                                    color: "#102440",
                                                    fontSize: 18,
                                                    fontWeight: 600,
                                                    fontStyle: "normal",
                                                    margin: "10px 0px 29px 0px"
                                                }}>
                                                    Данные:
                                                </div>
                                                <div className="profile_userdata_block2_block">
                                                    <div className="profile_userdata_block2_block_child">
                                                        <CircularProgressWithLabel
                                                            value={user?.xp / user?.xp_max * 100}/>
                                                        <div className="profile_userdata_block2_block_child_right">
                                                            <div>
                                                                {user.lvl} lvl
                                                            </div>
                                                            <div>
                                                                {user.xp} / {user.xp_max}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="profile_userdata_block2_block_child">
                                                        <span
                                                            className="profile_userdata_block2_block_child_dot">{user?.module_percent}</span>
                                                        <div className="profile_userdata_block2_block_child_right">
                                                            <div style={{
                                                                fontWeight: 500,
                                                                fontSize: 14,
                                                                color: "#102440",
                                                                opacity: 0.84
                                                            }}>
                                                                Пройдено модулей
                                                            </div>
                                                            <div> {user.module_percent}%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className={classes.root} style={{padding: "3%"}}>
                                        <CardContent>
                                            <div className="profile_title_black profile_text_alight_center">
                                                Пройдено уроков
                                            </div>
                                            <Grid container justify="center" spacing={2}
                                                  style={{marginTop: "2%", textAlign: "center"}}>
                                                <StarsCount user={user}/>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    <Card className={classes.root} style={{padding: "5%"}}>
                                        <CardContent>
                                            <div className="profile_href_block">
                                                <img src={github} style={{height: 19, marginRight: 12}}/>
                                                <div className="profile_title_black">GitHub</div>
                                            </div>
                                            <input className="profile_href_block_input" placeholder={"Cсылка"}/>
                                            <div className="profile_href_block">
                                                <img src={youtube} style={{height: 19, marginRight: 12}}/>
                                                <div className="profile_title_black">YouTube</div>
                                            </div>
                                            <input className="profile_href_block_input" placeholder={"Ссылка"}/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item lg={3} style={{margin: "0 auto"}}>
                            <Card className={classes.root} style={{padding: "5%"}}>
                                <CardContent>
                                    <div className="profile_title_yellow_mini profile_text_alight_center">
                                        Достижения
                                    </div>
                                    <Grid container justify="center" spacing={4}>
                                        <Grid item lg={12}>
                                            {
                                                !user.error && user.progress.map(e =>
                                                    <Card className={classes.root2}>
                                                        <CardContent>
                                                            <div className="profile_card_achievements_cont">
                                                                <div className="profile_card_achievements_cont_left">
                                                                    <img src={star}/>
                                                                </div>

                                                                <div className="profile_card_achievements_cont_right">
                                                                    <div
                                                                        className="profile_title profile_text_alight_left">
                                                                        {e.module}
                                                                    </div>
                                                                    {e.data.map(d => <div className="profile_text">
                                                                        {d.test} [{d.value.max}]
                                                                    </div>)}

                                                                </div>

                                                            </div>
                                                            <LinearProgressWithLabel value={e.percent} max={100}
                                                                                     val={e.percent}/>
                                                        </CardContent>
                                                    </Card>
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            <Card className={classes.root} style={{padding: "5%"}}>
                                <CardContent>
                                    <div className="profile_href_block">
                                        <div className="profile_title_black">Ваша реферальная ссылка</div>
                                    </div>
                                    <div className="profile_href_block">
                                        <div className="profile_title_id">Скопируйте вашу реферальную ссылку и получайне sc за каждого приглашённого друга, активно выполняющего задания</div>
                                    </div>
                                    <input className="profile_href_block_input" value={`https://e.not-undo.xyz/api/ref/${user?._id}`}/>
                                </CardContent>
                            </Card>
                        </Grid>


                        <Grid item lg={2} style={{margin: "0 auto"}}>
                            <Grid container justify="center" spacing={4}>
                                <Grid item lg={12}>
                                    <Card className={classes.root}>
                                        <CardContent>
                                            <div className="profile_title profile_text_alight_center">
                                                Пройдено уроков
                                            </div>

                                            <div className="profile_title_yellow profile_text_alight_center">
                                                5
                                            </div>

                                        </CardContent>
                                    </Card>

                                    <Card className={classes.root}>
                                        <CardContent>
                                            <div className="profile_title profile_text_alight_center">
                                                Количествово
                                                подаренных с-коинов
                                            </div>

                                            <div className="profile_title_yellow profile_text_alight_center">
                                                1350
                                            </div>

                                        </CardContent>
                                    </Card>

                                    <Card className={classes.root}>
                                        <CardContent>
                                            <div className="profile_title profile_text_alight_center">
                                                Дней подряд
                                            </div>

                                            <div className="profile_title_yellow profile_text_alight_center">
                                                10
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className={classes.root}>
                                        <CardContent>
                                            <div className="profile_title profile_text_alight_center">
                                                Пройдено тестов
                                            </div>

                                            <div className="profile_title_yellow profile_text_alight_center">
                                                2
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item lg={3} style={{margin: "0 auto"}}>
                            <Grid container justify="center" spacing={4}>
                                <Grid item lg={12}>
                                    <Card className={classes.root}>
                                        <CardContent>
                                            <ResponsiveContainer width="100%" height={200}>
                                                <AreaChart
                                                    width={600}
                                                    height={300}
                                                    data={data}
                                                    margin={{
                                                        top: 5,
                                                        right: 30,
                                                        left: 20,
                                                        bottom: 5
                                                    }}
                                                >
                                                    <CartesianGrid strokeDasharray="1 1" vertical={false}/>
                                                    <XAxis dataKey="name"/>
                                                    <YAxis axisLine={false}/>
                                                    <Tooltip/>
                                                    <Area type="monotone" dataKey="uv" stroke="#FFC850" fill="#FFDE99"/>
                                                </AreaChart>
                                            </ResponsiveContainer>

                                        </CardContent>
                                    </Card>

                                    <Card className={classes.root}>
                                        <CardContent>
                                            <ResponsiveContainer width="100%" height={200}>
                                                <AreaChart
                                                    width={600}
                                                    height={300}
                                                    data={data}
                                                    margin={{
                                                        top: 5,
                                                        right: 30,
                                                        left: 20,
                                                        bottom: 5
                                                    }}
                                                >
                                                    <CartesianGrid strokeDasharray="1 1" vertical={false}/>
                                                    <XAxis dataKey="name"/>
                                                    <YAxis axisLine={false}/>
                                                    <Tooltip/>
                                                    <Area type="monotone" dataKey="pv" stroke="#FFC850" fill="#FFDE99"/>
                                                </AreaChart>
                                            </ResponsiveContainer>

                                        </CardContent>
                                    </Card>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                }
            </div>
        </Fragment>
    )
}

function StarsCount({user}) {
    return (
        <Fragment>
            {!user.error&&user?.progress.map(card =>
                card.data.map(e =>
                    <Grid item xs={4}>
                        <img src={star}/>
                    </Grid>
                )
            )
            }
        </Fragment>

    )
}