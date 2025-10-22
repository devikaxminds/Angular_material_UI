import { Injectable } from '@angular/core';

export interface User {
  name: string;
  email: string;
  phone: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', country: 'United States' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321', country: 'Canada' },
    { name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-123-4567', country: 'United Kingdom' },
    { name: 'Alice Williams', email: 'alice.williams@example.com', phone: '444-555-6666', country: 'Australia' },
    { name: 'Charlie Brown', email: 'charlie.brown@example.com', phone: '777-888-9999', country: 'Germany' },
    { name: 'Diana Prince', email: 'diana.prince@example.com', phone: '111-222-3333', country: 'France' },
    { name: 'Edward Norton', email: 'edward.norton@example.com', phone: '222-333-4444', country: 'United States' },
    { name: 'Fiona Green', email: 'fiona.green@example.com', phone: '333-444-5555', country: 'Canada' },
    { name: 'George Miller', email: 'george.miller@example.com', phone: '666-777-8888', country: 'United Kingdom' },
    { name: 'Helen Davis', email: 'helen.davis@example.com', phone: '888-999-0000', country: 'Australia' },
    { name: 'Ivan Petrov', email: 'ivan.petrov@example.com', phone: '999-000-1111', country: 'Germany' },
    { name: 'Julia Roberts', email: 'julia.roberts@example.com', phone: '000-111-2222', country: 'France' },
    { name: 'Kevin Hart', email: 'kevin.hart@example.com', phone: '111-333-5555', country: 'United States' },
    { name: 'Linda Martinez', email: 'linda.martinez@example.com', phone: '222-444-6666', country: 'Canada' },
    { name: 'Michael Jordan', email: 'michael.jordan@example.com', phone: '333-555-7777', country: 'United Kingdom' },
    { name: 'Nancy Wilson', email: 'nancy.wilson@example.com', phone: '444-666-8888', country: 'Australia' },
    { name: 'Oscar Wilde', email: 'oscar.wilde@example.com', phone: '555-777-9999', country: 'Germany' },
    { name: 'Patricia Lee', email: 'patricia.lee@example.com', phone: '666-888-0000', country: 'France' },
    { name: 'Quincy Jones', email: 'quincy.jones@example.com', phone: '777-999-1111', country: 'United States' },
    { name: 'Rachel Green', email: 'rachel.green@example.com', phone: '888-000-2222', country: 'Canada' },
    { name: 'Samuel Jackson', email: 'samuel.jackson@example.com', phone: '999-111-3333', country: 'United Kingdom' },
    { name: 'Teresa Garcia', email: 'teresa.garcia@example.com', phone: '000-222-4444', country: 'Australia' },
    { name: 'Ulysses Grant', email: 'ulysses.grant@example.com', phone: '111-444-6666', country: 'Germany' },
    { name: 'Victoria Beckham', email: 'victoria.beckham@example.com', phone: '222-555-7777', country: 'France' },
    { name: 'William Shakespeare', email: 'william.shakespeare@example.com', phone: '333-666-8888', country: 'United States' },
    { name: 'Xenia Onatopp', email: 'xenia.onatopp@example.com', phone: '444-777-9999', country: 'Canada' },
    { name: 'Yoko Ono', email: 'yoko.ono@example.com', phone: '555-888-0000', country: 'United Kingdom' },
    { name: 'Zachary Taylor', email: 'zachary.taylor@example.com', phone: '666-999-1111', country: 'Australia' }
  ];

  getUsers(): User[] {
    return [...this.users]; // Return a copy to prevent direct mutation
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  deleteUser(index: number): void {
    if (index >= 0 && index < this.users.length) {
      this.users.splice(index, 1);
    }
  }

  clearUsers(): void {
    this.users = [];
  }
}
