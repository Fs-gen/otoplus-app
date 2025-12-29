import Logo from "@/assets/images/icons/logo.png";
import { ButtonLink } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import LinkText from "@/components/LinkText";
import Image from "next/image";

const NewPassword = () => {
  return (
    <section className="min-h-screen flex flex-col justify-between items-center">
        <span></span>
      <div className="section-box">
        <Image
          src={Logo}
          width={100}
          height={100}
          alt="Logo"
          className="mx-auto"
        />
        <h1 className="my-8 text-sm font-semibold text-center">
          Buat Password Baru
        </h1>
        <form action="" method="post">
          <FormLine placeholder="Masukkan Password Baru" title="Password Baru" />
          <div className="text-center mt-12">
            <ButtonLink href={"/Auth/Login"} text="Ubah Password" />
          </div>
        </form>
      </div>
      <LinkText text="Tidak jadi ubah password?" href={'/Auth/Login'} linkText="Login"/> 
    </section>
  );
};

export default NewPassword;
