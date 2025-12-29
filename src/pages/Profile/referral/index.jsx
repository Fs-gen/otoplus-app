import CardReferral from "@/components/Card/CardReferral";
import HeaderBack from "@/components/Header/HeaderBack";
import DataReferral from "@/pages/api/dummy.json";

const Referral = () => {
  return (
    <section>
      <HeaderBack text="Referral Saya" />
      <div className="section-box">
        <div className="flex flex-col gap-3">
          {DataReferral.referral.map((item, index) => {
            return <CardReferral props={item} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Referral;
