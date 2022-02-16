import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { IBook } from '../book.model';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BooksService } from '../books.service';

@Component({
  selector: 'book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {

  @Input() book?: IBook | null;
  bookTitle: string | undefined;

  constructor(
    public dialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private booksService: BooksService) {

  }

  isMobile = this.deviceService.isMobile();
  ngOnInit(): void {

  }

  openDialog() {
    //let dialogRef = this.dialog.open(BookDetailsComponent, this.config);
    if (this.book && this.book.id) {
      this.booksService.updateRankBook(this.book.id).subscribe(resp => {
        if (resp.body) {
          let data = {}
          if (resp.body._formatted) {
            data = {
              bookName: resp.body._formatted.title,
              bookLanguage: resp.body._formatted.language,
              bookCover: resp.body._formatted.cover,
              bookSubject: resp.body._formatted.subject,
              bookRights: resp.body._formatted.rights,
              bookRank: resp.body._formatted.download,
              bookId: resp.body._formatted.id
            }
          } else {
            data = {
              bookName: resp.body.title,
              bookLanguage: resp.body.language,
              bookCover: resp.body.cover,
              bookSubject: resp.body.subject,
              bookRights: resp.body.rights,
              bookRank: resp.body.download,
              isDeviceMobile: this.isMobile
            }
          }

          let dialogRef = this.dialog.open(BookDetailsComponent, {
            data: data, panelClass: "dialog-responsive"
          });
        }

      })
    }

  }

  closeDialog() {
    let dialogRef = this.dialog.closeAll();
  }


}