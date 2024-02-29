import { useImage } from "@/hooks/useImage";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";

const OutputControl = () => {
  const { imageUrl, loadingState } = useImage();

  const { progress, setProgress } = useState(0);

  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    // Function to update progress
    const updateProgress = () => {
      // Calculate the new progress value
      const newProgress = Math.min(progress + 3, 100);
      // Update the progress state
      setProgress(newProgress);
    };

    // Start updating progress every 3 seconds
    const interval = setInterval(updateProgress, 3000);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [progress]); // Run the effect whenever progress changes

  useEffect(() => {
    // setImgUrl(imageUrl);
    // console.log(imageUrl);

        const loadImage = () => {
          setImgUrl(imageUrl);
          // Reset progress to 0 when a new image URL is set
          setProgress(0);
        };

        if (imageUrl) {
          loadImage();
        }
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
          // <span className="text-sm opacity-50">Loading... </span>
          <>
            <Progress value={progress} />

            {/* <Skeleton  className="h-full w-full "/> */}
          </>
        )}

        {loadingState === "loaded" && (
          <img
            src={imgUrl}
            alt="output"
            className=" h-full object-cover rounded-md"
          />
        )}
      </div>
    </div>
  );
};

export default OutputControl;
