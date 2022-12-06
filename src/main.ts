import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFac1lJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0djWn9XcXJXRWVcUkU=');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
