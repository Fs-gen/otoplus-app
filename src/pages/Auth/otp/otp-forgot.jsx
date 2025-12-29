import OTPIcon from "@/assets/images/icons/otp.png";
import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import HeaderBack from "@/components/Header/HeaderBack";
import Image from "next/image";

const OTPForgot = () => {
  return (
    <section>
      <HeaderBack text="Verifikasi OTP" />
      <div className="section-box text-center flex flex-col gap-4 items-center">
        <Image src={OTPIcon} width={85} height={40} alt="OTP Icon" />
        <h1 className="text-xl font-semibold">Verifikasi OTP</h1>
        <p className="text-xs">
          Masukkan kode OTP yang telah dikirimkan ke whatsapp anda
        </p>
        <form action="" method="post" className="w-full">
          <FormLine placeholder="Masukkan kode OTP" />
          <div className="mt-4.5 ">
            <ButtonForm text="Verifikasi" type="submit"/>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OTPForgot;
