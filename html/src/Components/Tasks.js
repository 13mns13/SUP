import * as React from "react";
import FetchData from "./FetchData";
import {Fragment, useEffect, useState} from "react";
import Header3 from "./Header3";
import Grid from "@material-ui/core/Grid";

import '../styles/profile.css'
import {makeStyles, withStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Navigation from "./Navigation";

const useStyles = makeStyles({
    root: {
        minWidth: 175,
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        height: 360,
        border: "0.634676px solid #DFE4EB",
        boxShadow: "0px 16px 32px -4.44274px rgba(177, 205, 225, 0.18)",
        borderRadius: 16,
        padding: "5%"
    },
    root2: {
        backgroundColor: "FFC850",
        minWidth: 175,
        marginTop: 10,
        height: 360,
        border: "0.634676px solid #DFE4EB",
        boxShadow: "0px 16px 32px -4.44274px rgba(177, 205, 225, 0.18)",
        borderRadius: 16,
        padding: "5%"
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

const ColorButton = withStyles((theme) => ({
    root: {
        color: "#FFD686",
        backgroundColor: "#FFF6E5",
        fontWeight: 600,
        fontSize: 12,
        boxShadow: "none",
        '&:hover': {
            backgroundColor: "#FFEBC6",
            boxShadow: "none",
        },
    },
}))(Button);

export default function Tasks() {
    const [progress, setProgress] = React.useState(54);
    const fetchData = new FetchData()
    const classes = useStyles();
    const [user, getUser] = useState(true)

    useEffect(() => {
        fetchData.auth().then(e => {
            getUser(e)
        })
    }, []);

    return (
        <Fragment>
            <Navigation/>
            <Header3 user={user}/>

            <div className="profile_main_container">
                {user &&
                <div className="profile_cont1">
                    <div className="main_title">
                        Список заданий - Основы Java
                    </div>
                    <div className="main_subtitle">
                        Это часть образовательной программы,
                        в которой изучается несколько предметов и курсов
                    </div>

                    <Grid container spacing={2} style={{margin: "0 auto", paddingTop: "10%"}}>
                        {user?.progress[0].data.map(card =>
                            <Grid item lg={3} key={card._id}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <div className="tasks_title">
                                            {card.test}
                                        </div>

                                        <ColorButton variant="contained" color="primary" className={classes.margin}>
                                            Нажмите чтобы начать
                                        </ColorButton>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}


                        <Grid item lg={3}>
                            <Card className={classes.root2}>
                                <CardContent>
                                    <div className="tasks_title">
                                        Типы данных и операций языка
                                    </div>
                                    <Button>Вы ознакомились с теорией</Button>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                    <Button variant="outlined" color="primary">
                        Следущий шаг
                    </Button>
                </div>

                }
            </div>
        </Fragment>
    )

}