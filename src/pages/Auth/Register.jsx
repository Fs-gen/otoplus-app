import Logo from "@/assets/images/icons/logo.png";
import Button from "@/components/Button";
import Form from "@/components/Form";
import LinkText from "@/components/LinkText";
import Image from "next/image";
import Link from "next/link";

const Register = () => {
  return (
    <section className="min-h-screen flex flex-col justify-between items-center">
      {/* <Link href={"/"}>Home</Link>
      <Link href={'/auth/Login'}>Login</Link> */}
      <div className="section-box">
        <Image
          src={Logo}
          width={100}
          height={100}
          alt="Logo"
          className="mx-auto"
        />
        <h1 className="text-heading-14 text-center my-8">
          Daftar Akun OtoPlus
        </h1>
        <form action="" method="post" className="flex flex-col gap-5">
          <Form title="No. Whatsapp" />
          <Form title="Password" />
          <Form title="Kode Referral (Optional)" />
          <Button type="submit" text="Daftar" />
        </form>
      </div>
      <LinkText href={'/Auth/Login'} text="Sudah Punya Akun?" linkText="Login" />
    </section>
  );
};

export default Register;
