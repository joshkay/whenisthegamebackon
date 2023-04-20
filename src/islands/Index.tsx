import App from "../App";
import { nhlLogoUrl } from "../api/nhl.api";
import Teams from "@components/Teams";

const Index = () => {
  return (
    <App>
      <header className="absolute top-0 left-0 w-14 h-14">
        <img src={nhlLogoUrl} alt="NHL logo" className="m-2 animate-spin" />
      </header>
      <main className="h-full w-full flex overflow-y-auto">
        <div className="flex flex-col m-auto p-2 gap-y-2 py-2">
          <Teams />
        </div>
      </main>
    </App>
  );
};

export default Index;
