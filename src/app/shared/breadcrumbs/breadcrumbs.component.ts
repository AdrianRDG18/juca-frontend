import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {

  title: string = '';
  titleSubs$: Subscription;

  constructor(private router: Router) {
    this.titleSubs$ = this.extractTitleRoute()
                          .subscribe( ({title}) => {
                            this.title = title;
                            document.title = `JUCA - ${title}`;
                          });
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  extractTitleRoute(){
    return this.router.events
      .pipe(
        filter( (event: any) => event instanceof ActivationEnd),
        filter( (event:ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event: ActivationEnd) => event.snapshot.data)
      )
  }

}