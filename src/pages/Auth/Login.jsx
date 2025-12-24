import HeaderBack from "@/components/Header/HeaderBack";
import Logo from "@/assets/images/icons/logo.png";
import Image from "next/image";
import Form from "@/components/Form";
import Link from "next/link";
import Button from "@/components/Button";
import LinkText from "@/components/LinkText";

const Login = () => {
  return (
    <section>
      <div className="min-h-screen flex flex-col justify-between">
        <HeaderBack text="Login" />
        <div className="section-box">
          <Image
            src={Logo}
            width={100}
            height={100}
            alt="Logo"
            className="mx-auto"
          />
          <h1 className="mt-6.25 text-center text-heading-14">
            Masuk ke Otoplus App
          </h1>
          <form action="submit" className="flex flex-col gap-4 mt-7.5 mb-8">
            <Form placeholder="Email / No Handphone" />
            <Form placeholder="Password" />
            <Link href={"/"} className="text-xs font-semibold text-blue-dark">
              Lupa kata sandi?
            </Link>
            <Button text="Masuk" type="submit" />
            <Link href={'/Home'} className="text-center">Home</Link>
          </form>
        </div>
        <LinkText href={'/Auth/Register'} text="Belum Punya Akun?" linkText="Daftar" />
      </div>
    </section>
  );
};

export default Login;
