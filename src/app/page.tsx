"use client";

import { LogoutButton } from "./logout";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * Render the protected Home view that displays fetched workflows and provides controls to queue AI and workflow jobs.
 *
 * Renders the stringified result of the `getWorkflows` query, buttons to trigger the `testAi` and `createWorkflow` mutations (with disabled states while pending), and a logout button.
 *
 * @returns The component's JSX element containing workflow data, action buttons, and the logout control.
 */
export default function Home() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("AI job queued.");
      },
      onError: () => {
        toast.error("Somthing RRRRR");
      },
    })
  );

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued.");
      },
    })
  );

  // const geminiTest = async () => {
  //   try {
  //     const res = await fetch("/api/gemini", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         prompt: "Write a story about a magic backpack.",
  //       }),
  //     });
  //     const json = await res.json();
  //     console.log("Gemini API result:", json);
  //     if (!res.ok) {
  //       toast.error(`Gemini error ${res.status}`);
  //     } else {
  //       toast.success("Gemini request succeeded");
  //     }
  //     return json;
  //   } catch (err) {
  //     console.error("Gemini request failed:", err);
  //     toast.error("Gemini request failed");
  //   }
  // };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      protected server component
      <div>{JSON.stringify(data)}</div>
      {/* <Button onClick={() => geminiTest()}>gemini test</Button> */}
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        test ai
      </Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        create workflow
      </Button>
      <LogoutButton />
    </div>
  );
}
