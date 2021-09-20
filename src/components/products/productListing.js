import { useCart} from '../../contexts/data-context';
import {useProducts} from '../../contexts/products-context'
import {useWishList} from '../../contexts/wishlist-context';
import {Container, Divider,Paper,Grid,Card , Typography,CardActions,Button,
    CardContent,CardActionArea,CardMedia} from '@material-ui/core'
import useStyles from './productsStyle';
import {checkLikes} from '../../utils/utils';
import  './products.css';
import {Link} from 'react-router-dom'


export const ProductListing = () => {

    const {addToWishList,wishlist,removeFromWishList} = useWishList();
    const {dispatch, sortBy, showMagneticOnly,showWoodenOnly,showFoldableOnly } = useCart();
    const classes = useStyles()
    const {products,} = useProducts();

    console.log(products, "from context")


    function getSortedList(productList , sortBy){
    if(sortBy && sortBy === "SORT_HIGH_TO_LOW"){
        return productList.sort((a,b) => b["price"] - a["price"])
    }
    if(sortBy && sortBy === "SORT_LOW_TO_HIGH"){
        return productList.sort((a,b) => a["price"] - b["price"])
    }
    else return productList
    }

    function getFilteredData(productList, 
        { showMagneticOnly,showWoodenOnly,showFoldableOnly}){
        if(productList === null){
            return
        }
        else return productList
            .filter(({isFolding}) =>  showFoldableOnly ? isFolding : true)
            .filter(({isMagnetic}) =>  showMagneticOnly ? isMagnetic : true)
            .filter(({isWooden}) =>  showWoodenOnly ? isWooden : true)
          
    }

const sortedData = getSortedList(products, sortBy);
const filteredData = getFilteredData(sortedData, 
    {   showMagneticOnly, showWoodenOnly,showFoldableOnly})

console.log(wishlist,'from home wishlist context list ')
   return(
    <div>
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
            <Paper 
            elevation={3}>
                <fieldset>
                    <legend>SortBy</legend>
                    <label>
                        <input 
                        type = "radio"
                        name = "sort"
                        onChange ={() => dispatch({type : "SORT", payload : "SORT_HIGH_TO_LOW"})}
                        //checked = {sortBy && sortBy === "SORT_HIGH_TO_LOW"}
                        />
                        High_To_Low
                    </label>
                    <label>
                        <input 
                        type = "radio"
                        name = "sort"
                        onChange ={() => dispatch({type : "SORT", payload : "SORT_LOW_TO_HIGH"})}
                        //checked = {sortBy && sortBy === "SORT_LOW_TO_HIGH"}
                        />
                        LOW_To_High
                    </label>
                </fieldset> 
            <Divider />

                <fieldset>
                    <legend>Filter</legend>
                    <label>
                        <input 
                        type = "checkbox"
                        name = "filter"
                        onChange ={() => dispatch({
                            type : "SHOW_MAGNETIC_ONLY"
                        })}
                        />
                        Magnetic
                    </label>
                    <label>
                        <input 
                        type = "checkbox"
                        name = "filter"
                        onChange ={() => dispatch({
                            type : "SHOW_WOODEN_ONLY"
                        })}
                        />
                        Wooden
                    </label>
                    <label>
                        <input 
                        type = "checkbox"
                        name = "filter"
                        checked={showFoldableOnly}
                        onChange ={() => dispatch({
                            type : "SHOW_FOLDABLE_ONLY"
                        })}
                        />
                        Foldable
                    </label>
                </fieldset>
                </Paper>
            </div>
        </Container>
    
    <Container className={classes.productContainer}>
        <Grid container spacing={3}>
            {!filteredData && <p>Loading ....</p>}
            {filteredData?.map((product) =>(
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
                                <Typography variant="body2" color="textSecondary" component="p">
                                  {`Type : ${product?.isMagnetic  ? "Magnetic ," : ""} 
                                  ${product?.isWooden ?  "Wooden ," : ""}
                                  ${product?.isFolding ? "Foldable ," : ""}
                                  `}                           
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                        <Button size="small" color="primary">
                        <Link to={`/products/${product?._id}`} color="inherit">
                          See Details 
                        </Link>
                        </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Container>
       
    </div>
   )
};

