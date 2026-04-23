import pino from "pino";

let logger: any;

if (process.env.NODE_ENV === "development") {
  logger = pino({
    transport: {
      target: "pino-pretty",
    },
  });
} else {
  logger = pino();
}

export default logger;
