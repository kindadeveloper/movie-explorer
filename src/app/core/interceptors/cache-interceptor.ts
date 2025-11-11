import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const responseCache = new Map<string, HttpEvent<unknown>>();

export const cacheInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (req.method !== 'GET') {
    return next(req);
  }

  if (!environment.optimized) {
    const noCacheReq = req.clone({
      setParams: { t: Date.now().toString() } // Bypass cache by adding a timestamp
    });

    return next(noCacheReq);
  }

  const cached = responseCache.get(req.urlWithParams);
  if (cached) {
    return of(cached);
  }

  return next(req).pipe(
    tap(event => {
      responseCache.set(req.urlWithParams, event);
    })
  );
};