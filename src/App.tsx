import MainPage from "@pages/MainPage"
import SparkleMouse from "@components/SparkleMouse"
import WandCursor from '@images/WandCursor.png'

function App() {
  return (
    <>
      <div
        style={{
          cursor: `url(${WandCursor}), auto`
        }}
        className={`relative`}
      >
        <MainPage />
      </div>
      <SparkleMouse />
    </>
  );
}

export default App;
