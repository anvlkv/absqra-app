/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '@angular/core/src/linker/ng_module_factory';
import * as import1 from '../../../../app/app.module';
import * as import2 from '@angular/common/src/common_module';
import * as import3 from '@angular/core/src/application_module';
import * as import4 from '@angular/platform-browser/src/browser';
import * as import5 from '@angular/router/src/router_module';
import * as import6 from '@angular/forms/src/directives';
import * as import7 from '@angular/forms/src/form_providers';
import * as import8 from '@ng-bootstrap/ng-bootstrap/alert/alert.module';
import * as import9 from '@ng-bootstrap/ng-bootstrap/buttons/radio.module';
import * as import10 from '@ng-bootstrap/ng-bootstrap/collapse/collapse.module';
import * as import11 from '@ng-bootstrap/ng-bootstrap/progressbar/progressbar.module';
import * as import12 from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip.module';
import * as import13 from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead.module';
import * as import14 from '@ng-bootstrap/ng-bootstrap/accordion/accordion.module';
import * as import15 from '@ng-bootstrap/ng-bootstrap/carousel/carousel.module';
import * as import16 from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import * as import17 from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';
import * as import18 from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import * as import19 from '@ng-bootstrap/ng-bootstrap/pagination/pagination.module';
import * as import20 from '@ng-bootstrap/ng-bootstrap/popover/popover.module';
import * as import21 from '@ng-bootstrap/ng-bootstrap/rating/rating.module';
import * as import22 from '@ng-bootstrap/ng-bootstrap/tabset/tabset.module';
import * as import23 from '@ng-bootstrap/ng-bootstrap/timepicker/timepicker.module';
import * as import24 from '@ng-bootstrap/ng-bootstrap/index';
import * as import25 from 'ng2-dnd/index';
import * as import26 from 'ng2-validation/dist/index';
import * as import27 from '../../../../app/item-response/item-response.module';
import * as import28 from '@angular/common/src/localization';
import * as import29 from '@angular/core/src/application_init';
import * as import30 from '@angular/core/src/testability/testability';
import * as import31 from '@angular/core/src/application_ref';
import * as import32 from '@angular/core/src/linker/compiler';
import * as import33 from '@angular/platform-browser/src/dom/events/hammer_gestures';
import * as import34 from '@angular/platform-browser/src/dom/events/event_manager';
import * as import35 from '@angular/platform-browser/src/dom/shared_styles_host';
import * as import36 from '@angular/platform-browser/src/dom/dom_renderer';
import * as import37 from '@angular/platform-browser/src/security/dom_sanitization_service';
import * as import38 from '@angular/core/src/animation/animation_queue';
import * as import39 from '@angular/core/src/linker/view_utils';
import * as import40 from '@angular/platform-browser/src/browser/title';
import * as import41 from '@angular/forms/src/directives/radio_control_value_accessor';
import * as import42 from '@angular/forms/src/form_builder';
import * as import43 from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import * as import44 from '@ng-bootstrap/ng-bootstrap/modal/modal';
import * as import45 from '@ng-bootstrap/ng-bootstrap/alert/alert-config';
import * as import46 from '@ng-bootstrap/ng-bootstrap/progressbar/progressbar-config';
import * as import47 from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip-config';
import * as import48 from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-config';
import * as import49 from '@ng-bootstrap/ng-bootstrap/accordion/accordion-config';
import * as import50 from '@ng-bootstrap/ng-bootstrap/carousel/carousel-config';
import * as import51 from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import * as import52 from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-i18n';
import * as import53 from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import * as import54 from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-service';
import * as import55 from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-config';
import * as import56 from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown-config';
import * as import57 from '@ng-bootstrap/ng-bootstrap/pagination/pagination-config';
import * as import58 from '@ng-bootstrap/ng-bootstrap/popover/popover-config';
import * as import59 from '@ng-bootstrap/ng-bootstrap/rating/rating-config';
import * as import60 from '@ng-bootstrap/ng-bootstrap/tabset/tabset-config';
import * as import61 from '@ng-bootstrap/ng-bootstrap/timepicker/timepicker-config';
import * as import62 from '@angular/common/src/location/location';
import * as import63 from '@angular/router/src/url_tree';
import * as import64 from '@angular/router/src/router_outlet_map';
import * as import65 from '@angular/core/src/linker/system_js_ng_module_factory_loader';
import * as import66 from '@angular/router/src/router_preloader';
import * as import67 from 'ng2-dnd/src/dnd.config';
import * as import68 from '@angular/core/src/di/injector';
import * as import69 from '../../../node_modules/@ng-bootstrap/ng-bootstrap/alert/alert.ngfactory';
import * as import70 from '../../../node_modules/@ng-bootstrap/ng-bootstrap/tooltip/tooltip.ngfactory';
import * as import71 from '../../../node_modules/@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window.ngfactory';
import * as import72 from '../../../node_modules/@ng-bootstrap/ng-bootstrap/datepicker/datepicker.ngfactory';
import * as import73 from '../../../node_modules/@ng-bootstrap/ng-bootstrap/modal/modal-backdrop.ngfactory';
import * as import74 from '../../../node_modules/@ng-bootstrap/ng-bootstrap/modal/modal-window.ngfactory';
import * as import75 from '../../../node_modules/@ng-bootstrap/ng-bootstrap/popover/popover.ngfactory';
import * as import76 from './item-response/item-response.component.ngfactory';
import * as import77 from './sequence-response/sequence-response.component.ngfactory';
import * as import78 from './sequence-editor/sequence-editor.component.ngfactory';
import * as import79 from './app.component.ngfactory';
import * as import80 from '@angular/core/src/i18n/tokens';
import * as import81 from '@angular/core/src/application_tokens';
import * as import82 from '@angular/platform-browser/src/dom/events/dom_events';
import * as import83 from '@angular/platform-browser/src/dom/events/key_events';
import * as import84 from '@angular/core/src/zone/ng_zone';
import * as import85 from '@angular/platform-browser/src/dom/debug/ng_probe';
import * as import86 from '@angular/common/src/location/platform_location';
import * as import87 from '@angular/common/src/location/location_strategy';
import * as import88 from '../../../../app/sequence-response/sequence-response.component';
import * as import89 from '../../../../app/sequence-editor/sequence-editor.component';
import * as import90 from '@angular/router/src/url_handling_strategy';
import * as import91 from '@angular/router/src/route_reuse_strategy';
import * as import92 from 'ng2-dnd/src/dnd.service';
import * as import93 from '@angular/router/src/router';
import * as import94 from '@angular/core/src/console';
import * as import95 from '@angular/core/src/error_handler';
import * as import96 from '@angular/platform-browser/src/dom/dom_tokens';
import * as import97 from '@angular/platform-browser/src/dom/animation_driver';
import * as import98 from '@angular/core/src/render/api';
import * as import99 from '@angular/core/src/security';
import * as import100 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import101 from '@angular/core/src/change_detection/differs/keyvalue_differs';
import * as import102 from '@angular/core/src/linker/ng_module_factory_loader';
import * as import103 from '@angular/router/src/router_config_loader';
import * as import104 from '@angular/router/src/router_state';
class AppModuleInjector extends import0.NgModuleInjector<import1.AppModule> {
  _CommonModule_0:import2.CommonModule;
  _ApplicationModule_1:import3.ApplicationModule;
  _BrowserModule_2:import4.BrowserModule;
  _ROUTER_FORROOT_GUARD_3:any;
  _RouterModule_4:import5.RouterModule;
  _InternalFormsSharedModule_5:import6.InternalFormsSharedModule;
  _FormsModule_6:import7.FormsModule;
  _ReactiveFormsModule_7:import7.ReactiveFormsModule;
  _NgbAlertModule_8:import8.NgbAlertModule;
  _NgbButtonsModule_9:import9.NgbButtonsModule;
  _NgbCollapseModule_10:import10.NgbCollapseModule;
  _NgbProgressbarModule_11:import11.NgbProgressbarModule;
  _NgbTooltipModule_12:import12.NgbTooltipModule;
  _NgbTypeaheadModule_13:import13.NgbTypeaheadModule;
  _NgbAccordionModule_14:import14.NgbAccordionModule;
  _NgbCarouselModule_15:import15.NgbCarouselModule;
  _NgbDatepickerModule_16:import16.NgbDatepickerModule;
  _NgbDropdownModule_17:import17.NgbDropdownModule;
  _NgbModalModule_18:import18.NgbModalModule;
  _NgbPaginationModule_19:import19.NgbPaginationModule;
  _NgbPopoverModule_20:import20.NgbPopoverModule;
  _NgbRatingModule_21:import21.NgbRatingModule;
  _NgbTabsetModule_22:import22.NgbTabsetModule;
  _NgbTimepickerModule_23:import23.NgbTimepickerModule;
  _NgbRootModule_24:import24.NgbRootModule;
  _DndModule_25:import25.DndModule;
  _CustomFormsModule_26:import26.CustomFormsModule;
  _NgbModule_27:import24.NgbModule;
  _ItemResponseModule_28:import27.ItemResponseModule;
  _AppModule_29:import1.AppModule;
  __LOCALE_ID_30:any;
  __NgLocalization_31:import28.NgLocaleLocalization;
  _ErrorHandler_32:any;
  _ApplicationInitStatus_33:import29.ApplicationInitStatus;
  _Testability_34:import30.Testability;
  _ApplicationRef__35:import31.ApplicationRef_;
  __ApplicationRef_36:any;
  __Compiler_37:import32.Compiler;
  __APP_ID_38:any;
  __DOCUMENT_39:any;
  __HAMMER_GESTURE_CONFIG_40:import33.HammerGestureConfig;
  __EVENT_MANAGER_PLUGINS_41:any[];
  __EventManager_42:import34.EventManager;
  _DomSharedStylesHost_43:import35.DomSharedStylesHost;
  __AnimationDriver_44:any;
  __DomRootRenderer_45:import36.DomRootRenderer_;
  __NgProbeToken_46:any[];
  __RootRenderer_47:any;
  __DomSanitizer_48:import37.DomSanitizerImpl;
  __Sanitizer_49:any;
  __AnimationQueue_50:import38.AnimationQueue;
  __ViewUtils_51:import39.ViewUtils;
  __IterableDiffers_52:any;
  __KeyValueDiffers_53:any;
  __SharedStylesHost_54:any;
  __Title_55:import40.Title;
  __RadioControlRegistry_56:import41.RadioControlRegistry;
  __FormBuilder_57:import42.FormBuilder;
  __NgbModalStack_58:import43.NgbModalStack;
  __NgbModal_59:import44.NgbModal;
  __NgbAlertConfig_60:import45.NgbAlertConfig;
  __NgbProgressbarConfig_61:import46.NgbProgressbarConfig;
  __NgbTooltipConfig_62:import47.NgbTooltipConfig;
  __NgbTypeaheadConfig_63:import48.NgbTypeaheadConfig;
  __NgbAccordionConfig_64:import49.NgbAccordionConfig;
  __NgbCarouselConfig_65:import50.NgbCarouselConfig;
  __NgbCalendar_66:import51.NgbCalendarGregorian;
  __NgbDatepickerI18n_67:import52.NgbDatepickerI18nDefault;
  __NgbDateParserFormatter_68:import53.NgbDateISOParserFormatter;
  __NgbDatepickerService_69:import54.NgbDatepickerService;
  __NgbDatepickerConfig_70:import55.NgbDatepickerConfig;
  __NgbDropdownConfig_71:import56.NgbDropdownConfig;
  __NgbPaginationConfig_72:import57.NgbPaginationConfig;
  __NgbPopoverConfig_73:import58.NgbPopoverConfig;
  __NgbRatingConfig_74:import59.NgbRatingConfig;
  __NgbTabsetConfig_75:import60.NgbTabsetConfig;
  __NgbTimepickerConfig_76:import61.NgbTimepickerConfig;
  __ROUTER_CONFIGURATION_77:any;
  __LocationStrategy_78:any;
  __Location_79:import62.Location;
  __UrlSerializer_80:import63.DefaultUrlSerializer;
  __RouterOutletMap_81:import64.RouterOutletMap;
  __NgModuleFactoryLoader_82:import65.SystemJsNgModuleLoader;
  __ROUTES_83:any[];
  __Router_84:any;
  __ActivatedRoute_85:any;
  _NoPreloading_86:import66.NoPreloading;
  _PreloadingStrategy_87:any;
  _RouterPreloader_88:import66.RouterPreloader;
  __PreloadAllModules_89:import66.PreloadAllModules;
  __ROUTER_INITIALIZER_90:any;
  __APP_BOOTSTRAP_LISTENER_91:any[];
  __DragDropConfig_92:import67.DragDropConfig;
  __DragDropService_93:any;
  __DragDropSortableService_94:any;
  constructor(parent:import68.Injector) {
    super(parent,[
      import69.NgbAlertNgFactory,
      import70.NgbTooltipWindowNgFactory,
      import71.NgbTypeaheadWindowNgFactory,
      import72.NgbDatepickerNgFactory,
      import73.NgbModalBackdropNgFactory,
      import74.NgbModalWindowNgFactory,
      import75.NgbPopoverWindowNgFactory,
      import76.ItemResponseComponentNgFactory,
      import77.SequenceResponseComponentNgFactory,
      import78.SequenceEditorComponentNgFactory,
      import79.AppComponentNgFactory
    ]
    ,[import79.AppComponentNgFactory]);
  }
  get _LOCALE_ID_30():any {
    if ((this.__LOCALE_ID_30 == null)) { (this.__LOCALE_ID_30 = import3._localeFactory(this.parent.get(import80.LOCALE_ID,(null as any)))); }
    return this.__LOCALE_ID_30;
  }
  get _NgLocalization_31():import28.NgLocaleLocalization {
    if ((this.__NgLocalization_31 == null)) { (this.__NgLocalization_31 = new import28.NgLocaleLocalization(this._LOCALE_ID_30)); }
    return this.__NgLocalization_31;
  }
  get _ApplicationRef_36():any {
    if ((this.__ApplicationRef_36 == null)) { (this.__ApplicationRef_36 = this._ApplicationRef__35); }
    return this.__ApplicationRef_36;
  }
  get _Compiler_37():import32.Compiler {
    if ((this.__Compiler_37 == null)) { (this.__Compiler_37 = new import32.Compiler()); }
    return this.__Compiler_37;
  }
  get _APP_ID_38():any {
    if ((this.__APP_ID_38 == null)) { (this.__APP_ID_38 = import81._appIdRandomProviderFactory()); }
    return this.__APP_ID_38;
  }
  get _DOCUMENT_39():any {
    if ((this.__DOCUMENT_39 == null)) { (this.__DOCUMENT_39 = import4._document()); }
    return this.__DOCUMENT_39;
  }
  get _HAMMER_GESTURE_CONFIG_40():import33.HammerGestureConfig {
    if ((this.__HAMMER_GESTURE_CONFIG_40 == null)) { (this.__HAMMER_GESTURE_CONFIG_40 = new import33.HammerGestureConfig()); }
    return this.__HAMMER_GESTURE_CONFIG_40;
  }
  get _EVENT_MANAGER_PLUGINS_41():any[] {
    if ((this.__EVENT_MANAGER_PLUGINS_41 == null)) { (this.__EVENT_MANAGER_PLUGINS_41 = [
      new import82.DomEventsPlugin(),
      new import83.KeyEventsPlugin(),
      new import33.HammerGesturesPlugin(this._HAMMER_GESTURE_CONFIG_40)
    ]
    ); }
    return this.__EVENT_MANAGER_PLUGINS_41;
  }
  get _EventManager_42():import34.EventManager {
    if ((this.__EventManager_42 == null)) { (this.__EventManager_42 = new import34.EventManager(this._EVENT_MANAGER_PLUGINS_41,this.parent.get(import84.NgZone))); }
    return this.__EventManager_42;
  }
  get _AnimationDriver_44():any {
    if ((this.__AnimationDriver_44 == null)) { (this.__AnimationDriver_44 = import4._resolveDefaultAnimationDriver()); }
    return this.__AnimationDriver_44;
  }
  get _DomRootRenderer_45():import36.DomRootRenderer_ {
    if ((this.__DomRootRenderer_45 == null)) { (this.__DomRootRenderer_45 = new import36.DomRootRenderer_(this._DOCUMENT_39,this._EventManager_42,this._DomSharedStylesHost_43,this._AnimationDriver_44,this._APP_ID_38)); }
    return this.__DomRootRenderer_45;
  }
  get _NgProbeToken_46():any[] {
    if ((this.__NgProbeToken_46 == null)) { (this.__NgProbeToken_46 = [import5.routerNgProbeToken()]); }
    return this.__NgProbeToken_46;
  }
  get _RootRenderer_47():any {
    if ((this.__RootRenderer_47 == null)) { (this.__RootRenderer_47 = import85._createConditionalRootRenderer(this._DomRootRenderer_45,this.parent.get(import85.NgProbeToken,(null as any)),this._NgProbeToken_46)); }
    return this.__RootRenderer_47;
  }
  get _DomSanitizer_48():import37.DomSanitizerImpl {
    if ((this.__DomSanitizer_48 == null)) { (this.__DomSanitizer_48 = new import37.DomSanitizerImpl()); }
    return this.__DomSanitizer_48;
  }
  get _Sanitizer_49():any {
    if ((this.__Sanitizer_49 == null)) { (this.__Sanitizer_49 = this._DomSanitizer_48); }
    return this.__Sanitizer_49;
  }
  get _AnimationQueue_50():import38.AnimationQueue {
    if ((this.__AnimationQueue_50 == null)) { (this.__AnimationQueue_50 = new import38.AnimationQueue(this.parent.get(import84.NgZone))); }
    return this.__AnimationQueue_50;
  }
  get _ViewUtils_51():import39.ViewUtils {
    if ((this.__ViewUtils_51 == null)) { (this.__ViewUtils_51 = new import39.ViewUtils(this._RootRenderer_47,this._Sanitizer_49,this._AnimationQueue_50)); }
    return this.__ViewUtils_51;
  }
  get _IterableDiffers_52():any {
    if ((this.__IterableDiffers_52 == null)) { (this.__IterableDiffers_52 = import3._iterableDiffersFactory()); }
    return this.__IterableDiffers_52;
  }
  get _KeyValueDiffers_53():any {
    if ((this.__KeyValueDiffers_53 == null)) { (this.__KeyValueDiffers_53 = import3._keyValueDiffersFactory()); }
    return this.__KeyValueDiffers_53;
  }
  get _SharedStylesHost_54():any {
    if ((this.__SharedStylesHost_54 == null)) { (this.__SharedStylesHost_54 = this._DomSharedStylesHost_43); }
    return this.__SharedStylesHost_54;
  }
  get _Title_55():import40.Title {
    if ((this.__Title_55 == null)) { (this.__Title_55 = new import40.Title()); }
    return this.__Title_55;
  }
  get _RadioControlRegistry_56():import41.RadioControlRegistry {
    if ((this.__RadioControlRegistry_56 == null)) { (this.__RadioControlRegistry_56 = new import41.RadioControlRegistry()); }
    return this.__RadioControlRegistry_56;
  }
  get _FormBuilder_57():import42.FormBuilder {
    if ((this.__FormBuilder_57 == null)) { (this.__FormBuilder_57 = new import42.FormBuilder()); }
    return this.__FormBuilder_57;
  }
  get _NgbModalStack_58():import43.NgbModalStack {
    if ((this.__NgbModalStack_58 == null)) { (this.__NgbModalStack_58 = new import43.NgbModalStack()); }
    return this.__NgbModalStack_58;
  }
  get _NgbModal_59():import44.NgbModal {
    if ((this.__NgbModal_59 == null)) { (this.__NgbModal_59 = new import44.NgbModal(this,this,this._NgbModalStack_58)); }
    return this.__NgbModal_59;
  }
  get _NgbAlertConfig_60():import45.NgbAlertConfig {
    if ((this.__NgbAlertConfig_60 == null)) { (this.__NgbAlertConfig_60 = new import45.NgbAlertConfig()); }
    return this.__NgbAlertConfig_60;
  }
  get _NgbProgressbarConfig_61():import46.NgbProgressbarConfig {
    if ((this.__NgbProgressbarConfig_61 == null)) { (this.__NgbProgressbarConfig_61 = new import46.NgbProgressbarConfig()); }
    return this.__NgbProgressbarConfig_61;
  }
  get _NgbTooltipConfig_62():import47.NgbTooltipConfig {
    if ((this.__NgbTooltipConfig_62 == null)) { (this.__NgbTooltipConfig_62 = new import47.NgbTooltipConfig()); }
    return this.__NgbTooltipConfig_62;
  }
  get _NgbTypeaheadConfig_63():import48.NgbTypeaheadConfig {
    if ((this.__NgbTypeaheadConfig_63 == null)) { (this.__NgbTypeaheadConfig_63 = new import48.NgbTypeaheadConfig()); }
    return this.__NgbTypeaheadConfig_63;
  }
  get _NgbAccordionConfig_64():import49.NgbAccordionConfig {
    if ((this.__NgbAccordionConfig_64 == null)) { (this.__NgbAccordionConfig_64 = new import49.NgbAccordionConfig()); }
    return this.__NgbAccordionConfig_64;
  }
  get _NgbCarouselConfig_65():import50.NgbCarouselConfig {
    if ((this.__NgbCarouselConfig_65 == null)) { (this.__NgbCarouselConfig_65 = new import50.NgbCarouselConfig()); }
    return this.__NgbCarouselConfig_65;
  }
  get _NgbCalendar_66():import51.NgbCalendarGregorian {
    if ((this.__NgbCalendar_66 == null)) { (this.__NgbCalendar_66 = new import51.NgbCalendarGregorian()); }
    return this.__NgbCalendar_66;
  }
  get _NgbDatepickerI18n_67():import52.NgbDatepickerI18nDefault {
    if ((this.__NgbDatepickerI18n_67 == null)) { (this.__NgbDatepickerI18n_67 = new import52.NgbDatepickerI18nDefault()); }
    return this.__NgbDatepickerI18n_67;
  }
  get _NgbDateParserFormatter_68():import53.NgbDateISOParserFormatter {
    if ((this.__NgbDateParserFormatter_68 == null)) { (this.__NgbDateParserFormatter_68 = new import53.NgbDateISOParserFormatter()); }
    return this.__NgbDateParserFormatter_68;
  }
  get _NgbDatepickerService_69():import54.NgbDatepickerService {
    if ((this.__NgbDatepickerService_69 == null)) { (this.__NgbDatepickerService_69 = new import54.NgbDatepickerService(this._NgbCalendar_66)); }
    return this.__NgbDatepickerService_69;
  }
  get _NgbDatepickerConfig_70():import55.NgbDatepickerConfig {
    if ((this.__NgbDatepickerConfig_70 == null)) { (this.__NgbDatepickerConfig_70 = new import55.NgbDatepickerConfig()); }
    return this.__NgbDatepickerConfig_70;
  }
  get _NgbDropdownConfig_71():import56.NgbDropdownConfig {
    if ((this.__NgbDropdownConfig_71 == null)) { (this.__NgbDropdownConfig_71 = new import56.NgbDropdownConfig()); }
    return this.__NgbDropdownConfig_71;
  }
  get _NgbPaginationConfig_72():import57.NgbPaginationConfig {
    if ((this.__NgbPaginationConfig_72 == null)) { (this.__NgbPaginationConfig_72 = new import57.NgbPaginationConfig()); }
    return this.__NgbPaginationConfig_72;
  }
  get _NgbPopoverConfig_73():import58.NgbPopoverConfig {
    if ((this.__NgbPopoverConfig_73 == null)) { (this.__NgbPopoverConfig_73 = new import58.NgbPopoverConfig()); }
    return this.__NgbPopoverConfig_73;
  }
  get _NgbRatingConfig_74():import59.NgbRatingConfig {
    if ((this.__NgbRatingConfig_74 == null)) { (this.__NgbRatingConfig_74 = new import59.NgbRatingConfig()); }
    return this.__NgbRatingConfig_74;
  }
  get _NgbTabsetConfig_75():import60.NgbTabsetConfig {
    if ((this.__NgbTabsetConfig_75 == null)) { (this.__NgbTabsetConfig_75 = new import60.NgbTabsetConfig()); }
    return this.__NgbTabsetConfig_75;
  }
  get _NgbTimepickerConfig_76():import61.NgbTimepickerConfig {
    if ((this.__NgbTimepickerConfig_76 == null)) { (this.__NgbTimepickerConfig_76 = new import61.NgbTimepickerConfig()); }
    return this.__NgbTimepickerConfig_76;
  }
  get _ROUTER_CONFIGURATION_77():any {
    if ((this.__ROUTER_CONFIGURATION_77 == null)) { (this.__ROUTER_CONFIGURATION_77 = {}); }
    return this.__ROUTER_CONFIGURATION_77;
  }
  get _LocationStrategy_78():any {
    if ((this.__LocationStrategy_78 == null)) { (this.__LocationStrategy_78 = import5.provideLocationStrategy(this.parent.get(import86.PlatformLocation),this.parent.get(import87.APP_BASE_HREF,(null as any)),this._ROUTER_CONFIGURATION_77)); }
    return this.__LocationStrategy_78;
  }
  get _Location_79():import62.Location {
    if ((this.__Location_79 == null)) { (this.__Location_79 = new import62.Location(this._LocationStrategy_78)); }
    return this.__Location_79;
  }
  get _UrlSerializer_80():import63.DefaultUrlSerializer {
    if ((this.__UrlSerializer_80 == null)) { (this.__UrlSerializer_80 = new import63.DefaultUrlSerializer()); }
    return this.__UrlSerializer_80;
  }
  get _RouterOutletMap_81():import64.RouterOutletMap {
    if ((this.__RouterOutletMap_81 == null)) { (this.__RouterOutletMap_81 = new import64.RouterOutletMap()); }
    return this.__RouterOutletMap_81;
  }
  get _NgModuleFactoryLoader_82():import65.SystemJsNgModuleLoader {
    if ((this.__NgModuleFactoryLoader_82 == null)) { (this.__NgModuleFactoryLoader_82 = new import65.SystemJsNgModuleLoader(this._Compiler_37,this.parent.get(import65.SystemJsNgModuleLoaderConfig,(null as any)))); }
    return this.__NgModuleFactoryLoader_82;
  }
  get _ROUTES_83():any[] {
      if ((this.__ROUTES_83 == null)) { (this.__ROUTES_83 = [[
        {
          path: '',
          redirectTo: 'new/sequence',
          pathMatch: 'full'
        }
        ,
        {
          path: 'response/:sequenceId/:itemId',
          component: import88.SequenceResponseComponent
        }
        ,
        {
          path: 'new/sequence',
          component: import89.SequenceEditorComponent
        }
        ,
        {
          path: 'edit/:sequenceId',
          component: import89.SequenceEditorComponent
        }

      ]
    ]); }
    return this.__ROUTES_83;
  }
  get _Router_84():any {
    if ((this.__Router_84 == null)) { (this.__Router_84 = import5.setupRouter(this._ApplicationRef_36,this._UrlSerializer_80,this._RouterOutletMap_81,this._Location_79,this,this._NgModuleFactoryLoader_82,this._Compiler_37,this._ROUTES_83,this._ROUTER_CONFIGURATION_77,this.parent.get(import90.UrlHandlingStrategy,(null as any)),this.parent.get(import91.RouteReuseStrategy,(null as any)))); }
    return this.__Router_84;
  }
  get _ActivatedRoute_85():any {
    if ((this.__ActivatedRoute_85 == null)) { (this.__ActivatedRoute_85 = import5.rootRoute(this._Router_84)); }
    return this.__ActivatedRoute_85;
  }
  get _PreloadAllModules_89():import66.PreloadAllModules {
    if ((this.__PreloadAllModules_89 == null)) { (this.__PreloadAllModules_89 = new import66.PreloadAllModules()); }
    return this.__PreloadAllModules_89;
  }
  get _ROUTER_INITIALIZER_90():any {
    if ((this.__ROUTER_INITIALIZER_90 == null)) { (this.__ROUTER_INITIALIZER_90 = import5.initialRouterNavigation(this._Router_84,this._ApplicationRef_36,this._RouterPreloader_88,this._ROUTER_CONFIGURATION_77)); }
    return this.__ROUTER_INITIALIZER_90;
  }
  get _APP_BOOTSTRAP_LISTENER_91():any[] {
    if ((this.__APP_BOOTSTRAP_LISTENER_91 == null)) { (this.__APP_BOOTSTRAP_LISTENER_91 = [this._ROUTER_INITIALIZER_90]); }
    return this.__APP_BOOTSTRAP_LISTENER_91;
  }
  get _DragDropConfig_92():import67.DragDropConfig {
    if ((this.__DragDropConfig_92 == null)) { (this.__DragDropConfig_92 = new import67.DragDropConfig()); }
    return this.__DragDropConfig_92;
  }
  get _DragDropService_93():any {
    if ((this.__DragDropService_93 == null)) { (this.__DragDropService_93 = import92.dragDropServiceFactory()); }
    return this.__DragDropService_93;
  }
  get _DragDropSortableService_94():any {
    if ((this.__DragDropSortableService_94 == null)) { (this.__DragDropSortableService_94 = import92.dragDropSortableServiceFactory(this._DragDropConfig_92)); }
    return this.__DragDropSortableService_94;
  }
  createInternal():import1.AppModule {
    this._CommonModule_0 = new import2.CommonModule();
    this._ApplicationModule_1 = new import3.ApplicationModule();
    this._BrowserModule_2 = new import4.BrowserModule(this.parent.get(import4.BrowserModule,(null as any)));
    this._ROUTER_FORROOT_GUARD_3 = import5.provideForRootGuard(this.parent.get(import93.Router,(null as any)));
    this._RouterModule_4 = new import5.RouterModule(this._ROUTER_FORROOT_GUARD_3);
    this._InternalFormsSharedModule_5 = new import6.InternalFormsSharedModule();
    this._FormsModule_6 = new import7.FormsModule();
    this._ReactiveFormsModule_7 = new import7.ReactiveFormsModule();
    this._NgbAlertModule_8 = new import8.NgbAlertModule();
    this._NgbButtonsModule_9 = new import9.NgbButtonsModule();
    this._NgbCollapseModule_10 = new import10.NgbCollapseModule();
    this._NgbProgressbarModule_11 = new import11.NgbProgressbarModule();
    this._NgbTooltipModule_12 = new import12.NgbTooltipModule();
    this._NgbTypeaheadModule_13 = new import13.NgbTypeaheadModule();
    this._NgbAccordionModule_14 = new import14.NgbAccordionModule();
    this._NgbCarouselModule_15 = new import15.NgbCarouselModule();
    this._NgbDatepickerModule_16 = new import16.NgbDatepickerModule();
    this._NgbDropdownModule_17 = new import17.NgbDropdownModule();
    this._NgbModalModule_18 = new import18.NgbModalModule();
    this._NgbPaginationModule_19 = new import19.NgbPaginationModule();
    this._NgbPopoverModule_20 = new import20.NgbPopoverModule();
    this._NgbRatingModule_21 = new import21.NgbRatingModule();
    this._NgbTabsetModule_22 = new import22.NgbTabsetModule();
    this._NgbTimepickerModule_23 = new import23.NgbTimepickerModule();
    this._NgbRootModule_24 = new import24.NgbRootModule();
    this._DndModule_25 = new import25.DndModule();
    this._CustomFormsModule_26 = new import26.CustomFormsModule();
    this._NgbModule_27 = new import24.NgbModule();
    this._ItemResponseModule_28 = new import27.ItemResponseModule();
    this._AppModule_29 = new import1.AppModule();
    this._ErrorHandler_32 = import4.errorHandler();
    this._ApplicationInitStatus_33 = new import29.ApplicationInitStatus(this.parent.get(import29.APP_INITIALIZER,(null as any)));
    this._Testability_34 = new import30.Testability(this.parent.get(import84.NgZone));
    this._ApplicationRef__35 = new import31.ApplicationRef_(this.parent.get(import84.NgZone),this.parent.get(import94.Console),this,this._ErrorHandler_32,this,this._ApplicationInitStatus_33,this.parent.get(import30.TestabilityRegistry,(null as any)),this._Testability_34);
    this._DomSharedStylesHost_43 = new import35.DomSharedStylesHost(this._DOCUMENT_39);
    this._NoPreloading_86 = new import66.NoPreloading();
    this._PreloadingStrategy_87 = this._NoPreloading_86;
    this._RouterPreloader_88 = new import66.RouterPreloader(this._Router_84,this._NgModuleFactoryLoader_82,this._Compiler_37,this,this._PreloadingStrategy_87);
    return this._AppModule_29;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.CommonModule)) { return this._CommonModule_0; }
    if ((token === import3.ApplicationModule)) { return this._ApplicationModule_1; }
    if ((token === import4.BrowserModule)) { return this._BrowserModule_2; }
    if ((token === import5.ROUTER_FORROOT_GUARD)) { return this._ROUTER_FORROOT_GUARD_3; }
    if ((token === import5.RouterModule)) { return this._RouterModule_4; }
    if ((token === import6.InternalFormsSharedModule)) { return this._InternalFormsSharedModule_5; }
    if ((token === import7.FormsModule)) { return this._FormsModule_6; }
    if ((token === import7.ReactiveFormsModule)) { return this._ReactiveFormsModule_7; }
    if ((token === import8.NgbAlertModule)) { return this._NgbAlertModule_8; }
    if ((token === import9.NgbButtonsModule)) { return this._NgbButtonsModule_9; }
    if ((token === import10.NgbCollapseModule)) { return this._NgbCollapseModule_10; }
    if ((token === import11.NgbProgressbarModule)) { return this._NgbProgressbarModule_11; }
    if ((token === import12.NgbTooltipModule)) { return this._NgbTooltipModule_12; }
    if ((token === import13.NgbTypeaheadModule)) { return this._NgbTypeaheadModule_13; }
    if ((token === import14.NgbAccordionModule)) { return this._NgbAccordionModule_14; }
    if ((token === import15.NgbCarouselModule)) { return this._NgbCarouselModule_15; }
    if ((token === import16.NgbDatepickerModule)) { return this._NgbDatepickerModule_16; }
    if ((token === import17.NgbDropdownModule)) { return this._NgbDropdownModule_17; }
    if ((token === import18.NgbModalModule)) { return this._NgbModalModule_18; }
    if ((token === import19.NgbPaginationModule)) { return this._NgbPaginationModule_19; }
    if ((token === import20.NgbPopoverModule)) { return this._NgbPopoverModule_20; }
    if ((token === import21.NgbRatingModule)) { return this._NgbRatingModule_21; }
    if ((token === import22.NgbTabsetModule)) { return this._NgbTabsetModule_22; }
    if ((token === import23.NgbTimepickerModule)) { return this._NgbTimepickerModule_23; }
    if ((token === import24.NgbRootModule)) { return this._NgbRootModule_24; }
    if ((token === import25.DndModule)) { return this._DndModule_25; }
    if ((token === import26.CustomFormsModule)) { return this._CustomFormsModule_26; }
    if ((token === import24.NgbModule)) { return this._NgbModule_27; }
    if ((token === import27.ItemResponseModule)) { return this._ItemResponseModule_28; }
    if ((token === import1.AppModule)) { return this._AppModule_29; }
    if ((token === import80.LOCALE_ID)) { return this._LOCALE_ID_30; }
    if ((token === import28.NgLocalization)) { return this._NgLocalization_31; }
    if ((token === import95.ErrorHandler)) { return this._ErrorHandler_32; }
    if ((token === import29.ApplicationInitStatus)) { return this._ApplicationInitStatus_33; }
    if ((token === import30.Testability)) { return this._Testability_34; }
    if ((token === import31.ApplicationRef_)) { return this._ApplicationRef__35; }
    if ((token === import31.ApplicationRef)) { return this._ApplicationRef_36; }
    if ((token === import32.Compiler)) { return this._Compiler_37; }
    if ((token === import81.APP_ID)) { return this._APP_ID_38; }
    if ((token === import96.DOCUMENT)) { return this._DOCUMENT_39; }
    if ((token === import33.HAMMER_GESTURE_CONFIG)) { return this._HAMMER_GESTURE_CONFIG_40; }
    if ((token === import34.EVENT_MANAGER_PLUGINS)) { return this._EVENT_MANAGER_PLUGINS_41; }
    if ((token === import34.EventManager)) { return this._EventManager_42; }
    if ((token === import35.DomSharedStylesHost)) { return this._DomSharedStylesHost_43; }
    if ((token === import97.AnimationDriver)) { return this._AnimationDriver_44; }
    if ((token === import36.DomRootRenderer)) { return this._DomRootRenderer_45; }
    if ((token === import31.NgProbeToken)) { return this._NgProbeToken_46; }
    if ((token === import98.RootRenderer)) { return this._RootRenderer_47; }
    if ((token === import37.DomSanitizer)) { return this._DomSanitizer_48; }
    if ((token === import99.Sanitizer)) { return this._Sanitizer_49; }
    if ((token === import38.AnimationQueue)) { return this._AnimationQueue_50; }
    if ((token === import39.ViewUtils)) { return this._ViewUtils_51; }
    if ((token === import100.IterableDiffers)) { return this._IterableDiffers_52; }
    if ((token === import101.KeyValueDiffers)) { return this._KeyValueDiffers_53; }
    if ((token === import35.SharedStylesHost)) { return this._SharedStylesHost_54; }
    if ((token === import40.Title)) { return this._Title_55; }
    if ((token === import41.RadioControlRegistry)) { return this._RadioControlRegistry_56; }
    if ((token === import42.FormBuilder)) { return this._FormBuilder_57; }
    if ((token === import43.NgbModalStack)) { return this._NgbModalStack_58; }
    if ((token === import44.NgbModal)) { return this._NgbModal_59; }
    if ((token === import45.NgbAlertConfig)) { return this._NgbAlertConfig_60; }
    if ((token === import46.NgbProgressbarConfig)) { return this._NgbProgressbarConfig_61; }
    if ((token === import47.NgbTooltipConfig)) { return this._NgbTooltipConfig_62; }
    if ((token === import48.NgbTypeaheadConfig)) { return this._NgbTypeaheadConfig_63; }
    if ((token === import49.NgbAccordionConfig)) { return this._NgbAccordionConfig_64; }
    if ((token === import50.NgbCarouselConfig)) { return this._NgbCarouselConfig_65; }
    if ((token === import51.NgbCalendar)) { return this._NgbCalendar_66; }
    if ((token === import52.NgbDatepickerI18n)) { return this._NgbDatepickerI18n_67; }
    if ((token === import53.NgbDateParserFormatter)) { return this._NgbDateParserFormatter_68; }
    if ((token === import54.NgbDatepickerService)) { return this._NgbDatepickerService_69; }
    if ((token === import55.NgbDatepickerConfig)) { return this._NgbDatepickerConfig_70; }
    if ((token === import56.NgbDropdownConfig)) { return this._NgbDropdownConfig_71; }
    if ((token === import57.NgbPaginationConfig)) { return this._NgbPaginationConfig_72; }
    if ((token === import58.NgbPopoverConfig)) { return this._NgbPopoverConfig_73; }
    if ((token === import59.NgbRatingConfig)) { return this._NgbRatingConfig_74; }
    if ((token === import60.NgbTabsetConfig)) { return this._NgbTabsetConfig_75; }
    if ((token === import61.NgbTimepickerConfig)) { return this._NgbTimepickerConfig_76; }
    if ((token === import5.ROUTER_CONFIGURATION)) { return this._ROUTER_CONFIGURATION_77; }
    if ((token === import87.LocationStrategy)) { return this._LocationStrategy_78; }
    if ((token === import62.Location)) { return this._Location_79; }
    if ((token === import63.UrlSerializer)) { return this._UrlSerializer_80; }
    if ((token === import64.RouterOutletMap)) { return this._RouterOutletMap_81; }
    if ((token === import102.NgModuleFactoryLoader)) { return this._NgModuleFactoryLoader_82; }
    if ((token === import103.ROUTES)) { return this._ROUTES_83; }
    if ((token === import93.Router)) { return this._Router_84; }
    if ((token === import104.ActivatedRoute)) { return this._ActivatedRoute_85; }
    if ((token === import66.NoPreloading)) { return this._NoPreloading_86; }
    if ((token === import66.PreloadingStrategy)) { return this._PreloadingStrategy_87; }
    if ((token === import66.RouterPreloader)) { return this._RouterPreloader_88; }
    if ((token === import66.PreloadAllModules)) { return this._PreloadAllModules_89; }
    if ((token === import5.ROUTER_INITIALIZER)) { return this._ROUTER_INITIALIZER_90; }
    if ((token === import81.APP_BOOTSTRAP_LISTENER)) { return this._APP_BOOTSTRAP_LISTENER_91; }
    if ((token === import67.DragDropConfig)) { return this._DragDropConfig_92; }
    if ((token === import92.DragDropService)) { return this._DragDropService_93; }
    if ((token === import92.DragDropSortableService)) { return this._DragDropSortableService_94; }
    return notFoundResult;
  }
  destroyInternal():void {
    this._ApplicationRef__35.ngOnDestroy();
    this._DomSharedStylesHost_43.ngOnDestroy();
    this._RouterPreloader_88.ngOnDestroy();
  }
}
export const AppModuleNgFactory:import0.NgModuleFactory<import1.AppModule> = new import0.NgModuleFactory(AppModuleInjector,import1.AppModule);