import { NoSsr, withStyles } from "@material-ui/core";
import NProgress from "nprogress";
import React from "react";

NProgress.configure({
  template: `
    <div class="nprogress-bar" role="bar">
      <dt></dt>
      <dd></dd>
    </div>
  `,
});

const styles = (theme) => {
  if (!theme.nprogress.color) {
    throw new Error(
      "Material-UI: You need to provide a `theme.nprogress.color` property" +
        " for using the `NProgressBar` component."
    );
  }

  return {
    "@global": {
      "#nprogress": {
        direction: "ltr",
        pointerEvents: "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: theme.zIndex.tooltip,
        backgroundColor: "#e0e0e0",
        "& .nprogress-bar": {
          position: "fixed",
          backgroundColor: theme.nprogress.color,
          top: 0,
          left: 0,
          right: 0,
          height: 2,
        },
        "& dd, & dt": {
          position: "absolute",
          top: 0,
          height: 2,
          boxShadow: `${theme.nprogress.color} 1px 0 6px 1px`,
          borderRadius: "100%",
          animation: "mui-nprogress-pulse 2s ease-out 0s infinite",
        },
        "& dd": {
          opacity: 0.6,
          width: 20,
          right: 0,
          clip: "rect(-6px,22px,14px,10px)",
        },
        "& dt": {
          opacity: 0.6,
          width: 180,
          right: -80,
          clip: "rect(-6px,90px,14px,-6px)",
        },
      },
      "@keyframes mui-nprogress-pulse": {
        "30%": {
          opacity: 0.6,
        },
        "60%": {
          opacity: 0,
        },
        to: {
          opacity: 0.6,
        },
      },
    },
  };
};

const GlobalStyles = withStyles(styles, {
  flip: false,
  name: "MuiNProgressBar",
})(() => null);

const NProgressBar = ({ children }) => {
  return (
    <NoSsr>
      {children}
      <GlobalStyles />
    </NoSsr>
  );
};

export default NProgressBar;
