// WE ARE THINKING WE WILL GUT THIS AND DO A TABS BAR INSTEAD.


import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CollectionBookmark from '@material-ui/icons/CollectionsBookmarkOutlined';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import List from '@material-ui/icons/ListAltSharp';
import Close from '@material-ui/icons/CloseSharp';


//Stylesheet for the navigation bar. 
//Used in the withStyles method of material-ui when exporting
//to inject the styles.
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 5,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 100,
    marginRight: 30,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});
/////////////////////////////////////////////

class Navigation  extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      anchorEl: null, //
      // open property?
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.reset = this.reset.bind(this);
    this.changeState = this.changeState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  //For login/logout menu
  handleClick = e => {
    this.setState({anchorEl: e.currentTarget});
  }

  handleClose = () => {
    console.log("handle close called")
    this.setState({anchorEl: null});
  }

  changeState(loc) {
    this.setState({
      location: loc
    });

  }

 // resets search bar after search
  reset() {
    this.setState({
      location: '',
    });
  }

  //Saves search query
  onChange(e) {
    this.changeState(e.target.value);
  }

  //For Search Bar
  handleSubmit(e) {
    this.props.search(this.state.location)
    e.preventDefault();

  }

  // for setting location
  changeState(loc) {
    console.log(loc);
    this.setState({
      location: loc
    });

  }

    render(){
      const {anchorEl} = this.state;
      const {classes} = this.props;
      return (
        <div className={classes.root}>
        <AppBar position="static" >
            <Toolbar>
                <Typography variant="h5" className={classes.title} variant="title" color="inherit" component={Link} to="/">
                BOCS Project
                </Typography>
                <div className={classes.grow} />

                {/* Login */}
                {!sessionStorage.getItem('userId') ?  
                  (<IconButton className={classes.menuButton} color="inherit" aria-label="Menu" component={Link} to="/login">
                  <AccountCircle 
                  aria-owns={anchorEl ? 'menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  onClose={this.handleClose}
                  />
                </IconButton>) : null}     

                {/* Signup and Login drop down when user not logged in */}
                {/* <Menu
                id='menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                >
                <MenuItem onClick={this.handleClose} component={Link} to="/signup">Signup</MenuItem>
                <MenuItem onClick={this.handleClose} component={Link} to="/login">Login</MenuItem>
                </Menu>         */}

                {/* Logout */}
                {sessionStorage.getItem('userId') ?                 
                (<IconButton className={classes.menuButton} color="inherit" aria-label="Menu" component={Link} to="/logout">
                  <Close onClick={this.props.logout}/>
                </IconButton> ): null}
            </Toolbar>
        </AppBar>
      </div>
    )
  }
}

//Export with injected styles through material-ui
export default withStyles(styles)(Navigation);