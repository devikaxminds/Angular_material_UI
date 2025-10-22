import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { UserTableComponent } from './user-table.component';
import { UserService } from '../services/user.service';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'deleteUser']);

    await TestBed.configureTestingModule({
      imports: [
        UserTableComponent,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userService.getUsers.and.returnValue([
      { name: 'Test User', email: 'test@example.com', phone: '123-456-7890', country: 'United States' }
    ]);

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users from service', () => {
    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(1);
  });

  it('should apply filter correctly', () => {
    const event = new KeyboardEvent('keyup');
    Object.defineProperty(event, 'target', {
      value: { value: 'test' }
    });
    
    component.applyFilter(event as any);
    expect(component.dataSource.filter).toBe('test');
  });

  it('should navigate to form page', () => {
    const router = TestBed.inject(Router);
    
    component.goToForm();
    expect(router.navigate).toHaveBeenCalledWith(['/form']);
  });

  it('should delete user and refresh data', () => {
    const mockUsers = [
      { name: 'User 1', email: 'user1@example.com', phone: '111-111-1111', country: 'US' },
      { name: 'User 2', email: 'user2@example.com', phone: '222-222-2222', country: 'CA' }
    ];
    userService.getUsers.and.returnValue(mockUsers);
    
    component.deleteUser(0);
    
    expect(userService.deleteUser).toHaveBeenCalledWith(0);
    expect(userService.getUsers).toHaveBeenCalledTimes(2); // Once in constructor, once in deleteUser
  });
});
