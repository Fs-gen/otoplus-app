import Image from "next/image";
import Logo from "@/assets/images/icons/logo.png";
import LinkText from "@/components/LinkText";
import FormLine from "@/components/Form/FormLine";
import { ButtonLink } from "@/components/Button";

const Forgot = () => {
  return (
    <section className="section-box min-h-screen flex flex-col justify-between items-center">
      <span></span>
      <div className="flex flex-col justify-center w-full">
        <Image
          src={Logo}
          width={100}
          height={100}
          alt="Logo"
          className="mx-auto"
        />
        <h1 className="text-sm font-semibold mt-8 mb-9 text-center">
          Lupa Password
        </h1>
        <form action="" method="post">
          <FormLine
            title="No. Whatsapp"
            placeholder="Masukkan No. Whastapp"
            small
          />
          <div className="text-center mt-12">
            <ButtonLink href={"/Auth/otp/otp-forgot"} text="Kirim" />
          </div>
        </form>
      </div>
      <LinkText
        text="Sudah Ingat Sandi Anda?"
        href={"/Auth/Login"}
        linkText="Login"
      />
    </section>
  );
};

export default Forgot;
