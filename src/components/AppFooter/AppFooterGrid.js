import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from 'material-ui/Paper';
import { withStyles } from '@material-ui/core/styles';
import AppFooterColumnBranding from "./AppFooterColumnBranding";
import AppFooterColumnOne from "./AppFooterColumnOne"
import AppFooterColumnThree from "./AppFooterColumnThree";
import AppFooterColumnTwo from "./AppFooterColumnTwo"

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: "1rem",
        marginBottom: "-3%",


    },
    paper: {
        padding: theme.spacing.unit * 4,
        textAlign: 'center',
        color: theme.palette.text.primary,
        position: "sticky-bottom",
        backgroundColor: "#f7f7f7"
    },
});

function AppFooterGrid(props) {
    const { classes } = props;
    {
        return (
            <div className={classes.root} >
                <Paper className={classes.paper} style={{ backgroundColor: "#f7f7f7f" }} zDepth={3} rounded={false}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <AppFooterColumnBranding />
                                </Grid>
                                <Grid item xs>
                                    <AppFooterColumnOne />
                                </Grid>
                                <Grid item xs>
                                    <AppFooterColumnTwo />
                                </Grid>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid item xs={12}>
                            <AppFooterColumnThree />
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(AppFooterGrid);
