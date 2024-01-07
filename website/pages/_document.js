import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <script async type="text/javascript" src="/static/script.js" />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WN379M2"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        /> */}
      </body>
    </Html>
  );
}
