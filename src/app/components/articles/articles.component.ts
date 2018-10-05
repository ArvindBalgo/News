import { Component, OnInit } from '@angular/core';
import {Article} from '../../models/article';
import {NewsService} from '../../services/http/news.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.articles$.subscribe((articles) => console.log(articles))
  }

}
