import {
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
        marginTop: "auto",
        marginBottom: "auto",
    },
    CardActions: {
        display: "flex",
    },
    media: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        padding: theme.spacing(1),
        margin: theme.spacing(1),
    },
    itemName: {
        fontWeight: "lighter",
    },
    quantityBlock: {
        display: "flex",
        flexDirection: "column",
    },
    quantity: {
        display: "flex",
        justifyContent: "center",
    },
}));

export default function CartItem({ item, handleRemoveFromCart, handleUpdateCartQuantity }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardMedia
                component="img"
                image={item.media.source}
                alt={item.name}
                className={classes.media}
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="body1" className={classes.itemName}>
                    {item.name}
                </Typography>
                <Typography variant="button">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <div className={classes.quantityBlock}>
                    <Button
                        type="button"
                        size="small"
                        onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)}
                    >
                        +
                    </Button>
                    <Typography className={classes.quantity}>{item.quantity}</Typography>
                    <Button
                        type="button"
                        size="small"
                        onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)}
                    >
                        -
                    </Button>
                </div>
                <Button
                    type="button"
                    variant="text"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(item.id)}
                >
                    <DeleteOutlineIcon color="secondary" />
                </Button>
            </CardActions>
        </Card>
    );
}
