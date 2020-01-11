import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  public static show = false;
  public static trigger = false;

  public static delayBeforeDisplay = 0;
  public static count = 0;
  public static set display(showIndicator: boolean) {
    if (LoadingComponent.count < 0) {
      LoadingComponent.count = 0;
    }
    if (showIndicator) {
      LoadingComponent.count++;
    } else {
      LoadingComponent.count--;
    }
    // toggle the flag for the timeout to check if it needs to trigger the indicator display or not
    LoadingComponent.trigger = !showIndicator;
    if (showIndicator) {
      setTimeout(() => {
        if (!LoadingComponent.trigger) {
          LoadingComponent.show = showIndicator;
        }
      }, LoadingComponent.delayBeforeDisplay);
    } else {
      if (LoadingComponent.count <= 0) {
        LoadingComponent.show = showIndicator;
      }
    }
  }

  public get display() {
    return LoadingComponent.show;
  }

  ngOnInit(): void {
  }


}
