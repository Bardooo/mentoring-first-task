import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: User
  @Output() deleteEvent = new EventEmitter<number>()
  @Output() editEvent = new EventEmitter<User>()

  onDelete(): void {
    this.deleteEvent.emit(this.user.id)
  }

  onEdit(): void {
    this.editEvent.emit(this.user)
  }
}
