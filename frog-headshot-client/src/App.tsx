import Home from "@/pages/Home";
import React from "react";

function App() {
  console.log(
    "%c frog",
    "font-weight: bold; font-family: Serif; font-size: 50px;color: white;",
  );
  console.log("Description:", "Make your Mark");
  console.log("Message:", "Hello Hacker, head to this link to know more");

  return (
    <React.Fragment>
      <Home />
    </React.Fragment>
  );
}

export default App;
