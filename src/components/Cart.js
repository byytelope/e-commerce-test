import { Popover, Typography, Button, Grid, makeStyles, Container } from "@material-ui/core";

import CartItem from "./CartItem";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
    title: {
        fontWeight: "lighter",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(3),
    },
    emptyButton: {
        minWidth: "150px",
    },
    checkoutButton: {
        minWidth: "150px",
        marginLeft: theme.spacing(2),
    },
    link: {
        textDecoration: "none",
    },
    cartItems: {
        display: "flex",
        width: "100%",
    },
    cartDetails: {
        display: "flex",
        marginTop: "10%",
        width: "100%",
        justifyContent: "space-between ",
    },
    subtotal: {
        fontWeight: "lighter",
        marginRight: theme.spacing(4),
        alignItems: "center",
    },
}));

export default function Cart({
    cart,
    anchorEl,
    handleCloseCart,
    handleUpdateCartQuantity,
    handleRemoveFromCart,
    handleEmptyCart,
}) {
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const EmptyCart = () => (
        <Typography variant="body2" color="textSecondary">
            Start by adding some items to your cart!
        </Typography>
    );

    const FilledCart = () => (
        <div>
            <Grid container spacing={3} justify="flex-start" direction="column">
                {cart.line_items.map((item) => (
                    <Grid item className={classes.cartItems} key={item.id}>
                        <CartItem
                            item={item}
                            handleUpdateCartQuantity={handleUpdateCartQuantity}
                            handleRemoveFromCart={handleRemoveFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cartDetails}>
                <Typography variant="body1" className={classes.subtotal}>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button
                        className={classes.emptyButton}
                        size="large"
                        type="button "
                        variant="outlined"
                        color="secondary"
                        onClick={handleEmptyCart}
                    >
                        Empty Cart
                    </Button>
                    <Button
                        className={classes.checkoutButton}
                        size="large"
                        type="button "
                        variant="contained"
                        color="secondary"
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <Popover
            id={id}
            anchorEl={anchorEl}
            onClose={handleCloseCart}
            open={open}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <Container className={classes.container}>
                <Typography className={classes.title} variant="h5">
                    Your Cart
                </Typography>
                {!cart?.total_items ? <EmptyCart /> : <FilledCart />}
            </Container>
        </Popover>
    );
}
