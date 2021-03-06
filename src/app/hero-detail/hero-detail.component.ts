import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../shared/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})

export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
    // + The hero id is a number. Route parameters are always strings.
    // So the route parameter value is converted to a number with the JavaScript (+) operator.
        this.heroService.getHero(+params.get('id')))
      .subscribe(hero => this.hero = hero);
  }
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
