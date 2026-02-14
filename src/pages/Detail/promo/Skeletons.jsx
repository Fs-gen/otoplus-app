import { highlightSkeleton } from "@/styles/style";
import Skeleton from "react-loading-skeleton";

const Skeletons = () => {
  return (
    <section>
      <Skeleton count={1} height={200} highlightColor={highlightSkeleton} />
      <div className="flex flex-col gap-4 p-2 mt-2">
        <Skeleton count={2} highlightColor={highlightSkeleton} />
        <Skeleton count={1} width={150} highlightColor={highlightSkeleton} />
        <Skeleton count={15} highlightColor={highlightSkeleton} />
      </div>
    </section>
  );
};

export default Skeletons;
