import { Injectable } from '@angular/core';
import DOMPurify from 'dompurify';

@Injectable({
  providedIn: 'root'
})
export class XssSanitizerService {

  /**
   * Sanitize value to prevent xss
   *
   * @param value Value to sanitize
   * @returns value sanitized as string
   */
  sanitize(value: string): string{
    return DOMPurify.sanitize(value);
  }

  /**
   * Sanitize a group of array's properties
   *
   * @param data Array to sanitize
   * @returns array sanitized
   */
  sanitizeArray(data: any): any {
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = this.sanitize(data[key]);
      return acc;
    }, {} as Record<string, string>);
  }
}
