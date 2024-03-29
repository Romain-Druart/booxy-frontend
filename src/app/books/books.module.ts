import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookItemComponent } from './book-item/book-item.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksComponent } from './books.component';
import { BooksService } from './books.service';
import { MatDialogModule } from '@angular/material/dialog'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookAlertComponent } from './book-alert/book-alert.component';


@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        InfiniteScrollModule,
        FontAwesomeModule
    ],
    providers: [BooksService],
    declarations: [BooksComponent, BookItemComponent, BooksListComponent, BookDetailsComponent, BookAlertComponent],
    exports: [BooksComponent, BookItemComponent, BooksListComponent, BookDetailsComponent, BookAlertComponent],

})
export class BooksModule { }
