import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpError } from '../enums/http-error.enums';
import { ToastService } from '../../components/toast/shared/toast.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private readonly toastService: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        return this.handleError(request, err);
      }),
    );
  }

  handleError(req: HttpRequest<any>, err: any) {
    const defaultErrorMessage = 'Une erreur est survenue. Réessayez plus tard.';

    const isServerError =
      err.status === HttpError['500InternalServerError'] || err.status === HttpError['501NotImplemented'];
    if (isServerError) {
      this.toastService.showDanger(defaultErrorMessage);
      return throwError(() => err);
    }

    if (err.status === HttpError['400BadRequest']) {
      this.toastService.showDanger(defaultErrorMessage);
      return throwError(() => err);
    }

    const isRightsError = err.status === HttpError['401Unauthorized'] || err.status === HttpError['403Forbidden'];
    if (isRightsError) {
      this.toastService.showDanger("Vous n'avez pas les droits suffisants.");
      return throwError(() => err);
    }

    if (err.status === HttpError['404NotFound']) {
      this.toastService.showDanger("La ressource demandée n'existe pas.");
      return throwError(() => err);
    }

    if (err.status === HttpError['415UnsupportedMediaType']) {
      this.toastService.showDanger("Le format de fichier n'est pas supporté.");
      return throwError(() => err);
    }

    this.toastService.showDanger(defaultErrorMessage);
    return throwError(() => err);
  }
}
