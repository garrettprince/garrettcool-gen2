import DynamicCommand from "../components/DynamicCommand";

export default function Home() {
  return (
    <main>
      <div>nav</div>
      <div className="absolute bottom-0 w-full">
        <DynamicCommand />
      </div>
    </main>
  );
}
