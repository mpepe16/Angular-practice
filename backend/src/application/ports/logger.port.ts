export interface ILogger {
  debug(message: string, context?: string, ...args: any[]): void;
  info(message: string, context?: string, ...args: any[]): void;
  warn(message: string, context?: string, ...args: any[]): void;
  error(
    message: string,
    trace?: string,
    context?: string,
    ...args: any[]
  ): void;
  verbose(message: string, context?: string, ...args: any[]): void;
}

export const I_LOGGER = Symbol("ILogger");
