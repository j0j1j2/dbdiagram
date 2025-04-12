import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import DbmlEditor from "./dbml-editor";

export default function Home() {
  return (
    <div>
      <header>
        <div className="p-4 bg-neutral-800 text-white font-bold">
          DbDiagram
        </div>
      </header>
      <main className="h-screen flex flex-col">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} >
            <DbmlEditor/>
          </ResizablePanel>
          <ResizableHandle/>
          <ResizablePanel>Right</ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
