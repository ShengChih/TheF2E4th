import React from "react";
import MainPage from "@pages/MainPage";
import SparkleMouse from "@components/SparkleMouse";
import WandCursor from '@images/WandCursor.png'

function App() {
  return (
    <div
      style={{
        cursor: `url(${WandCursor}), auto`
      }}
    >
      <SparkleMouse />
      <MainPage />
    </div>
  );
}

export default App;
