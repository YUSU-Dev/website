//@ts-check
import { watch } from "rollup";
import createServer from "connect";
import serveStatic from "serve-static";
import config from "./rollup.config.mjs";
import cors from "cors";
import fs from "node:fs";

const watcher = watch({
    ...config,
    watch: {
        skipWrite: true, // we write it out ourselves below
    }
});

let didStartServer = false;
function startServer() {
    if (didStartServer) {
        return;
    }

    const app = createServer();

    app.use("/components", cors({
        origin: ["https://yusu.org", "https://yu-development.sums.su"],
    }));
    app.use("/components", serveStatic(".dev"));

    app.use((req, res) => {
        if (req.originalUrl === "/") {
            const page = fs.readFileSync("./dev-banner.html", { encoding: "utf-8" });
            res.writeHead(200, {
                "Content-Length": Buffer.byteLength(page),
                "Content-Type": "text/html",
            }).end(page);
            return;
        }
        res.writeHead(404).end("not found");
    });

    app.listen(3000, "0.0.0.0", () => {
        console.log("Ready on http://localhost:3000");
    });

    didStartServer = true;
}

/** @type {any} */
let buildStart = null;
watcher.on("event", async event => {
    switch (event.code) {
        case "START":
            buildStart = process.hrtime();
            break;
        case "BUNDLE_END":
            if (buildStart) {
                const took = process.hrtime(buildStart);
                console.log(`Built in ${took[0] * 1000 + took[1] / 1000000}ms`)
            }
            await event.result.write({
                dir: ".dev"
            });
            console
            startServer();
            break;
        case "ERROR":
            console.error("⚠️ BUILD ERROR 💣");
            console.error(event.error);
    }
    if ("result" in event && event.result) {
        await event.result.close();
    }
});
