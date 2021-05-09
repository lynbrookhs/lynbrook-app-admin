import {
  colors,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { FuegoProvider } from "@nandorojo/swr-firestore";
import "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Suspense, useEffect } from "react";
import NoSSR from "react-no-ssr";
import { FirebaseAppProvider } from "reactfire";
import NProgressBar from "~/components/NProgressBar";
import Spinner from "~/components/Spinner";
import { Fuego } from "~/helpers/fuego";
import EmptyLayout from "~/layouts/EmptyLayout";
import "../styles/globals.css";

const firebaseConfig = {
  apiKey: "AIzaSyAvG7Wbgn3qbQs67ALvONDoX7LBb5QvZSc",
  authDomain: "lynbrook-high-school.firebaseapp.com",
  databaseURL: "https://lynbrook-high-school.firebaseio.com",
  projectId: "lynbrook-high-school",
  storageBucket: "lynbrook-high-school.appspot.com",
  messagingSenderId: "591406000207",
  appId: "1:591406000207:web:34b4c5c786d803e446e23a",
};

const fuego = new Fuego(firebaseConfig);

const theme = createMuiTheme({
  nprogress: {
    color: "black",
  },
  palette: {
    primary: colors.indigo,
    secondary: colors.red,
  },
});

const MyApp = ({ Component, pageProps }) => {
  const Layout = Component.layout || EmptyLayout;
  const layoutProps = Component.layoutProps || {};

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", NProgress.start);
    router.events.on("routeChangeComplete", NProgress.done);
    router.events.on("routeChangeError", NProgress.done);
  }, []);

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
      <FuegoProvider fuego={fuego}>
        <ThemeProvider theme={theme}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
          </Head>
          <CssBaseline />
          <NProgressBar />

          <NoSSR>
            <Suspense fallback={<Spinner />}>
              <Layout {...layoutProps} pageProps={pageProps}>
                <Component {...pageProps} />
              </Layout>
            </Suspense>
          </NoSSR>
        </ThemeProvider>
      </FuegoProvider>
    </FirebaseAppProvider>
  );
};

export default MyApp;
