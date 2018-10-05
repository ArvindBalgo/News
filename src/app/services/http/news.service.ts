import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {News} from '../../models/news';
import {Article} from '../../models/article';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable()
export class NewsService {
  private url: string;
  private articles: any = [];
  private apiKey: string;
  private pageSize: number;
  private page = 1;

  constructor(private http$: HttpClient) {
    this._articles$ = new BehaviorSubject([]);
    this.url = 'https://newsapi.org/v2/everything?q=bitcoin';
    this.pageSize = 20;
    this.apiKey = '1e4013086f204b749d415644f781718b';
    this.getArticles();
  }

  private _articles$: BehaviorSubject<News[]>;

  get articles$(): Observable<News[]> {
    return this._articles$.asObservable();
  };

  public incrementPage(): void {
    this.page++;
  };

  private urlConstruct(): string {
    console.log(this.url + '&apiKey=' + this.apiKey + '&pageSize=' + this.pageSize + '&page=' + this.page);
    return this.url + '&apiKey=' + this.apiKey + '&pageSize=' + this.pageSize + '&page=' + this.page;
  };

  private httpArticles(): Observable<News> {
    return this.http$.get<News>(this.urlConstruct());
  };

  private getArticles() {
    this.httpArticles().subscribe(
      response => {
        let arrArticles = Object.values(response.articles);
        for(let i =0; i< arrArticles.length; i++) {
          this.articles.push(arrArticles[i]);
        }

        console.log(this.articles);

      }
    );
  }

  /*private notify() {
   // this._articles$.next(this.articles);
  }*/

}
