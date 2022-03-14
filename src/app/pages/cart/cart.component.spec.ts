import { CartComponent } from "src/app/pages/cart/cart.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";

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
]

describe('Cart component', () => {
    let component: CartComponent;
    // para extraer servicio se define fixture
    let fixture: ComponentFixture<CartComponent>;
    let service: BookService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                // Módulos necesarios
                HttpClientTestingModule
            ],
            declarations: [
                // Componentes necesarios
                CartComponent
            ],
            providers: [
                // Servicios necesarios
                BookService
                // No son necesarios estos servicios, porque realizan peticiones reales.
                // En su lugar se importa HttpClientTestingModule
                // HttpClient,
                // HttpHandler
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        // Instanciar componente
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;

        // Componente entrará al método onInit
        fixture.detectChanges();

        // Instanciar servicio
        service = fixture.debugElement.injector.get(BookService);

        // No se llama al servicio
        spyOn(service, 'getBooksFromCart').and.callFake(() => listBook);
    });

    // Test: componente se haya creado correctamente
    it('Should create', () => {
        expect(component).toBeTruthy();

        // Test fail
        // expect(component).toBeFalse();
    });

    fit('getTotalPrice returns an amount', () => {
        const totalPrice = component.getTotalPrice(listBook);
        expect(totalPrice).toBeGreaterThan(0);
        expect(totalPrice).not.toBe(0);
        expect(totalPrice).not.toBeNull();
    });

    it('onInputNumberChange increments correctly', () => {
        const action = 'plus';
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 2
        };

        // Versiones no recomendadas
        // const service = (component as any)._bookService;
        // const service2 = component['_bookService'];

        // const service = fixture.debugElement.injector.get(BookService);
        
        // Espías
        // UT no debería llamar a un servicio, con callFake no se estará llamando al servicio
        
        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

        expect(book.amount).toBe(2);

        component.onInputNumberChange(action, book);

        // expect(book.amount).toBe(3);
        expect(book.amount === 3).toBeTrue();

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    it('onInputNumberChange decrements correctly', () => {
        const action = 'minus';
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 15,
            amount: 3
        };

        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

        expect(book.amount).toBe(3);

        component.onInputNumberChange(action, book);

        expect(book.amount).toBe(2);

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    // Prueba recomendada para métodos privados
    it('onClearBooks works correctly', () => {
        // Método se va a llamar y además espiar
        const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();
        
        // Espiar y anular lo que haga el servicio
        const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);

        component.listCartBook = listBook;
        component.onClearBooks();
        expect(component.listCartBook.length).toBe(0);
        // expect(component.listCartBook.length === 0).toBeTrue();
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    // Prueba no recomendada para métodos privados
    it('_clearListCartBook works correctly', () => {
        const spy1 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);

        // No recomendado
        component.listCartBook = listBook;
        component['_clearListCartBook']();

        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
    });
});
