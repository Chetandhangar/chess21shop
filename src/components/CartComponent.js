import React from 'react'
import {useDataCart} from '../contexts/cart-provider';
import {makeStyles} from '@material-ui/core/styles';
import { Card,Container, CardActions,CardActionArea,CardContent,CardMedia,Grid,CssBaseline,Button,
    Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
      display: 'flex',
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
  }));


export function CartItems() {
    const {cart , removeFromCartHandler, addToCartHandlerContext, loading} = useDataCart();
    const classes = useStyles();
    return(
    <div>
        {console.log(cart,'from return')}
    <Container component="main">
        <CssBaseline>
            <div className={classes.paper}>
                {loading ?( <p>Loading ...</p>) :(
                    <>
                    {cart?.length <= 0 && <p>No Items in Cart</p>}
                    {cart?.map(({product,quantity}) => (
                        <Grid item xs={12} md={6} mey={product?._id} style={{marginTop : "2rem"}}>
                        <CardActionArea component="a">
                        <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                        <CardContent>
                        <Typography component="h2" variant="h5">
                        {`${product?.name}`}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {product?.description}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {`Rs.`} {product?.price * quantity}
                        </Typography>
                        <CardActions>
                            <Button onClick={() => removeFromCartHandler(product,quantity)}>-</Button>
                            <Typography>{`Quantity : ${quantity}`}</Typography>
                            <Button onClick={() =>  addToCartHandlerContext(product)}>+</Button>
                        </CardActions>
                        </CardContent>
                        </div>
                        <CardMedia className={classes.cardMedia} image={product?.imageurl} title={"post.imageTitle"} />
                        </Card>
                        </CardActionArea>
                        </Grid>
                        ))}

                        <Grid item  xs={12} style={{marginTop :"2rem"}}>
                            <Card className={classes.card}>
                                <div className={classes.cardDetails}>
                                    <CardContent>
                                    <Typography component="h2" variant="h5">
                                      Price Details
                                    </Typography>
                                    </CardContent>
                                </div>
                            </Card>
                        </Grid>
                    </>
                )}

            </div>
        </CssBaseline>
    </Container>
    
       
    
    </div>
    )
}