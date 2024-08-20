import Randomizer from "./Randomizer/Randomizer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between items-center py-24 px-12 md:px-24">
      <Randomizer />
    </main>
  );
}
