import { highlightSkeleton } from "@/styles/style";
import Skeleton from "react-loading-skeleton";

const SkeletonDetailCar = () => {
  return (
    <section>
      <Skeleton count={1} height={250} highlightColor={highlightSkeleton} />
      <div className="flex flex-col gap-6 p-5">
        <Skeleton count={3} height={15} highlightColor={highlightSkeleton} />
        <div className="flex gap-2">
          <Skeleton
            width={125}
            height={25}
            borderRadius={100}
            highlightColor={highlightSkeleton}
          />
          <Skeleton
            width={125}
            height={25}
            borderRadius={100}
            highlightColor={highlightSkeleton}
          />
          <Skeleton
            width={125}
            height={25}
            borderRadius={100}
            highlightColor={highlightSkeleton}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton
            count={1}
            height={80}
            borderRadius={20}
            highlightColor={highlightSkeleton}
          />
          <Skeleton
            count={1}
            height={80}
            borderRadius={20}
            highlightColor={highlightSkeleton}
          />
          <Skeleton
            count={1}
            height={80}
            borderRadius={20}
            highlightColor={highlightSkeleton}
          />
        </div>
      </div>
    </section>
  );
};

export default SkeletonDetailCar;
