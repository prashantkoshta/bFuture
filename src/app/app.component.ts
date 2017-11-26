import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from "./shared/services/common.service";
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private translate: TranslateService,private _commonService:CommonService) {
        translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa']);
        translate.setDefaultLang('en');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr|ur|es|it|fa/) ? browserLang : 'en');

        this._commonService.fetchData("/Customer",{},"get").subscribe(data => {
            this._commonService.setCusomersList(data);
        });
    }
}
