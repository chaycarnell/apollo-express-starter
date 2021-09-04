import { createLogger, format, transports } from 'winston';

// Handle formatting splat data of log
const formatSplat = (splat: any) =>
  splat.length === 1 ? JSON.stringify(splat[0]) : JSON.stringify(splat);

// Format log output
const customFormat = format.printf(
  ({ timestamp, level, message, ...meta }: any) => {
    const splat = meta[Symbol.for('splat')];
    return `[${level} ${timestamp}] ${message} ${
      (splat && `${formatSplat(splat)}`) || ''
    }`;
  },
);

// Initialise instance of winston logger
const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(format.timestamp(), customFormat),
});

export default logger;
