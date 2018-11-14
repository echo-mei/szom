import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicApp, IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer } from '@ionic-native/file-transfer';
import { AppVersion } from '@ionic-native/app-version';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { IonicImageLoader } from 'ionic-image-loader';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { MultiPickerModule } from 'ion-multi-picker';
import { CalendarModule } from 'ion2-calendar';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';

import { MyApp } from './app.component';

import { HttpProvider } from '../providers/http/http';
import { HttpInterceptorProvider } from '../providers/http-interceptor/http-interceptor';
import { StorageProvider } from '../providers/storage/storage';
import { UserProvider } from '../providers/user/user';
import { EvaluateProvider } from '../providers/evaluate/evaluate';
import { DailyProvider } from '../providers/daily/daily';
import { SignProvider } from '../providers/sign/sign';
import { ImpressionProvider } from '../providers/impression/impression';
import { DateUtilProvider } from '../providers/date-util/date-util';
import { WorkProvider } from '../providers/work/work';
import { AddresslistProvider } from '../providers/addresslist/addresslist';
import { ImageUtilProvider } from '../providers/image-util/image-util';
import { DynamicProvider } from '../providers/dynamic/dynamic';
import { ArrayUtilProvider } from '../providers/array-util/array-util';
import { IonicUtilProvider } from '../providers/ionic-util/ionic-util';
import { UnitProvider } from '../providers/unit/unit';
import { MenuProvider } from '../providers/menu/menu';
import { WebsocketProvider } from '../providers/websocket/websocket';
import { EmojiProvider } from '../providers/emoji/emoji';
import { DicProvider } from '../providers/dic/dic';
import { BzWeektableProvider } from '../providers/bz-weektable/bz-weektable';
import { BzDailyProvider } from '../providers/bz-daily/bz-daily';
import { BzInfoLibProvider } from '../providers/bz-info-lib/bz-info-lib';
import { HeavyFocusProvider } from '../providers/heavy-focus/heavy-focus';

import { ImagePickerComponent } from '../components/image-picker/image-picker';
import { TimeSelectComponent } from '../components/time-select/time-select';
import { PopSelectComponent } from '../components/pop-select/pop-select';
import { NotFoundComponent } from '../components/not-found/not-found';
import { ImgShowComponent } from '../components/img-show/img-show';
import { ListItemComponent } from '../components/list-item/list-item';
import { BetweenDatePickerComponent } from '../components/between-date-picker/between-date-picker';
import { CommentInputComponent } from '../components/comment-input/comment-input';
import { NotFoundPersonComponent } from '../components/not-found-person/not-found-person';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

