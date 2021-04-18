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

import shirt from "../img/t-shirt.png"
import sc from "../img/sc.png"
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        minWidth: 175,
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        height: 238,
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
        height: 238,
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

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
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

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function Market() {
    const fetchData = new FetchData()
    const classes = useStyles();
    const [user, getUser] = useState(false)
    const [market, getMarket] = useState(false)

    const history = useHistory();

    useEffect(() => {
        fetchData.auth().then(e => {
            getUser(e)
        })
        fetchData.market().then(e => {
            getMarket(e)
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
                        Маркет
                    </div>
                    <div className="main_subtitle">
                        Здесь вы можете преобрести товары за sc коины получаемые за прохождение заданий
                    </div>

                    <div className="market_line"/>

                    {market &&
                    <Grid container lg={12} spacing={2} style={{display: "flex", flexWrap: "wrap"}}>
                        {market?.data.map(card =>
                            <MarketCard card={card} classes={classes} history={history}/>
                        )}

                    </Grid>
                    }
                    <div className="market_line"/>
                </div>
                }
            </div>
        </Fragment>
    )

}

function MarketCard({card, classes, history}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {card.name}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {card.description}
                    </Typography>
                    <img src={card.img} className="market_card_img"/>
                </DialogContent>
                <DialogActions>
                    <button className="market_card_button" onClick={() => history.push("/buy")}>
                        Купить за {card.price} <img src={sc}/>
                    </button>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Понятно!
                    </Button>
                </DialogActions>
            </Dialog>


            <Grid item lg={2}>
                <Card className={classes.root}>
                    <CardContent>
                        <div className="market_card_title">
                            {card.name}
                        </div>
                        <img src={card.img} className="market_card_img" onClick={handleClickOpen}/>
                        <button className="market_card_button" onClick={() => history.push("/buy")}>
                            Купить за {card.price} <img src={sc}/>
                        </button>
                    </CardContent>
                </Card>
            </Grid>
        </Fragment>

    )
}