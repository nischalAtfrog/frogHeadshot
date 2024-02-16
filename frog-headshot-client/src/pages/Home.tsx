import React, { useEffect, useState } from "react";
import Header from "@/components/header";

import PortraitConfig from "@/components/portrait-config";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import OutputControl from "@/components/output-control";

const Home = () => {
  const [open, setOpen] = useState(false);

  const wait = () => new Promise((resolve) => setInterval(resolve, 1000));

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    wait().then(() => {
      setOpen(true);
      intervalId = setInterval(() => {
        setOpen(false);
      }, 20000);
    });

    return () => {
      clearInterval(intervalId); // Cleanup function to clear the interval
    };
  }, []);

  return (
    <React.Fragment>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="pointer-events-none selection:none  select-none">
          <DialogHeader>
            <DialogTitle className="text-xl relative h-fit  text-left mb-1 text-primary ">
              Portraits.{" "}
              <span className="text-xs  text-foreground"> ( Beta ) </span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="  w-full text-justify text-[14px]">
            Get your professional portrait done by AI within minutes. But Its in
            Beta, so AI's gonna need help in setting some qualities that could
            make you stand out.
          </DialogDescription>
          <span className=" text-destructive text-sm">
            Instructions by the Maker : please use it responsibly
          </span>
        </DialogContent>
      </Dialog>

      <main
        className="h-screen w-screen p-2 flex justify-items-center items-center flex-col  select-none
      "
      >
        <Header />
        {/* <CameraShutter/> */}
        <div className="app-container min-h-[85%] w-[80%] mx-auto  relative rounded-[60px]  grid grid-cols-6 gap-4 overflow-hidden p-5">
          {/* <IntroSection /> */}
          <div className="left h-full   relative flex items-center flex-col overflow-hidden col-span-2 gap-3 ">
            <Info
              className={`h-[1.25rem] w-[1.25rem] absolute  top-3 right-3 z-50 opacity-50 cursor-pointer `}
              strokeWidth={2}
            />

            <button
              className="absolute top-3 right-3 z-50 opacity-50 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Info className="h-[1.25rem] w-[1.25rem]" strokeWidth={2} />
            </button>
            <PortraitConfig />
          </div>
          <div className="right h-full  border-2 rounded-[20px] relative col-span-3 p-5 ">
            <OutputControl />
          </div>
        </div>
        <span className="mt-5">Made with 🧠 & ❤️ by DT, frog India </span>
      </main>
    </React.Fragment>
  );
};

export default Home;
