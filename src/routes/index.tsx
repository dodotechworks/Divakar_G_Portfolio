import { createFileRoute } from "@tanstack/react-router";
import Home from "@/pages/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Divakar G — AI Engineer Portfolio" },
      { name: "description", content: "AI Engineer building intelligent applications with Generative AI, ML, RAG systems, and Full Stack Development." },
      { property: "og:title", content: "Divakar G — AI Engineer Portfolio" },
      { property: "og:description", content: "AI Engineer building intelligent applications with Generative AI, ML, RAG systems, and Full Stack Development." },
    ],
  }),
  component: Index,
});

function Index() {
  return <Home />;
}
