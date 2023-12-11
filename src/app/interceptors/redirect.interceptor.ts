import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RedirectInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Burada isteğin URL'sini loglayarak kontrol edebilirsiniz


    return next.handle(req).pipe(
      tap((event) => {
        // Response'u kontrol etmeden önce response'un bir HttpResponse olduğundan emin olun
        if (event instanceof HttpResponse && req.url === 'http://localhost:5001/api/Payment/retrievePaymentResult') {
          const response = event.body; // Dönen cevap
          // Burada response'un yapısını kontrol edin ve hangi değerleri beklediğinizi kontrol edin
          if (response && response.checkoutForm && response.checkoutForm.Status === 'success') {
            this.router.navigate(['/payment/success']); // Başarılı durumda yönlendirme
          }
        }
      })
    );
  }
}
