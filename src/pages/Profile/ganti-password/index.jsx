import { ButtonForm } from "@/components/Button";
import FormLine from "@/components/Form/FormLine";
import { useState } from "react";

const { default: HeaderBack } = require("@/components/Header/HeaderBack");

const GantiPassword = () => {
  return (
    <section>
      <HeaderBack text="Ganti Password" click={() => history.back()} />
      <div className="section-box">
        <form action="" method="post">
          <FormLine title="Masukkan Password Baru" small />
          <div className="mt-2.5"></div>
          <FormLine title="Konfirmasi Password Baru" small />
          <div className="text-center mt-10">
            <ButtonForm text="Update Password" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default GantiPassword;
