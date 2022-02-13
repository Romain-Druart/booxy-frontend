import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faMagnifyingGlass, faCodeFork } from '@fortawesome/free-solid-svg-icons';
import { IBook } from '../books/book.model';
import { BooksService } from '../books/books.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faMagnifyingGlass: any = faMagnifyingGlass;
  faCodeFork: any = faCodeFork;
  @Output() books = new EventEmitter<IBook[]>();
  @Output() nbHits = new EventEmitter<number>();
  @Output() times = new EventEmitter<number>();

  constructor(private bookService: BooksService) {
  }

  ngOnInit(): void {
  }

  /**
   * Met à jour la liste de livres, du nombre de livre et le temps de requete après une recherche 
   */
  searchBooks(event: EventTarget | null) {
    if (event) {
      const target = event as HTMLInputElement;
      if (target.value != '' && target.value.length > 0) {
        this.bookService.search(target.value).subscribe(resp => {
          if (resp.body?.hits) this.books.emit(resp.body.hits)
          if (resp.body?.nbHits) this.nbHits.emit(resp.body.nbHits);
          if (resp.body?.processingTimeMs) this.times.emit(resp.body.processingTimeMs);
        })
      } else if (target.value === '') {
        this.bookService.get().subscribe(resp => {
          if (resp.body) {
            this.books.emit(resp.body)
            this.nbHits.emit(resp.body.length)
            this.times.emit(undefined);
          }
        })
      }
    }
  }

}
