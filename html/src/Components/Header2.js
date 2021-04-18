import React from "react";
import clsx from "clsx";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Logo from "./Logo";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import * as PropTypes from "prop-types";
import Slide from "@material-ui/core/Slide";

import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    title: {
        flexGrow: 1
    },
}));

function HideOnScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({target: window ? window() : undefined});

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function Header2({customHistory}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const isMobile = useMediaQuery('(max-width:1100px)');

    const history = useHistory();
    const navigateToReg = () => history.push('/registration');
    const navigateToHome = () => history.push('/home');
    const navigateToIndex = () => history.push('/');

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <HideOnScroll>
                <AppBar
                    position="fixed"
                    style={{
                        backgroundColor: "#FFFFFF",
                        color: "#191919",
                        boxShadow: "none",
                        padding: "0 10%",
                    }}
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap className={classes.title} onClick={navigateToIndex}>
                            <Logo/>
                        </Typography>
                        <Button variant="outlined" style={{border: "1px solid rgba(255,200,80,1)", color: "#FFC850"}}
                                onClick={navigateToReg}>
                            Войти
                        </Button>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </div>
    );
}
