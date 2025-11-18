import { serve } from "bun";
import index from "./index.html";
import { authorized } from "./server/auth";
import translate from "./server/translate";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/translate/:from/:to": {
      async POST(req) {
        if (!(await authorized(req))) return Response.error();

        return Response.json({
          text: await translate(
            req.params.from,
            req.params.to,
            await req.text(),
          ),
        });
      },
    },

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
