import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeneralService } from 'src/app/providers/general.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('mapCanvas') mapElement: ElementRef;


  constructor(private genService: GeneralService) { }

  ngOnInit() {
    this.genService.getMap().subscribe((mapData: any) => {
      const mapEle = this.mapElement.nativeElement;

      const map = new google.maps.Map(mapEle, {
        center: mapData.find((loc: any) => loc.center),
        zoom: 16
      });

      mapData.forEach((markerData: any) => {
        const infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        const marker = new google.maps.Marker({
          position: markerData,
          map,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      google.maps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });
    });
  }
}
