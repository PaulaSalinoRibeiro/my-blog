import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript  } from 'next/document';
 import Script from "next/script";
class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
 
    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head lang='pt-BR'>
          <title>Paula Ribeiro | Blog</title>
          <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
          <Script 
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            strategy="afterInteractive"
          />
          <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
          `}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
 
export default MyDocument;
 
  
