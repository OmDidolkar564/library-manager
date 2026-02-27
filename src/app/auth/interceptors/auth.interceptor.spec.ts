import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authInterceptor).toBeTruthy();
  });

  it('should add authorization header with token to protected endpoints', () => {
    localStorage.setItem('token', 'test-token-123');

    httpClient.get('/api/issues/my').subscribe();

    const req = httpMock.expectOne('/api/issues/my');
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token-123');

    req.flush({});
    localStorage.removeItem('token');
  });

  it('should not add token to public endpoints (login)', () => {
    localStorage.setItem('token', 'test-token-123');

    httpClient.post('/api/auth/login', { username: 'test', password: 'test' }).subscribe();

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.headers.has('Authorization')).toBeFalsy();

    req.flush({});
    localStorage.removeItem('token');
  });

  it('should not add token to public endpoints (register)', () => {
    localStorage.setItem('token', 'test-token-123');

    httpClient.post('/api/auth/register', { username: 'test' }).subscribe();

    const req = httpMock.expectOne('/api/auth/register');
    expect(req.request.headers.has('Authorization')).toBeFalsy();

    req.flush({});
    localStorage.removeItem('token');
  });

  it('should not add header if no token in localStorage', () => {
    localStorage.removeItem('token');

    httpClient.get('/api/issues/my').subscribe();

    const req = httpMock.expectOne('/api/issues/my');
    expect(req.request.headers.has('Authorization')).toBeFalsy();

    req.flush({});
  });

  it('should add token to book creation endpoint', () => {
    localStorage.setItem('token', 'test-token-456');

    httpClient.post('/api/books/create', { title: 'Test Book' }).subscribe();

    const req = httpMock.expectOne('/api/books/create');
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token-456');

    req.flush({});
    localStorage.removeItem('token');
  });

  it('should not add token to GET /api/books endpoint', () => {
    localStorage.setItem('token', 'test-token-789');

    httpClient.get('/api/books').subscribe();

    const req = httpMock.expectOne('/api/books');
    expect(req.request.headers.has('Authorization')).toBeFalsy();

    req.flush([]);
    localStorage.removeItem('token');
  });

  it('should handle multiple requests correctly', () => {
    localStorage.setItem('token', 'test-token-xyz');

    httpClient.get('/api/books').subscribe();
    httpClient.get('/api/issues/my').subscribe();

    const publicReq = httpMock.expectOne('/api/books');
    expect(publicReq.request.headers.has('Authorization')).toBeFalsy();
    publicReq.flush([]);

    const protectedReq = httpMock.expectOne('/api/issues/my');
    expect(protectedReq.request.headers.has('Authorization')).toBeTruthy();
    expect(protectedReq.request.headers.get('Authorization')).toBe('Bearer test-token-xyz');
    protectedReq.flush({});

    localStorage.removeItem('token');
  });
});