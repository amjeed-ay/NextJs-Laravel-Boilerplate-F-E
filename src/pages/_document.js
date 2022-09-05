import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    {/* <link
                        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"
                        rel="stylesheet"
                    /> */}
                </Head>
                <body className="font-sans subpixel-antialiased bg-theme-100">
                    <Main />
                    <NextScript />

                    <script
                        type="text/javascript"
                        src="https://oss.sheetjs.com/sheetjs/xlsx.full.min.js"></script>
                    <script
                        type="text/javascript"
                        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
                    <script
                        type="text/javascript"
                        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.20/jspdf.plugin.autotable.min.js"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument
