import Head from "next/head";
import Header from "@/components/Header";

const Layout = ({ children}) => {
  

  return (
    <div className="">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mt-5 flex flex-col justify-center items-center h-full">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
