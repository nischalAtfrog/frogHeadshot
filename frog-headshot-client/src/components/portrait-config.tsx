import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Check,
  Loader2,
  RectangleHorizontal,
  RectangleVerticalIcon,
  Sparkles,
  Square,
  Upload,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "./ui/switch";

import { supabase } from "@/helpers/supabaseClient";

const PortraitConfig = () => {
  const [controlNetSliderValue, setControlNetSliderValue] = useState(0.5);
  const [ipAdapterSliderValue, setIpAdapterSliderValue] = useState(0.45);
  const [image, setImage] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const [imageChangeLoading, setImageChangeLoading] = useState(false);

  const getImageURL = async () => {
    if (file) {
      const { data } = await supabase.storage
        .from("portrait_bucket")
        .getPublicUrl(file.name);
      setImage(data.publicUrl);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const { data, error } = await supabase.storage
        .from("portrait_bucket")
        .upload(file.name, file);

      await getImageURL();

      if (data) {
        console.log("File uploaded successfully");
        console.log(file);
      } else {
        console.log(error);
        console.log("Error uploading file");
      }
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageChangeLoading(true);

    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }

    setImageChangeLoading(false);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    setIsUploading(true);

    await handleUpload();

    const prompt = formData.get("prompt") as string;
    const controlNet = formData.get("controlnet");
    const ip = formData.get("ipadapter");

    const style = formData.get("style");
    const orientation = formData.get("orientation");
    const branding = formData.get("branding");

    const formObject = {
      prompt: prompt,
      controlNet: controlNet,
      ip: ip,
      imgUrl: image,
      style: style,
      orientation: orientation,
      branding: branding,
    };

    console.log("---------------------------------");
    console.log("image", image);

    console.log("Form Object:", formObject);

    setIsUploading(false);
  };

  return (
    <React.Fragment>
      <div className="left-two w-full flex items-start flex-col overflow-hidden relative rounded-[20px] border-2 p-5 h-[100%]  ">
        <span className=" text-base mb-2">Prompting Controls</span>
        <p className="text-sm opacity-45 ">
          AI's gonna need help in setting some qualities that could make you
          stand out.
        </p>
        <Separator className="mb-4 mt-4" />
        <form onSubmit={submitHandler} className="w-full">
          <div className="prompt w-full ">
            <Label htmlFor="default-input" className="text-sm opacity-50">
              Prompt ( max 30 words)
            </Label>
            <Textarea
              name="prompt"
              className="mt-3 ml-2 placeholder:opacity-30 rounded-xl w-full"
              placeholder="Please write the features seperated by Comma, ex: brown eyes, pointy nose, brown hair."
              // onChange={handlePromptChange}
            />
          </div>
          <div className="sliders-container w-full mt-4 ">
            <div className="slider w-full">
              <Label htmlFor="default-range" className="text-sm opacity-50 ">
                ControlNet
              </Label>
              <div className="slider-main flex justify-between relative -top-3 ">
                <Slider
                  name="controlnet"
                  defaultValue={[controlNetSliderValue]}
                  max={1.0}
                  step={0.05}
                  className="w-[85%] "
                  onValueChange={(e) => setControlNetSliderValue(e[0])}
                />

                <p className="text-xs  bg-secondary h-10 w-12 rounded-xl flex items-center justify-center ">
                  {controlNetSliderValue}
                </p>
              </div>
            </div>
            <div className="slider w-full ">
              <Label htmlFor="default-range" className="text-sm opacity-50 ">
                IP Adapter
              </Label>

              <div className="slider-main flex justify-between items-center relative -top-3  ">
                <Slider
                  name="ipadapter"
                  defaultValue={[ipAdapterSliderValue]}
                  max={1.0}
                  step={0.05}
                  className="w-[85%]  "
                  onValueChange={(e) => setIpAdapterSliderValue(e[0])}
                />

                <p className="text-xs  bg-secondary h-10 w-12 rounded-xl flex items-center justify-center ">
                  {ipAdapterSliderValue}
                </p>
              </div>
            </div>
          </div>

          <span className="text-sm opacity-50">Input Image Controls</span>
          <div className="flex w-fit  justify-start items-start flex-col   h-fit rounded-xl  ml-2 mt-2">
            <div className="  rounded-xl flex justify-center items-center ">
              <Label
                htmlFor="picture"
                
                className="text-sm upload-image flex justify-center items-center opacity-50  bg-secondary p-3 rounded-xl cursor-pointer "
              >
                {/* Condition: If there is a file selected and imageChangeLoading is false */}
                {file ? (
                  // Display upload icon
                  <Check size={30} strokeWidth={1.25} />

                ) : (
                  <Upload size={30} strokeWidth={1.25} />
                  // Display check icon
                )}
              </Label>
              <Input
                id="picture"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* <Button
                className="ml-2 rounded-sm"
                variant="secondary"
                onClick={handleUpload}
              >
                {uploaded ? "Uploading..." : "Upload Image"}
              </Button> */}
              <Select name="style">
                <SelectTrigger className="w-[175px] rounded-xl ml-3 h-12">
                  <SelectValue
                    placeholder="Select Style"
                    className="text-sm opacity-50"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="artistic">🎨 Artistic</SelectItem>
                  <SelectItem value="professional">🧥 Professional</SelectItem>
                  <SelectItem value="random">🦾 Random </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <RadioGroup
            defaultValue={"square"}
            className="w-[50%] mt-3"
            onValueChange={(e) => console.log(e)}
            name="orientation"
          >
            <span className="text-sm opacity-50">Choose Orientation</span>
            <div className="flex ml-2">
              <div className="flex items-center border rounded-xl mr-2">
                <Label
                  htmlFor="option-two"
                  className="text-sm upload-image flex justify-center items-center  bg-secondary p-3 rounded-xl cursor-pointer hover:bg-secondary hover:opacity-90 "
                >
                  <RadioGroupItem
                    value="square"
                    id="option-two"
                    itemType="button"
                    className="mr-2"
                  />
                  <Square strokeWidth={1.25} size={30} />
                </Label>
              </div>
              <div className="flex items-center border rounded-xl mr-2">
                <Label
                  htmlFor="option-two"
                  className="text-sm upload-image flex justify-center items-center  bg-secondary p-3 rounded-xl cursor-pointer hover:bg-secondary hover:opacity-90 "
                >
                  <RadioGroupItem
                    value="rectangle-horizontal"
                    id="option-two"
                    className="mr-2"
                  />
                  <RectangleHorizontal strokeWidth={1.25} size={30} />
                </Label>
              </div>
              <div className="flex items-center border rounded-xl mr-2">
                <Label
                  htmlFor="option-two"
                  className="text-sm upload-image flex justify-center items-center bg-secondary p-3 rounded-xl cursor-pointer hover:bg-secondary hover:opacity-90 "
                >
                  <RadioGroupItem
                    value="rectangle-vertical"
                    id="option-two"
                    className="mr-2"
                  />
                  <RectangleVerticalIcon strokeWidth={1.25} size={30} />
                </Label>
              </div>
            </div>
          </RadioGroup>

          {/* <Separator className="mb-4 mt-4" />

        <div className="upscale h-10 w-full pointer-events-none opacity-10 mb-2 ">
          <Label htmlFor="default-range" className="text-sm">
           Upscale
          </Label>
          <p className="text-sm p-2 mb-4">
              Upscale is yet to be implemented.
          </p>
        </div> */}

          <div className="flex items-start space-x-2 flex-col mt-6 ">
            <Label htmlFor="branding" className="opacity-50 ">
              frog Branding
            </Label>
            <div className="flex items-center py-2 ">
              <Switch id="branding" className=" scale-75" name="branding" />
              <span className="text-xs ml-2 opacity-35">
                {" "}
                friedolin at the corner of your picture
              </span>{" "}
            </div>
          </div>

          <Separator className="mb-4 mt-16  bottom-20 w-full" />

          <Button
            className=" w-[90%] absolute bottom-5 rounded-[10px] text-[18px] h-fit p-3 font-bold text-white  transition-all duration-200 active:scale-[0.97] "
            type="submit"
          >
            Generate Portrait {<Sparkles className="ml-2" strokeWidth={1.5} />}
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default PortraitConfig;
