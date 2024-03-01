import React, { useEffect, useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "./ui/switch";
import { supabase } from "@/lib/supabaseClient";
import { useImage } from "@/hooks/useImage";

const PortraitConfig = () => {
  const { setImageUrl, setLoadingState, loadingState } = useImage();

  const [controlNetSliderValue, setControlNetSliderValue] = useState(0.5);
  const [ipAdapterSliderValue, setIpAdapterSliderValue] = useState(0.45);
  const [image, setImage] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const [urlTotheColab, setUrlToTheColab] = useState<string | null>(null);

  const getImageURL = async (): Promise<void> => {
    if (file) {
      try {
        const { data } = await supabase.storage
          .from("portrait_bucket")
          .getPublicUrl(file.name);

        if (!file) {
          console.error("Error fetching image URL");
        } else {
          if (data) {
            setImage(data.publicUrl);
          } else {
            console.error("No data received while fetching image URL.");
          }
        }
      } catch (error: Error | unknown) {
        console.error("Error fetching image URL:", error);
      }
    } else {
      console.error("No file available to fetch image URL.");
    }
  };

  // generate random number 


  const handleUpload = async () => {
    if (file) {
      setIsUploading(true); // Set uploading state to true when starting upload
      try {
        const { data, error } = await supabase.storage
          .from("portrait_bucket")
          .upload(file.name, file);

        if (data) {
          await getImageURL();
        } else {
          console.error(error);
          console.error("Error uploading file");
        }
      } catch (error) {
        console.error(error);
        console.error("Error uploading file");
      } finally {
        setIsUploading(false); // Reset uploading state after upload is complete
      }
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingState("loading");

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // Call handleUpload and wait for it to complete
    // await handleUpload();

    const age = formData.get("age");
    const gender = formData.get("gender");
    const body = formData.get("body_type");
    const controlNet = formData.get("controlnet");
    const ip = formData.get("ipadapter");
    const style = formData.get("style");
    const orientation = formData.get("orientation");
    const branding = formData.get("branding");

    const encodedImgUrl = encodeURIComponent(image as string);
    console.log("-------" + encodedImgUrl);
    const url = `${urlTotheColab}/generate/?age=${age}&gender=${gender}&body=${body}&controlnet=${controlNet}&imgUrl=${encodedImgUrl}&ip=${ip}&style=${style}&orientation=${orientation}&branding=${branding}`;
    console.log(url);

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    };

    try {
      const response = await fetch(url, requestOptions); // Use the constructed URL
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Response:", data);
      setImageUrl(data.image);
      setLoadingState("loaded");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchLatestEntry = async () => {
    try {
      const { data, error } = await supabase
        .from("urls")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        throw error;
      }

      // 'data' will contain the latest entry
      // console.log(data[0].url);
      setUrlToTheColab(data[0].url);
    } catch (error) {
      console.error("Error fetching latest entry");
    }
  };

  useEffect(() => {
    fetchLatestEntry();
  }, []);

  return (
    <React.Fragment>
      <div className="left-two w-full flex items-start flex-col overflow-hidden relative rounded-[20px] border-2 p-5 h-[100%]  ">
        <span className=" text-base mb-2">Prompting Controls</span>
        <p className="text-sm opacity-45 ">
          AI's gonna need help in setting some qualities that could make you
          stand out.
        </p>
        <Separator className="mb-4 mt-2" />
        <form onSubmit={submitHandler} className="w-full ">
          <Label className="text-sm opacity-50">General Info</Label>
          <div className="flex ml-2 justify-start items-start mt-2">
            <div className="age w-[20%] mr-3">
              <Input
                name="age"
                type="number"
                className="  h-12 rounded-xl placeholder:opacity-100  "
                placeholder="Age "
                max={70}
                min={19}
                required
                // onChange={handleageChange}
              />
            </div>

            <Select name="gender" required>
              <SelectTrigger className="w-fit rounded-xl h-12">
                <SelectValue
                  placeholder="Gender"
                  className="text-sm opacity-50"
                  defaultValue={"Male"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female"> Female</SelectItem>
              </SelectContent>
            </Select>
            <Select name="body_type" required>
              <SelectTrigger className="w-[120px]  ml-2 rounded-xl  h-12">
                <SelectValue
                  placeholder="Body type"
                  className="text-sm opacity-50"
                  defaultValue={"xl"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="m">m</SelectItem>
                <SelectItem value="l">l</SelectItem>
                <SelectItem value="xl"> xl</SelectItem>
                <SelectItem value="xxl"> xxl</SelectItem>
                <SelectItem value="xxxl"> xxxl</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sliders-container w-full mt-6 ">
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
            <div className="  rounded-xl  justify-center items-center ">
              <div className="flex w-full justify-center items-center">
                <Label
                  htmlFor="picture"
                  className="text-sm upload-image flex justify-center items-center opacity-50  bg-secondary p-3 rounded-xl cursor-pointer "
                >
                 {
                  file ? 
                  file.name :
                  "Upload Image"
                 }
                </Label>
                <Input
                  id="picture"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <Button
                  className="ml-2 rounded-sm h-12"
                  variant="secondary"
                  onClick={handleUpload}
                  type="button"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2
                      className="animate-spin"
                      size={30}
                      strokeWidth={1.25}
                    />
                  ) : image ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Upload className="w-6 h-6" />
                  )}
                </Button>
              </div>

              <br />
              <Select name="style" required>
                <SelectTrigger className="w-[175px] rounded-xl  h-12">
                  <SelectValue
                    placeholder="Select Style"
                    className="text-sm opacity-50"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">🎨 casual </SelectItem>
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
                    value="1"
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
                  <RadioGroupItem value="2" id="option-two" className="mr-2" />
                  <RectangleHorizontal strokeWidth={1.25} size={30} />
                </Label>
              </div>
              <div className="flex items-center border rounded-xl mr-2">
                <Label
                  htmlFor="option-two"
                  className="text-sm upload-image flex justify-center items-center bg-secondary p-3 rounded-xl cursor-pointer hover:bg-secondary hover:opacity-90 "
                >
                  <RadioGroupItem value="3" id="option-two" className="mr-2" />
                  <RectangleVerticalIcon strokeWidth={1.25} size={30} />
                </Label>
              </div>
            </div>
          </RadioGroup>

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

          {loadingState === "idle" && (
            <>
              <Button
                className=" w-[90%] absolute bottom-5 rounded-[10px] text-[18px] h-fit p-3 font-bold text-white  transition-all duration-200 active:scale-[0.97] "
                type="submit"
                disabled={false}
              >
                Generate Portrait{" "}
                {<Sparkles className="ml-2" strokeWidth={1.5} />}
              </Button>
            </>
          )}

          {loadingState === "loading" && (
            <>
              <Button
                className=" w-[90%] absolute bottom-5 rounded-[10px] text-[18px] h-fit p-3 font-bold text-white  transition-all duration-200 active:scale-[0.97] "
                type="submit"
                disabled={true}
              >
                Generating...{" "}
                {<Loader2 className="ml-2 animate-spin" strokeWidth={1.5} />}
              </Button>
            </>
          )}

          {loadingState === "loaded" && (
            <>
              <Button
                className=" w-[90%] absolute bottom-5 rounded-[10px] text-[18px] h-fit p-3 font-bold text-white  transition-all duration-200 active:scale-[0.97] "
                type="submit"
                disabled={true}
              >
                Generated! {<Check className="ml-2" strokeWidth={1.5} />}
              </Button>
            </>
          )}
        </form>
      </div>
    </React.Fragment>
  );
};

export default PortraitConfig;
