import { useImage } from "@/hooks/useImage";
import { supabase } from "@/lib/supabaseClient";
import { Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver"; 
import { Button } from "./ui/button";


const OutputControl = () => {
  const { imageUrl, loadingState } = useImage();

  const [imgUrl, setImgUrl] = useState("");

  const clearBucket = async () => {
    try {
      await supabase.storage.emptyBucket("portrait_bucket");
      console.log("Bucket cleared successfully.");
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.error("Error clearing bucket:", error.message);
      }
    }
  };
  useEffect(() => {
    setImgUrl(imageUrl);
    console.log(imageUrl);
    if (imageUrl) {
      clearBucket();
    }
  }, [imageUrl]);

  const handleDownload = () => {
    // Check if imageUrl is available
    if (imageUrl) {
      // Use file-saver to trigger download
      saveAs(imgUrl, "output_image.jpg");
    }
  };

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

      {/* Download button */}
      <Button
        className="absolute bottom-4 right-4 rounded-full flex justify-center items-center bg-secondary"
        onClick={handleDownload}
        disabled={
          loadingState === "loading" || loadingState === "idle" ? true : false
        }
      >
        <span className="text-md">Download</span> {<Download className="w-4 h-4 ml-2" />}
      </Button>
    </div>
  );
};

export default OutputControl;
