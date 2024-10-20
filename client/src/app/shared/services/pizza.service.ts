import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pizza } from '../../pizza/pizza-interface';
import { Observable } from 'rxjs';

/**
 * Signals is the "new" way of doing things
 * https://www.mongodb.com/resources/languages/mean-stack-tutorial?utm_campaign=devrel&utm_source=youtube&utm_medium=organic_social&utm_content=GcYxQ0A7tVM&utm_term=jesse.hall
 */

/**
 * @Injectable defines where this service will be used
 */
@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private url = 'http://localhost:5200';
  pizzas$ = signal<Pizza[]>([]);
  pizza$ = signal<Pizza>({} as Pizza);
  
  constructor(private httpClient: HttpClient) { }

  private refreshPizzas() {
    this.httpClient.get<Pizza[]>(`${this.url}/pizzas`)
      .subscribe(pizzas => {
        this.pizzas$.set(pizzas);
      });
  }

  getPizzas() {
    this.refreshPizzas();
    return this.pizzas$();
  }

  getPizza(id: string) {
    this.httpClient.get<Pizza>(`${this.url}/pizzas/${id}`).subscribe(pizza => {
      this.pizza$.set(pizza);
      return this.pizza$();
    });
  }

  createPizza(pizza: Pizza) {
    return this.httpClient.post(`${this.url}/pizzas`, pizza, { responseType: 'text' });
  }

  updatePizza(id: string, pizza: Pizza) {
    return this.httpClient.put(`${this.url}/pizzas/${id}`, pizza, { responseType: 'text' });
  }

  deletePizza(id: string) {
    return this.httpClient.delete(`${this.url}/pizzas/${id}`, { responseType: 'text' });
  }
}