import CreateHost from "@/components/CreateHost";
import Home from "@/components/Home";
import Head from "next/head";
import { useState } from "react";

export default function Index() {
  const [path, setPath] = useState<string>("home");
  const handlePath = (path: string) => {
    test();
    setPath(path);
  };

  const test = async () => {
    await fetch("/api/socket?option=connection");
  };

  switch (path) {
    case "create-room":
      return <CreateHost />;
    default:
      return (
        <>
          <Head>
            <title>BITW - Start</title>
          </Head>
          <Home path={handlePath} />
        </>
      )
  }
}
