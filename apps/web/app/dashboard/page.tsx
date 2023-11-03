import { PlusIcon } from "@radix-ui/react-icons";

function Dashboard() {
  return (
    <main className="mt-10">
      <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-24">
        Room Card 1
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            className="inline-flex h-[75px] w-[75px] items-center justify-center rounded-2xl text-cyan-500 ring-2 ring-teal-500 transition hover:ring-offset-2 hover:ring-offset-cyan-500"
            type="button"
          >
            <PlusIcon height={75} width={75} />
          </button>
          <h1 className="text-sm text-gray-400 opacity-70">
            Create a new room
          </h1>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
