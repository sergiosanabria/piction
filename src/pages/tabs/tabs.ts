import { Component } from '@angular/core';

import {PictoPage} from "../picto/picto";
import {FrasesPage} from "../frases/frases";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PictoPage;
  tab2Root = FrasesPage;
  tab3Root = '';

  constructor() {

  }
}
