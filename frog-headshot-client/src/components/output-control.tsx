import { useImage } from "@/hooks/useImage";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
// import { Progress } from "./ui/progress";
// import { Skeleton } from "./ui/skeleton";

const OutputControl = () => {
  const { imageUrl, loadingState } = useImage();

  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    setImgUrl(imageUrl);
    console.log(imageUrl);
  }, [imageUrl]);

  return (
    <div className=" w-full flex items-start flex-col  relative rounded-[20px]  h-[100%] ">
      <span className=" text-base mb-2">Photo Reel</span>
      <p className="text-sm opacity-4 flex  items-center justify-center">
        <span className=" opacity-50 ">
          Refer to the info if the output image is not as expected.
        </span>
      </p>
      <div className="output-image w-full h-[80%] rounded-md mt-6 flex justify-center items-center p-2 ">
        {loadingState === "idle" && (
          <span className="text-sm opacity-50">No image generated yet. </span>
        )}

        {loadingState === "loading" && (
          <span className="text-sm opacity-50">
            <Loader2 className="animate-spin" size={75} strokeWidth={1.25} />
          </span>
        )}

        {loadingState === "loaded" && (
          <img
            src={imgUrl}
            alt="output"

            className=" h-full object-cover rounded-md saturate-[0.75] contrast-[0.95]"
          />
        )}
      </div>
    </div>
  );
};

export default OutputControl;
