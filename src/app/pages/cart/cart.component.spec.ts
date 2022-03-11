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
    });

    // Test: componente se haya creado correctamente
    it('Should create', () => {
        expect(component).toBeTruthy();

        // Test fail
        // expect(component).toBeFalse();
    });

    it('getTotalPrice returns an amount', () => {
        const totalPrice = component.getTotalPrice(listBook);
        expect(totalPrice).toBeGreaterThan(0);
        expect(totalPrice).not.toBe(0);
        expect(totalPrice).not.toBeNull();
    });
});
