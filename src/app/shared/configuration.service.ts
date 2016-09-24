import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {
  baseServicesUrl = 'http://localhost:3000/poc/';

  constructor() { }

}
