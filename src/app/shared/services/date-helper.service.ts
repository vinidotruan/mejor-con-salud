import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateHelperService {
  constructor() {}

  public castDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };
}
