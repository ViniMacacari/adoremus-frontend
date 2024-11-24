import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError, firstValueFrom } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  private url = 'https://api.adoremus.com.br'
  // private url = 'http://localhost:2024'

  constructor(private http: HttpClient) { }

  async get(complemento: string, responseType?: 'blob', options?: any): Promise<any> {
    const headers = this.createHeaders()
    const config: any = { headers, withCredentials: false }

    if (responseType === 'blob') {
      config.responseType = 'blob'
    }

    if (options) {
      Object.assign(config, options)
    }

    return firstValueFrom(
      this.http.get(`${this.url}${complemento}`, config).pipe(
        catchError(this.handleError)
      )
    )
  }

  async post(complemento: string, body: any): Promise<any> {
    const headers = this.createHeaders()
    return firstValueFrom(
      this.http.post(`${this.url}${complemento}`, body, { headers, withCredentials: true }).pipe(
        catchError(this.handleError)
      )
    )
  }

  async put(complemento: string, body: any): Promise<any> {
    const headers = this.createHeaders()
    return firstValueFrom(
      this.http.put(`${this.url}${complemento}`, body, { headers, withCredentials: true }).pipe(
        catchError(this.handleError)
      )
    )
  }

  async delete(complemento: string): Promise<any> {
    const headers = this.createHeaders()
    return firstValueFrom(
      this.http.delete(`${this.url}${complemento}`, { headers, withCredentials: true }).pipe(
        catchError(this.handleError)
      )
    )
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${localStorage.getItem('token')}`,
      'grupos': `${localStorage.getItem('grupos')}`,
      'user': `${localStorage.getItem('user')}`
    })
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.error}`
    } else {
      errorMessage = `${error.error.error}`
    }
    return throwError(errorMessage)
  }
}