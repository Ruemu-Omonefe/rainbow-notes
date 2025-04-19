// types/turnjs.d.ts
import 'jquery';

declare global {
  interface JQuery {
    turn(options?: any): JQuery;
    turn(method: string, ...args: any[]): JQuery;
  }

  interface Window {
    turnjs?: {
      (element: HTMLElement | JQuery, options?: any): void;
    };
  }
}