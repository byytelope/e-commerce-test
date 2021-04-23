import {
    IconButton,
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { AddShoppingCartOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        height: "100%",
        padding: theme.spacing(0.5),
        [theme.breakpoints.up("xs")]: {
            padding: theme.spacing(1),
        },
    },
    media: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: theme.spacing(25),
        [theme.breakpoints.up("xxs")]: {
            width: theme.spacing(30),
        },
        [theme.breakpoints.up("xs")]: {
            width: theme.spacing(35),
        },
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(35),
        },
        [theme.breakpoints.up("md")]: {
            width: theme.spacing(40),
        },
        padding: theme.spacing(3),
    },
    cardContent: {
        display: "flex",
        justifyContent: "space-between",
        flexGrow: 1,
    },
    cardActions: {
        display: "flex",
        justifyContent: "flex-end",
    },
    name: {
        fontWeight: "lighter",
        paddingRight: theme.spacing(1),
    },
    description: {},
    price: {
        paddingTop: theme.spacing(0.75),
    },
}));

export default function Product({ product, onAddToCart }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardMedia
                className={classes.media}
                component="img"
                image={product.media.source}
                alt={product.name}
            />
            <CardContent className={classes.cardContent}>
                <div>
                    <Typography variant="h5" className={classes.name}>
                        {product.name}
                    </Typography>
                    <Typography
                        className={classes.description}
                        variant="body2"
                        color="textSecondary"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                </div>
                <Typography variant="button" color="textSecondary" className={classes.price}>
                    {product.price.formatted_with_symbol}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions} disableSpacing>
                <IconButton aria-label="Add to cart" onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCartOutlined color="secondary" />
                </IconButton>
            </CardActions>
        </Card>
    );
}
