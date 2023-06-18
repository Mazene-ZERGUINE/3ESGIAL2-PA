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
      return this.handleSpecificHttpError(err, err.error?.message || defaultErrorMessage);
    }

    if (err.status === HttpError['400BadRequest']) {
      return this.handleSpecificHttpError(err, err.error?.message || defaultErrorMessage);
    }

    if (err.status === HttpError['401Unauthorized']) {
      return this.handleSpecificHttpError(err, err.error?.message || 'Vos identifiants sont incorrects.');
    }

    if (err.status === HttpError['403Forbidden']) {
      return this.handleSpecificHttpError(err, err.error?.message || "Vous n'avez pas les droits.");
    }

    if (err.status === HttpError['404NotFound']) {
      return this.handleSpecificHttpError(err, err.error?.message || "La ressource demandée n'existe pas.");
    }

    if (err.status === HttpError['409Conflict']) {
      return this.handleSpecificHttpError(err, err.error?.message || 'La ressource existe déjà.');
    }

    if (err.status === HttpError['415UnsupportedMediaType']) {
      return this.handleSpecificHttpError(err, err.error?.message || "Le format de fichier n'est pas supporté.");
    }

    return this.handleSpecificHttpError(err, err.error?.message || defaultErrorMessage);
  }

  private handleSpecificHttpError(err: any, message: string) {
    this.toastService.showDanger(err.error?.message || message);
    return throwError(() => err);
  }
}
