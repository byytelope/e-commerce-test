import { useState, useEffect } from "react";
import {
    createMuiTheme,
    unstable_createMuiStrictModeTheme,
    ThemeProvider,
} from "@material-ui/core/styles";

import { commerce } from "./lib/commerce";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

const createTheme =
    process.env.NODE_ENV === "production" ? createMuiTheme : unstable_createMuiStrictModeTheme;

const defaultTheme = createTheme();

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff5252",
            light: "#ff867f",
            dark: "#c50e29",
            contrastText: "#000000",
        },
        secondary: {
            main: "#ef9a9a",
            light: "#ffcccb",
            dark: "#ba6b6c",
            contrastText: "#1f1f2f",
        },
        text: {
            primary: "#263238",
            secondary: "#37474f",
        },
    },
    breakpoints: {
        values: {
            xxs: 360,
            xs: 400,
            sm: 700,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    overrides: {
        MuiCard: {
            root: {
                borderRadius: defaultTheme.spacing(1),
            },
        },
        MuiPopover: {
            paper: {
                borderRadius: defaultTheme.spacing(1),
            },
        },
        MuiButton: {
            root: {
                borderRadius: defaultTheme.spacing(1),
            },
        },
    },
});

export default function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);

    const fetchProducts = async () => {
        const res = await commerce.products.list();
        setProducts(res.data);
    };

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
    };

    const handleAddToCart = async (productId, quantity) => {
        const res = await commerce.cart.add(productId, quantity);
        setCart(res.cart);
    };

    const handleUpdateCartQuantity = async (productId, quantity) => {
        const res = await commerce.cart.update(productId, { quantity });
        setCart(res.cart);
    };

    const handleRemoveFromCart = async (productId) => {
        const res = await commerce.cart.remove(productId);
        setCart(res.cart);
    };

    const handleEmptyCart = async () => {
        const res = await commerce.cart.empty();
        setCart(res.cart);
    };

    const handleCloseCart = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []); // eslint-disable-line

    // console.log(cart);
    // console.log(products);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Navbar cartTotalItems={cart?.total_items} setAnchorEl={setAnchorEl} />
                <Cart
                    cart={cart}
                    anchorEl={anchorEl}
                    handleCloseCart={handleCloseCart}
                    handleUpdateCartQuantity={handleUpdateCartQuantity}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleEmptyCart={handleEmptyCart}
                />
                <Products products={products} handleAddToCart={handleAddToCart} />
                <div style={{ paddingBottom: "70rem" }} />
            </ThemeProvider>
        </div>
    );
}
