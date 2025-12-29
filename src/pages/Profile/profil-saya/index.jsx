import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import HeaderBack from "@/components/Header/HeaderBack";

const ProfilSaya = () => {
  return (
    <section>
      <HeaderBack text="Profil Saya" />
      <div className="section-box">
        <form action="" method="post" className="flex flex-col gap-2.5">
          <FormLine title="Nama Lengkap" small />
          <FormLine title="No. Whatsapp" small readOnly/>
          <FormLine title="Email" small />
          <div>
            <h1 className="text-xs mb-1.25">Alamat</h1>
            <textarea
              rows="4"
              className="py-2 px-4 p-3 placeholder:text-gray-light focus:outline-blue-light font-semibold w-full
          small text-xs rounded-xl border border-gray-light"
            />
          </div>
          <FormLine title="Provinsi" small />
          <FormLine title="Kabupaten / Kota" small />
          <FormLine title="Sponsor" small readOnly/>
          <div className="mt-5"></div>
          <ButtonForm text="Update Profile" />
        </form>
      </div>
    </section>
  );
};

export default ProfilSaya;
