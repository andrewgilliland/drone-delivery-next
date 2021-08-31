import Head from "next/head";
// import Header from "@components/Header";
// import Footer from "@components/Footer";

const Layout = ({ children}) => {
  

  return (
    <div className="mt-10">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header /> */}
      <main className="flex flex-col justify-center items-center h-full">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
