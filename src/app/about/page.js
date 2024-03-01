import Head from "next/head";
import Header from "../_components/Header";

export default function AboutPage() {
  return (
    <div className="text-white">
      <Head>
        <title>About Us - FitFusion</title>
        <meta name="description" content="Learn more about FitFusion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="h-screen flex justify-center pt-12">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">About FitFusion</h1>
            <p className="text-lg">Elevating your fitness journey</p>
            {/* Add any additional content about your company */}
          </div>
        </div>
      </main>
      {/* Add any additional sections or content specific to the About page */}
    </div>
  );
}
