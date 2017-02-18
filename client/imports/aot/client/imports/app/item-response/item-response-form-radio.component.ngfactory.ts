/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../app/item-response/item-response-form-radio.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '../../../../node_modules/@angular/forms/src/directives/default_value_accessor.ngfactory';
import * as import10 from '../../../../node_modules/@angular/forms/src/directives/radio_control_value_accessor.ngfactory';
import * as import11 from '../../../../node_modules/@angular/forms/src/directives/reactive_directives/form_control_name.ngfactory';
import * as import12 from '../../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import13 from '../../../../node_modules/@ng-bootstrap/ng-bootstrap/buttons/radio.ngfactory';
import * as import14 from '@angular/core/src/linker/view_container';
import * as import15 from '@angular/core/src/linker/element_ref';
import * as import16 from '@angular/forms/src/directives/radio_control_value_accessor';
import * as import17 from '@ng-bootstrap/ng-bootstrap/buttons/radio';
import * as import18 from '@angular/forms/src/directives/default_value_accessor';
import * as import19 from '@angular/forms/src/directives/control_value_accessor';
import * as import20 from '@angular/forms/src/directives/reactive_directives/form_control_name';
import * as import21 from '@angular/forms/src/directives/ng_control';
import * as import22 from '@angular/forms/src/directives/ng_control_status';
import * as import23 from '../../../../node_modules/@angular/forms/src/directives/reactive_directives/form_group_directive.ngfactory';
import * as import24 from '../../../../node_modules/@angular/common/src/directives/ng_for.ngfactory';
import * as import25 from '@angular/core/src/linker/template_ref';
import * as import26 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import27 from '@angular/common/src/directives/ng_for';
import * as import28 from '@angular/forms/src/directives/reactive_directives/form_group_directive';
import * as import29 from '@angular/forms/src/directives/control_container';
export class Wrapper_ItemResponseFormRadioComponent {
  /*private*/ _eventHandler:Function;
  context:import0.ItemResponseFormRadioComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  /*private*/ _expr_5:any;
  subscription0:any;
  constructor() {
    this._changed = false;
    this.context = new import0.ItemResponseFormRadioComponent();
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
    this._expr_4 = import1.UNINITIALIZED;
    this._expr_5 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    (this.subscription0 && this.subscription0.unsubscribe());
  }
  check_choices(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.choices = currValue;
      this._expr_0 = currValue;
    }
  }
  check_controlName(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.controlName = currValue;
      this._expr_1 = currValue;
    }
  }
  check_inputId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_2,currValue))) {
      this._changed = true;
      this.context.inputId = currValue;
      this._expr_2 = currValue;
    }
  }
  check_inputType(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_3,currValue))) {
      this._changed = true;
      this.context.inputType = currValue;
      this._expr_3 = currValue;
    }
  }
  check_describedby(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_4,currValue))) {
      this._changed = true;
      this.context.describedby = currValue;
      this._expr_4 = currValue;
    }
  }
  check_formGroup(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_5,currValue))) {
      this._changed = true;
      this.context.formGroup = currValue;
      this._expr_5 = currValue;
    }
  }
  ngDoCheck(view:import2.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    return changed;
  }
  checkHost(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any,throwOnChange:boolean):void {
  }
  handleEvent(eventName:string,$event:any):boolean {
    var result:boolean = true;
    return result;
  }
  subscribe(view:import2.AppView<any>,_eventHandler:any,emit0:boolean):void {
    this._eventHandler = _eventHandler;
    if (emit0) { (this.subscription0 = this.context.submitCall.subscribe(_eventHandler.bind(view,'submitCall'))); }
  }
}
var renderType_ItemResponseFormRadioComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_ItemResponseFormRadioComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.ItemResponseFormRadioComponent>;
  _ItemResponseFormRadioComponent_0_3:Wrapper_ItemResponseFormRadioComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ItemResponseFormRadioComponent_Host0,renderType_ItemResponseFormRadioComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'item-response-form-radio',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_ItemResponseFormRadioComponent0(this.viewUtils,this,0,this._el_0);
    this._ItemResponseFormRadioComponent_0_3 = new Wrapper_ItemResponseFormRadioComponent();
    this.compView_0.create(this._ItemResponseFormRadioComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._ItemResponseFormRadioComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.ItemResponseFormRadioComponent) && (0 === requestNodeIndex))) { return this._ItemResponseFormRadioComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._ItemResponseFormRadioComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._ItemResponseFormRadioComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const ItemResponseFormRadioComponentNgFactory:import8.ComponentFactory<import0.ItemResponseFormRadioComponent> = new import8.ComponentFactory<import0.ItemResponseFormRadioComponent>('item-response-form-radio',View_ItemResponseFormRadioComponent_Host0,import0.ItemResponseFormRadioComponent);
const styles_ItemResponseFormRadioComponent:any[] = ([] as any[]);
class View_ItemResponseFormRadioComponent1 extends import2.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _text_3:any;
  _el_4:any;
  _DefaultValueAccessor_4_3:import9.Wrapper_DefaultValueAccessor;
  _RadioControlValueAccessor_4_4:import10.Wrapper_RadioControlValueAccessor;
  _NG_VALUE_ACCESSOR_4_5:any[];
  _FormControlName_4_6:import11.Wrapper_FormControlName;
  _NgControl_4_7:any;
  _NgControlStatus_4_8:import12.Wrapper_NgControlStatus;
  _NgbRadio_4_9:import13.Wrapper_NgbRadio;
  _text_5:any;
  _text_6:any;
  /*private*/ _expr_14:any;
  /*private*/ _expr_15:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import14.ViewContainer) {
    super(View_ItemResponseFormRadioComponent1,renderType_ItemResponseFormRadioComponent,import6.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_14 = import1.UNINITIALIZED;
    this._expr_15 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'div',new import3.InlineArray2(2,'class','form-check'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'label',new import3.InlineArray2(2,'class','form-check-label'),(null as any));
    this._text_3 = this.renderer.createText(this._el_2,'\n            ',(null as any));
    this._el_4 = import3.createRenderElement(this.renderer,this._el_2,'input',new import3.InlineArray4(4,'class','form-check-input','type','radio'),(null as any));
    this._DefaultValueAccessor_4_3 = new import9.Wrapper_DefaultValueAccessor(this.renderer,new import15.ElementRef(this._el_4));
    this._RadioControlValueAccessor_4_4 = new import10.Wrapper_RadioControlValueAccessor(this.renderer,new import15.ElementRef(this._el_4),this.parentView.parentView.injectorGet(import16.RadioControlRegistry,this.parentView.parentIndex),this.injector(4));
    this._NG_VALUE_ACCESSOR_4_5 = [
      this._DefaultValueAccessor_4_3.context,
      this._RadioControlValueAccessor_4_4.context
    ]
    ;
    this._FormControlName_4_6 = new import11.Wrapper_FormControlName((<View_ItemResponseFormRadioComponent0>this.parentView)._ControlContainer_0_4,(null as any),(null as any),this._NG_VALUE_ACCESSOR_4_5);
    this._NgControl_4_7 = this._FormControlName_4_6.context;
    this._NgControlStatus_4_8 = new import12.Wrapper_NgControlStatus(this._NgControl_4_7);
    this._NgbRadio_4_9 = new import13.Wrapper_NgbRadio(this.parentView.parentView.injectorGet(import17.NgbRadioGroup,this.parentView.parentIndex,(null as any)),this.parentView.parentView.injectorGet(import17.NgbActiveLabel,this.parentView.parentIndex,(null as any)),this.renderer,new import15.ElementRef(this._el_4));
    this._text_5 = this.renderer.createText(this._el_2,'',(null as any));
    this._text_6 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_4,new import3.InlineArray8(8,'input',(null as any),'blur',(null as any),'change',(null as any),'focus',(null as any)),this.eventHandler(this.handleEvent_4));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._text_6
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import18.DefaultValueAccessor) && (4 === requestNodeIndex))) { return this._DefaultValueAccessor_4_3.context; }
    if (((token === import16.RadioControlValueAccessor) && (4 === requestNodeIndex))) { return this._RadioControlValueAccessor_4_4.context; }
    if (((token === import19.NG_VALUE_ACCESSOR) && (4 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_4_5; }
    if (((token === import20.FormControlName) && (4 === requestNodeIndex))) { return this._FormControlName_4_6.context; }
    if (((token === import21.NgControl) && (4 === requestNodeIndex))) { return this._NgControl_4_7; }
    if (((token === import22.NgControlStatus) && (4 === requestNodeIndex))) { return this._NgControlStatus_4_8.context; }
    if (((token === import17.NgbRadio) && (4 === requestNodeIndex))) { return this._NgbRadio_4_9.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._DefaultValueAccessor_4_3.ngDoCheck(this,this._el_4,throwOnChange);
    const currVal_4_1_0:any = this.parentView.context.controlName;
    this._RadioControlValueAccessor_4_4.check_formControlName(currVal_4_1_0,throwOnChange,false);
    const currVal_4_1_1:any = this.context.$implicit.name;
    this._RadioControlValueAccessor_4_4.check_value(currVal_4_1_1,throwOnChange,false);
    this._RadioControlValueAccessor_4_4.ngDoCheck(this,this._el_4,throwOnChange);
    const currVal_4_2_0:any = this.parentView.context.controlName;
    this._FormControlName_4_6.check_name(currVal_4_2_0,throwOnChange,false);
    this._FormControlName_4_6.ngDoCheck(this,this._el_4,throwOnChange);
    this._NgControlStatus_4_8.ngDoCheck(this,this._el_4,throwOnChange);
    const currVal_4_4_0:any = this.context.$implicit.name;
    this._NgbRadio_4_9.check_value(currVal_4_4_0,throwOnChange,false);
    this._NgbRadio_4_9.ngDoCheck(this,this._el_4,throwOnChange);
    const currVal_14:any = this.parentView.context.describedby;
    if (import3.checkBinding(throwOnChange,this._expr_14,currVal_14)) {
      this.renderer.setElementAttribute(this._el_4,'aria-describedby',((currVal_14 == null)? (null as any): currVal_14.toString()));
      this._expr_14 = currVal_14;
    }
    this._NgControlStatus_4_8.checkHost(this,this,this._el_4,throwOnChange);
    this._NgbRadio_4_9.checkHost(this,this,this._el_4,throwOnChange);
    const currVal_15:any = import3.inlineInterpolate(1,'\n            ',this.context.$implicit.label,'\n        ');
    if (import3.checkBinding(throwOnChange,this._expr_15,currVal_15)) {
      this.renderer.setText(this._text_5,currVal_15);
      this._expr_15 = currVal_15;
    }
  }
  destroyInternal():void {
    this._RadioControlValueAccessor_4_4.ngOnDestroy();
    this._FormControlName_4_6.ngOnDestroy();
    this._NgbRadio_4_9.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  handleEvent_4(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_4_3.handleEvent(eventName,$event) && result);
    result = (this._RadioControlValueAccessor_4_4.handleEvent(eventName,$event) && result);
    result = (this._NgbRadio_4_9.handleEvent(eventName,$event) && result);
    return result;
  }
}
var renderType_ItemResponseFormRadioComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_ItemResponseFormRadioComponent,{});
export class View_ItemResponseFormRadioComponent0 extends import2.AppView<import0.ItemResponseFormRadioComponent> {
  _el_0:any;
  _FormGroupDirective_0_3:import23.Wrapper_FormGroupDirective;
  _ControlContainer_0_4:any;
  _NgControlStatusGroup_0_5:import12.Wrapper_NgControlStatusGroup;
  _text_1:any;
  _text_2:any;
  _anchor_3:any;
  /*private*/ _vc_3:import14.ViewContainer;
  _TemplateRef_3_5:any;
  _NgFor_3_6:import24.Wrapper_NgFor;
  _text_4:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ItemResponseFormRadioComponent0,renderType_ItemResponseFormRadioComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._FormGroupDirective_0_3 = new import23.Wrapper_FormGroupDirective((null as any),(null as any));
    this._ControlContainer_0_4 = this._FormGroupDirective_0_3.context;
    this._NgControlStatusGroup_0_5 = new import12.Wrapper_NgControlStatusGroup(this._ControlContainer_0_4);
    this._text_1 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this._text_2 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this._anchor_3 = this.renderer.createTemplateAnchor(this._el_0,(null as any));
    this._vc_3 = new import14.ViewContainer(3,0,this,this._anchor_3);
    this._TemplateRef_3_5 = new import25.TemplateRef_(this,3,this._anchor_3);
    this._NgFor_3_6 = new import24.Wrapper_NgFor(this._vc_3.vcRef,this._TemplateRef_3_5,this.parentView.injectorGet(import26.IterableDiffers,this.parentIndex),this.ref);
    this._text_4 = this.renderer.createText(this._el_0,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_0,new import3.InlineArray4(4,'submit',(null as any),'reset',(null as any)),this.eventHandler(this.handleEvent_0));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._text_2,
      this._anchor_3,
      this._text_4
    ]
    ),[disposable_0]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import25.TemplateRef) && (3 === requestNodeIndex))) { return this._TemplateRef_3_5; }
    if (((token === import27.NgFor) && (3 === requestNodeIndex))) { return this._NgFor_3_6.context; }
    if (((token === import28.FormGroupDirective) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 4)))) { return this._FormGroupDirective_0_3.context; }
    if (((token === import29.ControlContainer) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 4)))) { return this._ControlContainer_0_4; }
    if (((token === import22.NgControlStatusGroup) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 4)))) { return this._NgControlStatusGroup_0_5.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = this.context.formGroup;
    this._FormGroupDirective_0_3.check_form(currVal_0_0_0,throwOnChange,false);
    this._FormGroupDirective_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this._NgControlStatusGroup_0_5.ngDoCheck(this,this._el_0,throwOnChange);
    const currVal_3_0_0:any = this.context.choices;
    this._NgFor_3_6.check_ngForOf(currVal_3_0_0,throwOnChange,false);
    this._NgFor_3_6.ngDoCheck(this,this._anchor_3,throwOnChange);
    this._vc_3.detectChangesInNestedViews(throwOnChange);
    this._NgControlStatusGroup_0_5.checkHost(this,this,this._el_0,throwOnChange);
  }
  destroyInternal():void {
    this._vc_3.destroyNestedViews();
    this._FormGroupDirective_0_3.ngOnDestroy();
  }
  createEmbeddedViewInternal(nodeIndex:number):import2.AppView<any> {
    if ((nodeIndex == 3)) { return new View_ItemResponseFormRadioComponent1(this.viewUtils,this,3,this._anchor_3,this._vc_3); }
    return (null as any);
  }
  handleEvent_0(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._FormGroupDirective_0_3.handleEvent(eventName,$event) && result);
    return result;
  }
}