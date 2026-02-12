import Head from "next/head";
import Image from "next/image";
import ErrorIMG from "@/assets/images/illustration/error.png";

const Box = "flex flex-col items-center gap-4";

const Fallback = () => (
  <>
    <Head>
      <title>Offline</title>
    </Head>
    <div className="min-h-dvh flex flex-col justify-center items-center">
      <div className={Box}>
        <Image
          src={ErrorIMG}
          width={300}
          height={300}
          quality={100}
          alt="Illustration Network Error!"
        />
        <h1 className="font-semibold">
          Oops, sepertinya jaringan anda bermasalah!
        </h1>
      </div>
    </div>
  </>
);

export default Fallback;
