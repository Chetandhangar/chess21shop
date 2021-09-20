import React from 'react';
import {Grid,CardActionArea,Card,CardContent,Typography,CardMedia,Link,Button,CardActions,CssBaseline,
Container} from '@material-ui/core'
import useStyles from './products/productsStyle';
import {checkCart} from '../utils/utils'
import {useWishList} from '../contexts/wishlist-context'
import {useDataCart} from '../contexts/cart-provider'

export const WishList = () => {
    const classes = useStyles();
    const {wishlist,removeFromWishList,loading} = useWishList();
    const { addToCartHandlerContext, cart,removeFromCartHandler} = useDataCart();
 
    
    return(
    <Container component="main">
    <CssBaseline>
            <div className={classes.paper}>
                {loading ? (<p>Loading ...</p> ): (
                    <>
                    {wishlist?.length <= 0 && <p>No Items in cart</p> }
                    {wishlist?.map((product) =>(
                         <Grid item key={product?._id} xs={12} sm={6} md={4} 
                         style={{marginTop : "2rem", marginBottom:"1rem"}}>
                             <Card>
                             <CardActionArea>
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
                            <Link href="/cart">
                            Go To Cart
                            </Link>
                            </Button>
                    }

                    <Button color="primary"
                    onClick={() => removeFromWishList(product)}
                    >
                       Remove From WishList
                    </Button>
                    
                    </CardActions>
                </Card>
                </Grid>
                    ))}
                    </>
                )
                }
            </div>
            </CssBaseline>
</Container>
    )
}

