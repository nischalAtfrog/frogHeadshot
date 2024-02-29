import { useContext } from "react";
import { ImageContext } from "@/context/image-context";

export const useImage = () => useContext(ImageContext);
