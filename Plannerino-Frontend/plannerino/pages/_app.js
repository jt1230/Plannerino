import "styles/globals.css";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import theme from "utils/theme";
import { RecoilRoot } from "recoil";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Plannerino</title>
        <meta name="description" content="Plan your time easier." />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
