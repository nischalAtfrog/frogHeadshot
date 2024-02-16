const OutputControl = () => {
  return (
    <div className=" w-full flex items-start flex-col  relative rounded-[20px]  h-[100%] ">
      <span className=" text-base mb-2">Photo Reel</span>
      <p className="text-sm opacity-4 flex  items-center justify-center">
        <span className=" opacity-50 ">
          Refer to the info if the output image is not as expected.
        </span>
      </p>
      <div className="output-image w-full bg-secondary h-[70%] rounded-md mt-6 flex justify-center items-center  ">
        {/* <img
          src="/images/output-image.png"
         
          className="w-full h-full"
        /> */}
      </div>
    </div>
  );
};

export default OutputControl;
