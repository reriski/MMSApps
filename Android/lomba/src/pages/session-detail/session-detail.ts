import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { RedditDataProvider } from '../../providers/reddit-data/reddit-data';

declare var google;

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  @ViewChild('map') mapElement: ElementRef;
  datas: any;
  marker:any;
  id:any;
  lat:any;
  lng:any;
  map: any;
  nama_rptra:any;  
  alamat:any;
  kelurahan:any;
  kecamatan:any;
  waktu_peresmian:any;
  telepon:any;
  fasilitas:any;
  luas:any;
  locations:any;
  latitude:any;
  longitude:any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  public buttonClicked: boolean = false;
  
  constructor(
    public redditDataProvider: RedditDataProvider,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
  ) {
    this.getRemoteData();
  }
  
  public onButtonClick() {
    this.buttonClicked = !this.buttonClicked;
  }
  getRemoteData() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
  
    this.redditDataProvider.getRemoteData()
    .then(res => {
      for(let dat of this.datas = res['data']) {
        if(dat.id == this.navParams.data.sessionId){
          this.nama_rptra = dat.nama_rptra;
          this.alamat = dat.alamat;
          this.kelurahan = dat.kelurahan;
          this.kecamatan = dat.kecamatan;
          this.waktu_peresmian = dat.waktu_peresmian;
          this.telepon = dat.telepon;
          this.fasilitas = dat.fasilitas;
          this.luas = dat.luas;
          this.latitude = dat.location['latitude'];
          this.longitude = dat.location['longitude'];

          this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 18,
            center: {lat: this.latitude, lng: this.longitude}
          });
      
          this.marker = new google.maps.Marker({
            position: {lat: this.latitude, lng: this.longitude},
            map: this.map,
          });

          this.directionsDisplay.setMap(this.map);

        }
      }
      loading.dismiss();
      console.log(this.datas);
    });
  }
}
