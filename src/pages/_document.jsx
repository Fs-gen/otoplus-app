import { Html, Head, Main, NextScript } from "next/document";

export default function Document({ origin }) {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="OtoplusID" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="OtoplusID" />
<meta name="description" content="Jual Mobil Daihatsu Dan Dapatkan Reward!" />
<meta name="format-detection" content="telephone=no" />
<meta name="mobile-web-app-capable" content="yes" />
{/* <meta name="msapplication-config" content="/icons/browserconfig.xml" />
<meta name="msapplication-TileColor" content="#2B5797" />
<meta name="msapplication-tap-highlight" content="no" /> */}
<meta name="theme-color" content="#000000" />

<link rel="apple-touch-icon" href="/icons/logo-512.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/icons/logo-152.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/icons/logo-180.png" />
<link rel="apple-touch-icon" sizes="167x167" href="/icons/logo-167.png" />

<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon.ico" />
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon.ico" />
<link rel="manifest" href="/manifest.json" />
<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
<link rel="shortcut icon" href="/favicon.ico" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:url" content={origin} />
<meta name="twitter:title" content="OtoplusID" />
<meta name="twitter:description" content="Jual Mobil Daihatsu Dan Dapatkan Reward!" />
<meta name="twitter:image" content={origin+'/icons/logo-152.png'} />
<meta name="twitter:creator" content="@DavidWShadow" />
<meta property="og:type" content="website" />
<meta property="og:title" content="OtoplusID" />
<meta property="og:description" content="Jual Mobil Daihatsu Dan Dapatkan Reward!" />
<meta property="og:site_name" content="OtoplusID" />
<meta property="og:url" content={origin} />
<meta property="og:image" content={origin+'/icons/logo-152.png'} />

        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);
  
  // Mendapatkan origin secara dinamis
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = ctx.req?.headers?.host || 'localhost:3000';
  const origin = `${protocol}://${host}`;
  
  return { ...initialProps, origin };
};
