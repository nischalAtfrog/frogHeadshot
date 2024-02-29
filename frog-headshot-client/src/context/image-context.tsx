import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ImageProviderProps {
  children: ReactNode;
}

interface ImageContextProps {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
  loadingState: "idle" | "loading" | "loaded";
  setLoadingState: Dispatch<SetStateAction<"idle" | "loading" | "loaded">>;
}

export const ImageContext = createContext<ImageContextProps>({
  imageUrl: "",
  setImageUrl: () => {},
  loadingState: "idle",
  setLoadingState: () => {},
});
export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loadingState, setLoadingState] = useState<
    "idle" | "loading" | "loaded"
  >("idle");

  return (
    <ImageContext.Provider
      value={{
        imageUrl,
        setImageUrl,
        loadingState,
        setLoadingState,
       
      }}
    >
      {children} {/* Pass children */}
    </ImageContext.Provider>
  );
};
