import App from "../App";
import { nhlLogoUrl } from "../api/nhl.api";
import Teams from "@components/Teams";

const Index = () => {
  return (
    <App>
      <main className=" h-full w-full flex flex-col overflow-y-auto overflow-x-hidden">
        <header className="flex items-baseline overflow-x-auto p-2">
          <Teams />
        </header>
        <section className="flex flex-1 justify-center items-center overflow-y-auto">
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center">
            Who do you fancy?
          </h1>
          <div className="absolute bottom-0 left-0 w-20 h-20">
            <img src={nhlLogoUrl} alt="NHL logo" className="m-4 animate-spin" />
          </div>
        </section>
      </main>
    </App>
  );
};

export default Index;
