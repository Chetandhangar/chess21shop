import React from 'react';
import {useParams} from 'react-router-dom';
import {useProducts} from '../../contexts/products-context';
import {Grid,CardActionArea,Card,CardContent,Typography,CardMedia,Button,CardActions,CssBaseline,
Container} from '@material-ui/core'
import useStyles from './productsStyle';
import {Link} from 'react-router-dom'
import {checkLikes,checkCart} from '../../utils/utils'
import {useWishList} from '../../contexts/wishlist-context';
import {useDataCart} from '../../contexts/cart-provider';


export const ProductDetail = () => {
    const {productId} = useParams();
    const {products} = useProducts();
    const product = products?.find((item) => item?._id === productId);
    const classes = useStyles();
    const {wishlist,addToWishList,removeFromWishList} = useWishList();
    const { addToCartHandlerContext, cart,removeFromCartHandler} = useDataCart();
    console.log(product,'from product details');
    console.log(cart ,'from cart context but in product details')
    
    return(
    <Container component="main">
    <CssBaseline>
            <div className={classes.paper}>
            <Grid item key={product?._id} xs={12} sm={6} md={4}>
                <Card>
                    <CardActionArea>
                        <CardActions>
                            {!checkLikes({productId : product?._id,wishlist}) ? (
                                  <Button className={classes.cardDismissBtn}
                                  onClick = {() => addToWishList(product)}
                                  >
                                      <span className="fa fa-heart-o fa-lg"></span>
                                  </Button>
                            ) : 
                            <Button className={classes.cardDismissBtn}
                            onClick = {() => removeFromWishList(product)}
                            >
                                <span className="fa fa-heart fa-lg fa-color" color="secondary"></span>
                            </Button>
                            }
                          
                        </CardActions>
                        <CardMedia 
                        className={classes.media}
                        image={product?.imageurl}
                        title="Product"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {product?.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            {`Rs . ${product?.price}`}                               
                            </Typography>
                            <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                              {`Type : ${product?.isMagnetic  ? "Magnetic ," : ""} 
                              ${product?.isWooden ?  "Wooden ," : ""}
                              ${product?.isFolding ? "Foldable ," : ""}
                              `}                           
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                {`Description : ${product?.description}`}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                    {!checkCart({productId : product?._id,cart}) ? (
                                  <Button 
                                  onClick = {() =>  addToCartHandlerContext(product)}
                                  >
                                    Add To Cart
                                  </Button>
                            ) : 
                            <Button
                            onClick = {() => removeFromCartHandler(product)}
                            >
                            <Link to="/cart">
                            Go To Cart
                            </Link>
                            </Button>
                    }

                    <Button>
                        <Link to="/wishlist">Go To WishList</Link>
                    </Button>
                    
                    </CardActions>
                </Card>
            </Grid>
            </div>
            </CssBaseline>
</Container>
    )
}