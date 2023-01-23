import "../styles/globals.css";
import { wrapper } from "../store";

function MyApp({ Component, ...pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);
    return getLayout(<Component {...pageProps} />);
}

export default wrapper.withRedux(MyApp);
