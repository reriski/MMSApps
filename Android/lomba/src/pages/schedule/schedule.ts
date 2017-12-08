import { Component, ViewChild } from '@angular/core';
import { AlertController, App, List, ModalController, NavController, ToastController, LoadingController } from 'ionic-angular';

import { RedditDataProvider } from '../../providers/reddit-data/reddit-data';

import { SessionDetailPage } from '../session-detail/session-detail';


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;
  datas:any;
  searchQuery: any = '';
  items: any;
  shownGroup = null;
  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public redditDataProvider : RedditDataProvider,
    
  ) {
    this.getRemoteData();
    this.initializeItems();
  }

  getRemoteData() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.redditDataProvider.getRemoteData()
    .then(res => {
      this.datas = res['data'];
      loading.dismiss();
      console.log(this.datas);
    });
  }

  initializeItems() {
    this.items = this.datas;
  }
  getsearch(ev: any){
    this.initializeItems();
    
        var val = ev.target.value;
        if (val && val.trim() != '') {
          this.items = this.items.filter((item) => {
            return (item.nama_rptra.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
    this.searchQuery = ev.target.value;
    console.log(ev);
  }

  goToSessionDetail(sessionData: any) {

  this.navCtrl.push(SessionDetailPage, { sessionId: sessionData.id });
  }
}
