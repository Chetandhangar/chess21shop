import React,{ useState } from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../../contexts/auth-context';
import {useStyles} from './HeaderStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {useNavigate} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import {useWishList} from '../../contexts/wishlist-context';
import {useDataCart} from '../../contexts/cart-provider';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';

export const Header = () => {
  const {isUserLogin, logout, userName} = useAuth();
  const {wishlist} = useWishList();
  const {cart} = useDataCart();
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

 const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogin = () => {
    navigate("/login")
 }
 const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
        {
            isUserLogin ? (
                <>
             <MenuItem onClick={() =>  logout()}>Logout</MenuItem>
            <MenuItem>{`Hi ${userName}`}</MenuItem>
            </>
            ) : 
            (
             <MenuItem onClick={() => handleLogin()}>SignIn</MenuItem>
            )
        }
        
     
   
    </Menu>
  );

 

  
  return(
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{color : "white"}}>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <Home />
        </IconButton>
        </Link>
        <Typography variant="h6" className={classes.title}>
          Chess21
        </Typography>
        <Tooltip title="Wishlist">
            <Link to="/wishlist"  style={{color : "white"}}>
                <IconButton aria-label="show watch later" color="inherit">
                <Badge badgeContent={`${wishlist?.length}`} color="secondary">
                    <FavoriteIcon/>
                </Badge>
                </IconButton>
            </Link>
            </Tooltip>
        <Tooltip title="Cart">
            <Link to="/cart"  style={{color : "white"}}>
            <IconButton aria-label="show history" color="inherit">
            <Badge badgeContent={`${ cart?.length }`} color="secondary">
                <ShoppingCartIcon/>
            </Badge>
            </IconButton>
        </Link>
        </Tooltip>
        <Tooltip title="Profile">
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            </Tooltip>
      </Toolbar>
    </AppBar>
    {renderMenu}
  </div>
    )
}




/*
 <div className={classes.grow}>
         <AppBar position="static">
         <Toolbar>
         <Link to="/"  style={{color : "white"}}>
         <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
              <Home />
          </IconButton>
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            Chess21
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <Tooltip title="Cart">
             <Link to="/cart"  style={{color : "white"}}>
                <IconButton aria-label="show history" color="inherit">
                <Badge badgeContent={`${ cart?.length }`} color="secondary">
                    <HistoryIcon/>
                </Badge>
                </IconButton>
            </Link>
            </Tooltip>
            <Tooltip title="Wishlist">
            <Link to="/wishlist"  style={{color : "white"}}>
                <IconButton aria-label="show watch later" color="inherit">
                <Badge badgeContent={`${wishlist?.length}`} color="secondary">
                    <WatchLaterIcon/>
                </Badge>
                </IconButton>
            </Link>
            </Tooltip>
            <Tooltip title="Profile">
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            </Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
         </Toolbar>
         </AppBar>
         {renderMobileMenu}
         {renderMenu}
    </div>
        
*/