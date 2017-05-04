import Document, { Head, Main, NextScript } from 'next/document'
import { StyleSheetServer } from 'aphrodite'

export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage }) {
    const {html, css} = StyleSheetServer.renderStatic(() => renderPage())
    return {...html, css}
  }

  constructor (props) {
    super(props)
    const { __NEXT_DATA__, css } = props
    if (css && css.renderedClassNames) {
      __NEXT_DATA__.ids = css.renderedClassNames
    }
  }

  render () {
    return (
      <html>
        <Head>
          <title>My page</title>
          <style data-aphrodite dangerouslySetInnerHTML={{ __html: this.props.css.content }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
