/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "next/head";

const TitleSection = ({ title, header, optional }: any) => {
  return (
    <div className="py-4 ">
      <Head>
        <title>{`EaseMart | ${title}`}</title>
      </Head>
      <div className="text-center font-semibold text-4xl" >
        <h1 className="pt-4">
          {header} <span className=" text-4xl">{optional}</span>
        </h1>
      </div>
    </div>
  );
};

export default TitleSection;
