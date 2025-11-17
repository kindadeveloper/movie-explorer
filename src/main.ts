import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.optimized) {
  const preload = document.createElement('link');
  preload.rel = 'preload';
  preload.as = 'style';
  preload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  document.head.appendChild(preload);

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = preload.href;
  stylesheet.media = 'print';
  stylesheet.onload = () => stylesheet.media = 'all';
  document.head.appendChild(stylesheet);

  const connect1 = document.createElement('link');
  connect1.rel = 'preconnect';
  connect1.href = 'https://fonts.googleapis.com';
  document.head.appendChild(connect1);

  const connect2 = document.createElement('link');
  connect2.rel = 'preconnect';
  connect2.href = 'https://fonts.gstatic.com';
  connect2.crossOrigin = '';
  document.head.appendChild(connect2);
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));