import { NextRequest } from "next/server";

import { sseStream } from "@/shared/lib/sse/server";

export const getGameStream = (req: NextRequest) => {
  const { addCloseListener, response, write } = sseStream(req);

  let counter = 1;

  const interval = setInterval(() => {
    write(counter++);
  }, 1000);

  addCloseListener(() => {
    clearInterval(interval);
  });

  return response;
};
