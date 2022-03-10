import { CartComponent } from "src/app/pages/cart/cart.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";


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
});
