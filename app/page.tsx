"use client";
import DraggableResizableGrid from "@/components/grid/draggable-resizeable-grid";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Text from "@/components/ui/text";
import { CheckCheckIcon, Icon, PiIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <DraggableResizableGrid
        storageKey="my-grid-layout"
        initialLayout={[
          { i: "a", x: 0, y: 0, w: 2, h: 2 },
          { i: "b", x: 2, y: 0, w: 2, h: 2 },
          { i: "c", x: 4, y: 0, w: 2, h: 2 },
        ]}
        renderItem={(id) => (
          <div className="p-4">
            <Text as="h3" size="lg">
              {id}
            </Text>
          </div>
        )}
      />
    </>
  );
}
