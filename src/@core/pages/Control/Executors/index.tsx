import dynamic from "next/dynamic";

export const ExecutorsAsync = dynamic(() =>
  import("./ui").then((mod) => mod.Executors)
);
