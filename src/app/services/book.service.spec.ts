import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';

const listBook: Array<Book> = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7
    }
];

describe('BookService', () => {
    let service: BookService;
    // Para hacer peticiones mock, no reales
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                BookService
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        });
        //.compileComponent no es necesario, porque es un servicio
    });

    beforeEach(() => {
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // Que no haya peticiones pendientes entre cada test
        httpMock.verify();
    });

    it('Should create', () => {
        expect(service).toBeTruthy();
    });

    it('getBook returns a list of books and does a get method', () => {
        // suscribirse al metodo del servicio
        service.getBooks().subscribe((resp: Array<Book>) => {
            expect(resp).toEqual(listBook);
        });

        // Peticion a URL debería ser un GET
        const req = httpMock.expectOne(environment.API_REST_URL + '/book');
        expect(req.request.method).toBe('GET');

        // Simular que la petición se ha hecho y retorne listBook
        // se ejecutará el subscribe de la línea 69
        req.flush(listBook);
    });
});
