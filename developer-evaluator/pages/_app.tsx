import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConfigProvider, Layout } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "../styles/globals.css";

const { Content } = Layout;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ minHeight: "100vh", background: "#1f1f1f" }}>
        <Content style={{ padding: "24px" }}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default MyApp;
