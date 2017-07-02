import { File } from '@ionic-native/file';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';

/**
 * Generated class for the PictoCustomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-picto-custom',
  templateUrl: 'picto-custom.html',
})
export class PictoCustomPage {
  picto: any;
  op: any;
  callBackFn: any;

  constructor(public navCtrl: NavController,
    private imagePicker: ImagePicker,
    private crop: Crop,
    private file: File,
    public navParams: NavParams) {
    this.picto = this.navParams.get('picto');
    this.op = this.navParams.get('op');
    this.callBackFn = this.navParams.get('callBackFn');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PictoCustomPage');
  }

  async chooseAimage() {
    this.imagePicker.getPictures({ maximumImagesCount: 1 }).then((imageFile) => {
      imageFile = imageFile[0];
      this.crop.crop(imageFile, { quality: 100 })
        .then(
        (newImage) => {
          this.picto.file = newImage;
          let filename = newImage.split('/').pop();
          let directory = newImage.replace('/' + filename, '');

        },
        (error) => {
          console.error('Error cropping image', error)
        }
        );


    }, (err) => { });
  }

  save() {
    this.callBackFn(this.op, this.picto)
      .then(() => {
        this.navCtrl.pop();
      }).catch(() => {

      });
  }

}
