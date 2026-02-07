import { Copy } from "lucide-react";
import Skeleton from "react-loading-skeleton";

const InputCopy = ({ title, desc, props, id, copy }) => {
    
  return (
    <div className="mx-4 my-8.5">
      <h1 className="font-semibold mb-4">{title}</h1>
      <p className="font-semibold text-xs text-text-gray">{desc}</p>
      <div className="flex justify-between gap-4 items-center mt-1.5">
        {props && props.length == 0 ? (
          <Skeleton
            borderRadius={10}
            count={1}
            containerClassName="w-full"
            height={30}
            highlightColor={highlightSkeleton}
          />
        ) : (
          <input
            id={id}
            disabled
            className="text-sm font-medium placeholder:text-black py-1.5 px-3 border border-gray-semi rounded-lg w-full"
            value={props}
          />
        )}
        <button onClick={copy}>
          <Copy size={25} />
        </button>
      </div>
    </div>
  );
};

export default InputCopy