import { AddresslistPage } from '../pages/addresslist/addresslist';
import { AddresslistNewPage } from '../pages/addresslist-new/addresslist-new';
import { AddresslistOtherPage } from '../pages/addresslist-other/addresslist-other';
import { AddresslistSearchPage } from '../pages/addresslist-search/addresslist-search';
import { AddresslistUnitPage } from '../pages/addresslist-unit/addresslist-unit';
import { DailyListRadioPage } from '../pages/daily-list-radio/daily-list-radio';
import { DailyMePage } from '../pages/daily-me/daily-me';
import { LikeStatisticsPage } from '../pages/like-statistics/like-statistics';
import { DailyMeCreatePage } from '../pages/daily-me-create/daily-me-create';
import { DailyMeSearchPage } from '../pages/daily-me-search/daily-me-search';
import { DailyMeUpdatePage } from '../pages/daily-me-update/daily-me-update';
import { DailyOnePage } from '../pages/daily-one/daily-one';
import { DailyOneCreatePage } from '../pages/daily-one-create/daily-one-create';
import { DailyOneSearchPage } from '../pages/daily-one-search/daily-one-search';
import { DailyOneUpdatePage } from '../pages/daily-one-update/daily-one-update';
import { DailyTenPage } from '../pages/daily-ten/daily-ten';
import { DailyTenCreatePage } from '../pages/daily-ten-create/daily-ten-create';
import { DailyTenSearchPage } from '../pages/daily-ten-search/daily-ten-search';
import { DailyTenShowPage } from '../pages/daily-ten-show/daily-ten-show';
import { DailyTenUpdatePage } from '../pages/daily-ten-update/daily-ten-update';
import { DailyThreePage } from '../pages/daily-three/daily-three';
import { DailyThreeCreatePage } from '../pages/daily-three-create/daily-three-create';
import { DailyThreeSearchPage } from '../pages/daily-three-search/daily-three-search';
import { DailyThreeShowPage } from '../pages/daily-three-show/daily-three-show';
import { DailyThreeUpdatePage } from '../pages/daily-three-update/daily-three-update';
import { DynamicPage } from '../pages/dynamic/dynamic';
import { DynamicDetailPage } from '../pages/dynamic-detail/dynamic-detail';
import { DynamicListPage } from '../pages/dynamic-list/dynamic-list';
import { DynamicSearchPage } from '../pages/dynamic-search/dynamic-search';
import { EvaluatePage } from '../pages/evaluate/evaluate';
import { EvaluateListPage } from '../pages/evaluate-list/evaluate-list';
import { EvaluteCreatePage } from '../pages/evalute-create/evalute-create';
import { EvaluteCreateSearchPage } from '../pages/evalute-create-search/evalute-create-search';
import { EvaluteDetailPage } from '../pages/evalute-detail/evalute-detail';
import { EvaluteUpdatePage } from '../pages/evalute-update/evalute-update';
import { LikeListPage } from '../pages/like-list/like-list';
import { LoginPage } from '../pages/login/login';
import { MePage } from '../pages/me/me';
import { MeInfoPage } from '../pages/me-info/me-info';
import { MeSafePage } from '../pages/me-safe/me-safe';
import { MeSignPage } from '../pages/me-sign/me-sign';
import { MeUpdatePage } from '../pages/me-update/me-update';
import { MeUpdateZsPage } from '../pages/me-update-zs/me-update-zs';
import { MeUpdatePhonePage } from '../pages/me-update-phone/me-update-phone';
import { MeUpdatePasswordPage} from '../pages/me-update-password/me-update-password';
import { MeUpdateUserPage} from '../pages/me-update-user/me-update-user';
import { PersonListTeamPage } from '../pages/person-list-team/person-list-team';
import { SearchConditionsPage } from '../pages/search-conditions/search-conditions';
import { SignDatePage } from '../pages/sign-date/sign-date';
import { SignTagsPage } from '../pages/sign-tags/sign-tags';
import { TabsPage } from '../pages/tabs/tabs';
import { TeamListPage } from '../pages/team-list/team-list';
import { TeamListUnitPage } from '../pages/team-list-unit/team-list-unit';
import { TypeCustomPage } from '../pages/type-custom/type-custom';
import { UserBaseinfoPage } from '../pages/user-baseinfo/user-baseinfo';
import { UserDynamicListPage } from '../pages/user-dynamic-list/user-dynamic-list';
import { UserDynamicShowPage } from '../pages/user-dynamic-show/user-dynamic-show';
import { UserImpressionPage } from '../pages/user-impression/user-impression';
import { UserImpressionAddPage } from '../pages/user-impression-add/user-impression-add';
import { UserImpressionCreatePage } from '../pages/user-impression-create/user-impression-create';
import { UserInfoPage } from '../pages/user-info/user-info';
import { UserSelfinfoPage } from '../pages/user-selfinfo/user-selfinfo';
import { WorkWeektablePage } from '../pages/work-weektable/work-weektable';
import { WorkWeektableCreatePage } from '../pages/work-weektable-create/work-weektable-create';
import { WorkWeektableStatisticsPage } from '../pages/work-weektable-statistics/work-weektable-statistics';
import { WorkWeektableShowPage } from '../pages/work-weektable-show/work-weektable-show';
import { WorkWeektableUpdatePage } from '../pages/work-weektable-update/work-weektable-update';
import { WorkspacePage } from '../pages/workspace/workspace';
import { DailyMeShowPage } from '../pages/daily-me-show/daily-me-show';
import { DailyOneShowPage } from '../pages/daily-one-show/daily-one-show';
import { BzWorkWeektablePage } from '../pages/bz-work-weektable/bz-work-weektable';
import { BzWorkWeektableCreatePage } from '../pages/bz-work-weektable-create/bz-work-weektable-create';
import { BzWorkWeektableStatisticPage } from '../pages/bz-work-weektable-statistic/bz-work-weektable-statistic';
import { AddresslistNewSearchPage } from '../pages/addresslist-new-search/addresslist-new-search';
import { AddresslistOtherSearchPage } from '../pages/addresslist-other-search/addresslist-other-search';
import { AddresslistUnitSearchPage } from '../pages/addresslist-unit-search/addresslist-unit-search';
import { BzInfoPage } from '../pages/bz-info/bz-info';
import { BzInfoAddUserPage } from '../pages/bz-info-add-user/bz-info-add-user';
import { BzInfoDelUserPage } from '../pages/bz-info-del-user/bz-info-del-user';
import { BzInfoUpdateIntroPage } from '../pages/bz-info-update-intro/bz-info-update-intro';
import { BzInfoUserInfoPage } from '../pages/bz-info-user-info/bz-info-user-info';
import { BzInfoUserUpdateWorkPage } from '../pages/bz-info-user-update-work/bz-info-user-update-work';
import { LeaderInfoLibPage } from '../pages/leader-info-lib/leader-info-lib';
import { LeaderInfoLibUnitPage } from '../pages/leader-info-lib-unit/leader-info-lib-unit';
import { LeaderInfoLibSearchPage } from '../pages/leader-info-lib-search/leader-info-lib-search';
import { LeaderInfoPage } from '../pages/leader-info/leader-info';
import { UserSignPage } from '../pages/user-sign/user-sign';
import { BzDailyMePage } from '../pages/bz-daily-me/bz-daily-me';
import { BzDailyMeShowPage } from '../pages/bz-daily-me-show/bz-daily-me-show';
import { BzDailyMeCreatePage } from '../pages/bz-daily-me-create/bz-daily-me-create';
import { BzDailyMeSearchPage } from '../pages/bz-daily-me-search/bz-daily-me-search';
import { BzInfoProvider } from '../providers/bz-info/bz-info';
import { BzWorkWeektableShowPage } from '../pages/bz-work-weektable-show/bz-work-weektable-show';
import { BzWorkWeektableUpdatePage } from '../pages/bz-work-weektable-update/bz-work-weektable-update';
import { BzInfoLibPage } from  '../pages/bz-info-lib/bz-info-lib';
import { BzInfoLibShowPage } from '../pages/bz-info-lib-show/bz-info-lib-show';
import { HeavyFocusPage } from '../pages/heavy-focus/heavy-focus';
import { BzWeavePage } from '../pages/bz-weave/bz-weave';
import { BzPositionPage } from '../pages/bz-position/bz-position';
import { BzPositionAddPage } from '../pages/bz-position-add/bz-position-add';
import { BzWeaveAddPage } from '../pages/bz-weave-add/bz-weave-add';
import { BzInfoFengongPage } from '../pages/bz-info-fengong/bz-info-fengong';
import { BzInfoLookPage } from '../pages/bz-info-look/bz-info-look';
import { BzPositionLookPage } from '../pages/bz-position-look/bz-position-look';
import { BzWeaveLookPage } from '../pages/bz-weave-look/bz-weave-look';
import { HeavyFocusAddPage } from '../pages/heavy-focus-add/heavy-focus-add';
import { HeavyFocusAddSearchPage } from '../pages/heavy-focus-add-search/heavy-focus-add-search';
import { HeavyFocusUnitPage } from '../pages/heavy-focus-unit/heavy-focus-unit';
import { ImpresionDetailPage } from '../pages/impresion-detail/impresion-detail';
import { BzInfoAddSearchPage } from '../pages/bz-info-add-search/bz-info-add-search';
import { BzInfoDelSearchPage } from '../pages/bz-info-del-search/bz-info-del-search';
import { MessageInfoPage } from '../pages/message-info/message-info';
import { MessageInfoShowPage } from '../pages/message-info-show/message-info-show';
import { BzUserInfoPage } from '../pages/bz-user-info/bz-user-info';
import { BzUserInfoIntroPage } from '../pages/bz-user-info-intro/bz-user-info-intro';
import { BzInfoSortUserPage } from '../pages/bz-info-sort-user/bz-info-sort-user';
import { MeHelpFeedbackPage  } from '../pages/me-help-feedback/me-help-feedback';
import { MeHelpFeedbackDetailPage } from '../pages/me-help-feedback-detail/me-help-feedback-detail';

