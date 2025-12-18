// src/infrastructure/logger/winston-logger.service.ts
import { Injectable, LoggerService, Scope } from "@nestjs/common";
import * as winston from "winston";
import "winston-daily-rotate-file";
import { ILogger } from "../../application/ports/logger.port";

@Injectable({ scope: Scope.TRANSIENT }) // New instance per injection
export class WinstonLoggerService implements ILogger, LoggerService {
  private readonly logger: winston.Logger;
  private context?: string;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || "info",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }), // In case of error, include stack trace
        winston.format.json(), // Structured JSON format
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
          level: process.env.LOG_LEVEL || "debug",
        }),
        new winston.transports.DailyRotateFile({
          filename: "application-%DATE%.log",
          dirname: "logs", // Log files directory
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m", // Max 20MB per file
          maxFiles: "14d", // Keep logs for 14 days
          level: process.env.LOG_LEVEL || "info",
        }),
      ],
      exceptionHandlers: [
        // Unhandled exceptions logging
        new winston.transports.DailyRotateFile({
          filename: "exceptions-%DATE%.log",
          dirname: "logs",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
        }),
      ],
      rejectionHandlers: [
        // Unhandled Promise rejections logging
        new winston.transports.DailyRotateFile({
          filename: "rejections-%DATE%.log",
          dirname: "logs",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
        }),
      ],
    });
  }

  // A NestJS LoggerService interface implementation
  setContext(context: string) {
    this.context = context;
  }

  log(message: string, context?: string, ...args: any[]) {
    this.info(message, context, ...args);
  }

  // Az ILogger interface implementation
  debug(message: string, context?: string, ...args: any[]): void {
    this.logger.debug(message, { context: context || this.context, ...args });
  }

  info(message: string, context?: string, ...args: any[]): void {
    this.logger.info(message, { context: context || this.context, ...args });
  }

  warn(message: string, context?: string, ...args: any[]): void {
    this.logger.warn(message, { context: context || this.context, ...args });
  }

  error(
    message: string,
    trace?: string,
    context?: string,
    ...args: any[]
  ): void {
    // The winston error method can take a meta object,
    // so we include the stack trace in the metadata.
    this.logger.error(message, {
      context: context || this.context,
      trace,
      ...args,
    });
  }

  verbose(message: string, context?: string, ...args: any[]): void {
    this.logger.verbose(message, { context: context || this.context, ...args });
  }
}
