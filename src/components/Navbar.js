import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
    InputBase,
    Hidden,
    useScrollTrigger,
    makeStyles,
} from "@material-ui/core";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import StorefrontOutlined from "@material-ui/icons/StorefrontOutlined";

const useStyles = makeStyles((theme) => ({
    appBar: {
        padding: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    toolbar: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    },
    logo: {
        padding: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            gridColumn: "1/3",
        },
    },
    logoIcon: {
        paddingTop: theme.spacing(0.25),
        paddingRight: theme.spacing(1),
    },
    logotitle: {
        fontWeight: "lighter",
    },
    search: {
        position: "relative",
        display: "flex",
        padding: theme.spacing(1.75),
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: theme.spacing(1),
    },
    searchRoot: {
        width: "100%",
    },
    searchInput: {
        paddingLeft: theme.spacing(6),
    },
    searchIcon: {
        position: "absolute",
        paddingLeft: theme.spacing(1),
        height: "100%",
        paddingTop: theme.spacing(0.5),
    },
    cartButton: {
        justifySelf: "end",
    },
}));

export default function Navbar({ cartTotalItems, setAnchorEl }) {
    const classes = useStyles();
    const scrollTrigger = useScrollTrigger({ threshold: 0, disableHysteresis: true });
    const handleShowCart = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <AppBar
            position="fixed"
            className={classes.appBar}
            color="inherit"
            elevation={scrollTrigger ? 4 : 0}
        >
            <Toolbar className={classes.toolbar}>
                <div className={classes.logo}>
                    <div className={classes.logoIcon}>
                        <StorefrontOutlined />
                    </div>
                    <Typography variant="h6" className={classes.logotitle} color="inherit">
                        E-Commerce
                    </Typography>
                </div>
                <Hidden smDown>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchOutlined />
                        </div>
                        <InputBase
                            placeholder="Search"
                            classes={{ root: classes.searchRoot, input: classes.searchInput }}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </div>
                </Hidden>
                <div className={classes.cartButton}>
                    <IconButton aria-label="Show cart" color="inherit" onClick={handleShowCart}>
                        <Badge badgeContent={cartTotalItems} color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}
