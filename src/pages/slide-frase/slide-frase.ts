import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';

/**
 * Generated class for the SlideFrasePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-slide-frase',
  templateUrl: 'slide-frase.html',
})
export class SlideFrasePage {

  frase: any;
  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController, public navParams: NavParams, private tts: TextToSpeech) {
    this.frase = this.navParams.get('frase');
    this.speak(this.frase.items[0].data.name);

  }

  ionViewDidLoad() {

  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();

    if (currentIndex < this.frase.items.length) {
      this.speak(this.frase.items[currentIndex].data.name);
    }

  }

  speak(text) {

    this.tts.speak({
      text: text,
      locale: 'es-AR'
    }).then((data) => {
      console.log(data)
    });

  }

}