import * as VConsole from 'vconsole';
import { ErrorPage } from '../pages/error/error';
import { EventProvider } from '../providers/event/event';
import { BetweenDatePickerProvider } from '../providers/between-date-picker/between-date-picker';
import { LeaderInfoSlidesPage } from '../pages/leader-info-slides/leader-info-slides';
import { SortablejsModule } from 'angular-sortablejs';

new VConsole();

@NgModule({
  declarations: [
    MyApp,
    AddresslistPage,
    AddresslistNewPage,
    AddresslistNewSearchPage,
    AddresslistOtherPage,
    AddresslistOtherSearchPage,
    AddresslistSearchPage,
    AddresslistUnitPage,
    AddresslistUnitSearchPage,
    DailyListRadioPage,
    DailyMePage,
    LikeStatisticsPage,
    DailyMeCreatePage,
    DailyMeSearchPage,
    DailyMeShowPage,
    DailyMeUpdatePage,
    DailyOnePage,
    DailyOneCreatePage,
    DailyOneSearchPage,
    DailyOneShowPage,
    DailyOneUpdatePage,
    DailyTenPage,
    DailyTenCreatePage,
    DailyTenSearchPage,
    DailyTenShowPage,
    DailyTenUpdatePage,
    DailyThreePage,
    DailyThreeCreatePage,
    DailyThreeSearchPage,
    DailyThreeShowPage,
    DailyThreeUpdatePage,
    DynamicPage,
    DynamicDetailPage,
    DynamicListPage,
    DynamicSearchPage,
    EvaluatePage,
    EvaluateListPage,
    EvaluteCreatePage,
    EvaluteCreateSearchPage,
    EvaluteDetailPage,
    EvaluteUpdatePage,
    LikeListPage,
    LoginPage,
    MePage,
    MeInfoPage,
    MeSafePage,
    MeSignPage,
    MeUpdatePage,
    MeUpdateZsPage,
    MeUpdatePhonePage,
    MeUpdatePasswordPage,
    MeUpdateUserPage,
    PersonListTeamPage,
    SearchConditionsPage,
    SignDatePage,
    SignTagsPage,
    TabsPage,
    TeamListPage,
    TeamListUnitPage,
    TypeCustomPage,
    UserBaseinfoPage,
    UserDynamicListPage,
    UserDynamicShowPage,
    UserImpressionPage,
    UserImpressionAddPage,
    UserImpressionCreatePage,
    UserInfoPage,
    UserSelfinfoPage,
    WorkWeektablePage,
    WorkWeektableCreatePage,
    WorkWeektableStatisticsPage,
    WorkWeektableShowPage,
    WorkWeektableUpdatePage,
    WorkspacePage,
    BzWorkWeektablePage,
    BzWorkWeektableCreatePage,
    BzWorkWeektableStatisticPage,
    BzInfoPage,
    BzInfoAddUserPage,
    BzInfoDelUserPage,
    BzInfoUpdateIntroPage,
    BzInfoUserInfoPage,
    BzInfoUserUpdateWorkPage,
    LeaderInfoLibPage,
    LeaderInfoLibUnitPage,
    LeaderInfoLibSearchPage,
    LeaderInfoPage,
    UserSignPage,
    BzDailyMePage,
    BzDailyMeShowPage,
    BzDailyMeCreatePage,
    BzDailyMeSearchPage,
    BzWorkWeektableShowPage,
    BzWorkWeektableUpdatePage,
    ErrorPage,
    BzInfoLibPage,
    BzInfoLibShowPage,
    HeavyFocusPage,
    BzWeavePage,
    BzPositionPage,
    BzPositionAddPage,
    BzWeaveAddPage,
    BzInfoFengongPage,
    BzInfoLookPage,
    BzPositionLookPage,
    BzWeaveLookPage,
    HeavyFocusAddPage,
    HeavyFocusAddSearchPage,
    HeavyFocusUnitPage,
    ImpresionDetailPage,
    BzInfoAddSearchPage,
    BzInfoDelSearchPage,
    MessageInfoPage,
    MessageInfoShowPage,
    LeaderInfoSlidesPage,
    BzUserInfoPage,
    BzUserInfoIntroPage,
    BzInfoSortUserPage,
    MeHelpFeedbackPage,
    MeHelpFeedbackDetailPage,

    ImagePickerComponent,
    NotFoundComponent,
    ImgShowComponent,
    PopSelectComponent,
    TimeSelectComponent,
    ListItemComponent,
    BetweenDatePickerComponent,
    CommentInputComponent,
    NotFoundPersonComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon:'md-fanhui'
    }),
    IonicImageLoader.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule,
    MultiPickerModule,
    DirectivesModule,
    PipesModule,
    IonicImageViewerModule,
    ionicGalleryModal.GalleryModalModule,
    SuperTabsModule.forRoot(),
    SortablejsModule.forRoot({ animation: 10 }),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddresslistPage,
    AddresslistNewPage,
    AddresslistNewSearchPage,
    AddresslistOtherPage,
    AddresslistOtherSearchPage,
    AddresslistSearchPage,
    AddresslistUnitPage,
    AddresslistUnitSearchPage,
    DailyListRadioPage,
    DailyMePage,
    LikeStatisticsPage,
    DailyMeCreatePage,
    DailyMeSearchPage,
    DailyMeShowPage,
    DailyMeUpdatePage,
    DailyOnePage,
    DailyOneCreatePage,
    DailyOneSearchPage,
    DailyOneShowPage,
    DailyOneUpdatePage,
    DailyTenPage,
    DailyTenCreatePage,
    DailyTenSearchPage,
    DailyTenShowPage,
    DailyTenUpdatePage,
    DailyThreePage,
    DailyThreeCreatePage,
    DailyThreeSearchPage,
    DailyThreeShowPage,
    DailyThreeUpdatePage,
    DynamicPage,
    DynamicDetailPage,
    DynamicListPage,
    DynamicSearchPage,
    EvaluatePage,
    EvaluateListPage,
    EvaluteCreatePage,
    EvaluteCreateSearchPage,
    EvaluteDetailPage,
    EvaluteUpdatePage,
    LikeListPage,
    LoginPage,
    MePage,
    MeInfoPage,
    MeSafePage,
    MeSignPage,
    MeUpdatePage,
    MeUpdateZsPage,
    MeUpdatePhonePage,
    MeUpdatePasswordPage,
    MeUpdateUserPage,
    PersonListTeamPage,
    SearchConditionsPage,
    SignDatePage,
    SignTagsPage,
    TabsPage,
    TeamListPage,
    TeamListUnitPage,
    TypeCustomPage,
    UserBaseinfoPage,
    UserDynamicListPage,
    UserDynamicShowPage,
    UserImpressionPage,
    UserImpressionAddPage,
    UserImpressionCreatePage,
    UserInfoPage,
    UserSelfinfoPage,
    WorkWeektablePage,
    WorkWeektableCreatePage,
    WorkWeektableStatisticsPage,
    WorkWeektableShowPage,
    WorkWeektableUpdatePage,
    WorkspacePage,
    BzWorkWeektablePage,
    BzWorkWeektableCreatePage,
    BzWorkWeektableStatisticPage,
    BzInfoPage,
    BzInfoAddUserPage,
    BzInfoUpdateIntroPage,
    BzInfoUserInfoPage,
    BzInfoDelUserPage,
    BzInfoUserUpdateWorkPage,
    LeaderInfoLibPage,
    LeaderInfoLibUnitPage,
    LeaderInfoLibSearchPage,
    LeaderInfoPage,
    UserSignPage,
    BzDailyMePage,
    BzDailyMeShowPage,
    BzDailyMeCreatePage,
    BzDailyMeSearchPage,
    BzWorkWeektableShowPage,
    BzWorkWeektableUpdatePage,
    ErrorPage,
    BzInfoLibPage,
    BzInfoLibShowPage,
    HeavyFocusPage,
    BzWeavePage,
    BzPositionPage,
    BzPositionAddPage,
    BzWeaveAddPage,
    BzInfoFengongPage,
    BzInfoLookPage,
    BzPositionLookPage,
    BzWeaveLookPage,
    HeavyFocusAddPage,
    HeavyFocusAddSearchPage,
    HeavyFocusUnitPage,
    ImpresionDetailPage,
    BzInfoAddSearchPage,
    BzInfoDelSearchPage,
    MessageInfoPage,
    MessageInfoShowPage,
    LeaderInfoSlidesPage,
    BzUserInfoPage,
    BzUserInfoIntroPage,
    BzInfoSortUserPage,
    MeHelpFeedbackPage,
    MeHelpFeedbackDetailPage,

    ImagePickerComponent,
    NotFoundComponent,
    ImgShowComponent,
    PopSelectComponent,
    TimeSelectComponent,
    ListItemComponent,
    BetweenDatePickerComponent,
    CommentInputComponent,
    NotFoundPersonComponent,
    ProgressBarComponent
  ],
  providers: [
    File,
    Camera,
    Device,
    ImagePicker,
    Base64,
    StatusBar,
    SplashScreen,
    Keyboard,
    MobileAccessibility,
    ScreenOrientation,
    PhotoLibrary,
    FileOpener,
    FileTransfer,
    AppVersion,
    AndroidPermissions,
    {provide: HAMMER_GESTURE_CONFIG, useClass: ionicGalleryModal.GalleryModalHammerConfig},
    // {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorProvider, multi: true},
    HttpProvider,
    StorageProvider,
    UserProvider,
    EvaluateProvider,
    DailyProvider,
    SignProvider,
    ImpressionProvider,
    DateUtilProvider,
    AddresslistProvider,
    WorkProvider,
    ImageUtilProvider,
    DynamicProvider,
    ArrayUtilProvider,
    IonicUtilProvider,
    UnitProvider,
    MenuProvider,
    WebsocketProvider,
    EmojiProvider,
    DicProvider,
    BzWeektableProvider,
    BzDailyProvider,
    BzInfoProvider,
    BzWeektableProvider,
    BzInfoLibProvider,
    HeavyFocusProvider,
    EventProvider,
    BetweenDatePickerProvider
  ]
})
export class AppModule {

}
