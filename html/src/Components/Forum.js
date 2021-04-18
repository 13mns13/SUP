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
        margin: "auto",
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

function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export default function Forum() {
    const fetchData = new FetchData()
    const classes = useStyles();
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
                        Форум
                    </div>
                    <div className="market_line"/>

                    <Grid container lg={12}>
                        <Grid item lg={12} style={{
                            display: "flex",
                            background: "#FFFFFF",
                            borderRadius: 15,
                            boxShadow: "0px 15.6465px 31.293px -4.34458px rgba(177, 205, 225, 0.18)",
                            padding: "2%",
                            margin: "1% 0"
                        }}>
                            <div className="profile_title_black">
                                Как обрезать часть строки до символа?
                            </div>
                            <div className="profile_title_tag_blue">
                                Java
                            </div>
                            <div className="profile_title_tag_red">
                                String
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container lg={12}>
                        <Grid item lg={12} style={{
                            display: "flex",
                            background: "#FFFFFF",
                            borderRadius: 15,
                            boxShadow: "0px 15.6465px 31.293px -4.34458px rgba(177, 205, 225, 0.18)",
                            padding: "2%",
                            margin: "1% 0"
                        }}>
                            <div className="profile_title_black">
                                Как обрезать часть строки до символа?
                            </div>
                            <div className="profile_title_tag_blue">
                                Java
                            </div>
                            <div className="profile_title_tag_red">
                                String
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container lg={12}>
                        <Grid item lg={12} style={{
                            display: "flex",
                            background: "#FFFFFF",
                            borderRadius: 15,
                            boxShadow: "0px 15.6465px 31.293px -4.34458px rgba(177, 205, 225, 0.18)",
                            padding: "2%",
                            margin: "1% 0"
                        }}>
                            <div className="profile_title_black">
                                Как обрезать часть строки до символа?
                            </div>
                            <div className="profile_title_tag_blue">
                                Java
                            </div>
                            <div className="profile_title_tag_red">
                                String
                            </div>
                        </Grid>
                    </Grid>

                </div>

                }
            </div>
        </Fragment>
    )

}