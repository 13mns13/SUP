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
import {useHistory} from "react-router-dom";

import grad from '../img/grad.png'

const useStyles = makeStyles({
    root: {
        minWidth: 175,
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        height: 360,
        border: "0.634676px solid #DFE4EB",
        boxShadow: "0px 16px 32px -4.44274px rgba(177, 205, 225, 0.18)",
        borderRadius: 16,
        padding: "5%",
        textAlign: "center"
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
        margin: "auto",
        backgroundColor: "#FFF6E5",
        fontWeight: 600,
        fontSize: 14,
        borderRadius: 8,
        boxShadow: "none",
        '&:hover': {
            backgroundColor: "#FFEBC6",
            boxShadow: "none",
        },
    },
}))(Button);


export default function Modules() {
    const [isNext, setIsNext] = useState(false)
    const [state, setState] = React.useState({data: null})
    const fetchData = new FetchData()
    const classes = useStyles();
    const history = useHistory();

    const [user, getUser] = useState(false)

    useEffect(() => {
        fetchData.auth().then(e => {
            getUser(e)
        })
    }, []);

    return (
        <Fragment>
            <Header3 user={user}/>
            <Navigation/>
            <div className="profile_main_container">
                {user &&
                <div className="profile_cont1">
                    <div className="main_title">
                        Список модулей
                    </div>

                    <Grid container spacing={2} style={{margin: "0 auto", paddingTop: "10%"}}>
                        {user?.progress.map(card =>
                            <ModuleCard card={card} classes={classes} history={history} setState={setState}/>
                        )}


                    </Grid>
                </div>

                }
            </div>

            {state.data &&
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
                        {state.data?.data.map(card =>
                            <Grid item lg={3} key={card._id}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <div className="tasks_title">
                                            {card.test}
                                        </div>

                                        <img src={grad} style={{height: 150}}/>

                                        <ColorButton variant="contained" color="primary" className={classes.margin} onClick={() => window.open(card.value.url)}>
                                            Нажмите чтобы начать
                                        </ColorButton>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}


                    </Grid>
                </div>

                }
            </div>
            }

        </Fragment>
    )

}

function ModuleCard({card, classes, history, setState}) {
    return (
        <Grid item lg={3}>
            <Card className={classes.root}>
                <CardContent>
                    <div className="tasks_title">
                        {card.module}
                    </div>

                    <div className="modules_procent">
                        {card.percent} %
                    </div>

                    <ColorButton variant="contained" color="primary" className={classes.margin}
                                 onClick={() => setState({data: card})}>
                        Нажмите чтобы начать
                    </ColorButton>
                </CardContent>
            </Card>
        </Grid>
    )
}