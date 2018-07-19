import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {App, Platform, Nav, NavController} from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { Deeplinks } from '../../node_modules/@ionic-native/deeplinks';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TestPage } from '../pages/test/test';
import {ViewChild} from '@angular/core';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  @ViewChild(Nav) navChild:Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public deeplinks: Deeplinks) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.deepLink();
      splashScreen.hide();
    });
  }

  deepLink() {
    this.deeplinks.routeWithNavController(this.navChild, {
      '/loginpage': LoginPage,
      '/signup': SignupPage,
      '/test': TestPage
    }).subscribe(match => {
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      alert('Successfully matched route'+ JSON.stringify(match));
    }, nomatch => {
      // nomatch.$link - the full link data
      alert('Got a deeplink that didn\'t match'+ JSON.stringify(nomatch));
    });
  }
}

