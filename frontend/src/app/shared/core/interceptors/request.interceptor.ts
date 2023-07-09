import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpError } from '../enums/http-error.enums';
import { ToastService } from '../../components/toast/shared/toast.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private readonly jwtHelper: JwtHelperService, private readonly toastService: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        authorization: `Bearer ${this.jwtHelper.tokenGetter()}`,
      },
    });

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

    if (err.status === HttpError['413RequestEntityTooLarge']) {
      return this.handleSpecificHttpError(err, err.error?.message || 'Le contenu est trop grand.');
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
