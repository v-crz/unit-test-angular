import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';
import { of } from 'rxjs';

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

const bookServiceMock = {
    getBooks: () => of(listBook)
};

describe('Home component', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            declarations: [
                HomeComponent
            ],
            providers: [
                // BookService
                {
                    // Cuando el componente necesite el servicio BookService
                    // realmente utilizará el valor de useValue
                    provide: BookService,
                    useValue: bookServiceMock
                }
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA, 
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    });

    // Instancia del componente
    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    // Se ejecuta al inicio de todo
    beforeAll(() => {

    });

    // Se ejecuta después de cada test
    afterEach(() => {

    });

    // Se ejecuta despues de finalizar todos los test
    afterAll(() => {

    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    // public getBooks(): void {
    //     this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
    //       this.listBook = resp;
    //     });
    //   }

    it('getBooks get books from the susbcription', () => {
        // Traer el servicio
        const bookService = fixture.debugElement.injector.get(BookService);

        // const listBook: Array<Book> = [];
        
        // Retorna un observable. Uso de of
        // const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listBook));

        component.getBooks();

        // expect(spy1).toHaveBeenCalled();
        expect(component.listBook.length).toBe(3);
    });
});