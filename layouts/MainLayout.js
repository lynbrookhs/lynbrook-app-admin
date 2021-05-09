import {
  AppBar,
  Avatar,
  CircularProgress,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  makeStyles,
  NoSsr,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Dashboard, ExitToApp, Forum, Menu } from "@material-ui/icons";
import ErrorBoundary from "components/ErrorBoundary";
import WrappedLink from "components/WrappedLink";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthCheck, useUser } from "reactfire";

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const NavigationLink = ({ title, href, icon, ...props }) => {
  const router = useRouter();
  const component = href ? WrappedLink : "div";

  return (
    <ListItem
      button
      component={component}
      selected={router.pathname === href}
      href={href}
      {...props}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};

const Profile = ({ user }) => (
  <List>
    <ListItem>
      <ListItemAvatar>
        <Avatar alt="Profile Image" src={user.photoURL} />
      </ListItemAvatar>
      <ListItemText primary={user.displayName} secondary="Logged In" />
    </ListItem>
  </List>
);

const Navigation = ({ user }) => {
  const classes = useStyles();
  return (
    <div className={classes.navigation}>
      <Profile user={user} />
      <Divider />
      <List>
        <NavigationLink
          title="Dashboard"
          href="/dashboard"
          icon={<Dashboard />}
        />
      </List>
      <Divider />
      <List>
        <NavigationLink
          title="Sign Out"
          href="/api/logout"
          icon={<ExitToApp />}
        />
      </List>
    </div>
  );
};

const MainLayoutContent = ({ children, title }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const { data: user } = useUser();

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>{title && `${title} • `}Lynbrook ASB</title>
      </Head>

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleOpen}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title ?? "Lynbrook ASB"}
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={open}
            onClose={toggleOpen}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
          >
            <Navigation user={user} />
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open
          >
            <Navigation user={user} />
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
    </div>
  );
};

const MainLayout = (props) => (
  <NoSsr>
    <AuthCheck fallback={<CircularProgress />}>
      <MainLayoutContent {...props} />
    </AuthCheck>
  </NoSsr>
);

export default MainLayout;
