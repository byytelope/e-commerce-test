import { Grid, makeStyles } from "@material-ui/core";

import Product from "./Product";

const useStyles = makeStyles((theme) => ({
    toolbarOffset: theme.mixins.toolbar,
    content: {
        padding: theme.spacing(3),
    },
}));

export default function Products({ products, handleAddToCart }) {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <div className={classes.toolbarOffset} />
            <Grid container justify="flex-start" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={6} lg={4}>
                        <Product product={product} onAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
