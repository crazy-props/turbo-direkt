import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import {withStyles} from '@material-ui/core/styles';
import AppFooterColumnBranding from "./AppFooterColumnBranding";
import AppFooterColumnOne from "./AppFooterColumnOne"
import AppFooterColumnThree from "./AppFooterColumnThree";
import AppFooterColumnTwo from "./AppFooterColumnTwo"


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop:"5%",
        marginBottom: "-3%",

    },
    paper: {
        padding: theme.spacing.unit * 4,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

function AppFooterGrid(props) {
    const {classes} = props;
    {
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <AppFooterColumnBranding/>
                                </Grid>
                                <Grid item xs>
                                    <AppFooterColumnOne/>
                                </Grid>
                                <Grid item xs>
                                   <AppFooterColumnTwo/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <AppFooterColumnThree/>
                        </Grid>
                    </Grid>
                </Paper>

            </div>
        );
    }
}

export default withStyles(styles)(AppFooterGrid);
