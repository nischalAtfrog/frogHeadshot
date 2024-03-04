
import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  return (
    <div className=" header flex items-center justify-between relative border-2 rounded-[20px] w-[78%] p-5 top-2 col-span-3 ">
    
      <span className="text-2xl font-extrabold">frog</span>

      <h1 className="text-3xl relative text-primary ">
        Portraits. <span className="text-sm text-foreground"> ( Beta ) </span>{" "}
      </h1>
      <ModeToggle />
    </div>
  );
};

export default Header;
