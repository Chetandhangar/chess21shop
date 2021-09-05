import {Navbar, NavbarBrand, NavItem, Nav, Button, NavLink} from 'reactstrap';
import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../contexts/auth-context'

export const Header = () => {
    const {isUserLogin, logout, userName} = useAuth();
    return(
        <React.Fragment>
            <Navbar dark color="primary" expand="md">
                <div className="container">
                    <NavbarBrand>Chess21</NavbarBrand>

                    <Nav navbar>
                        <NavItem >
                            <Link className="nav-link" to='/' style={{cursor : "pointer"}}>
                                <span className="fa fa-home fa-lg"></span>Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to='/cart'style={{cursor : "pointer"}}>
                            <span className="fa fa-list fa-lg"></span>Cart</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/wishlist"style={{cursor : "pointer"}}>
                                <span className="fa fa-heart fa-lg"></span>WishList</Link>
                        </NavItem>
                        <NavItem>
                            {isUserLogin ? 
                            <>
                                <Button color="primary" onClick={() => logout()}>
                                <span className="fa fa-sign-out fa-lg">Logout</span>
                                </Button>
                                <span style={{color : "white"}}>{`HI ${userName}`}</span>
                            </>
                             :
                                <Link className="nav-link" to="/login"style={{cursor : "pointer"}}>
                                <span className="fa fa-sign-in fa-lg"></span>Login</Link>
                            }
                        </NavItem>
                    </Nav>
                   
                </div>
            </Navbar>
        </React.Fragment>
    )
}
<NavItem>
<NavLink className="nav-link" to="/favorites">
    <span className="fa fa-heart fa-lg"></span> My Favorites</NavLink>
</NavItem>