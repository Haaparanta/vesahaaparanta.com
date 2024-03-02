import { EvervaultCard } from "@/components/ui/evervault-card";


export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div style={{ width: '75vw', height: '75vh' }} className="flex items-center justify-center">
        <EvervaultCard text="Everybody wants to be hacker" className="custom-class w-full h-full" />
      </div>
    </main>
  );
}

