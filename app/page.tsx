import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import DbmlEditor from "./DbmlEditor";
import DbmlGraph from "./DbmlGraph";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="">
        <div className="p-3 bg-neutral-800 text-white font-bold">
          DbDiagram
        </div>
      </header>
      <main className="flex-grow">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} >
            <DbmlEditor/>
          </ResizablePanel>
          <ResizableHandle/>
          <ResizablePanel defaultSize={50}>
            <DbmlGraph/>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
