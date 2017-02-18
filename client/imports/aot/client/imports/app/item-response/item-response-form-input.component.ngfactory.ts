/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../../app/item-response/item-response-form-input.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '../../../../node_modules/@angular/forms/src/directives/reactive_directives/form_group_directive.ngfactory';
import * as import10 from '../../../../node_modules/@angular/forms/src/directives/ng_control_status.ngfactory';
import * as import11 from '../../../../node_modules/@angular/forms/src/directives/default_value_accessor.ngfactory';
import * as import12 from '../../../../node_modules/@angular/forms/src/directives/reactive_directives/form_control_name.ngfactory';
import * as import13 from '@angular/core/src/linker/element_ref';
import * as import14 from '@angular/forms/src/directives/default_value_accessor';
import * as import15 from '@angular/forms/src/directives/control_value_accessor';
import * as import16 from '@angular/forms/src/directives/reactive_directives/form_control_name';
import * as import17 from '@angular/forms/src/directives/ng_control';
import * as import18 from '@angular/forms/src/directives/ng_control_status';
import * as import19 from '@angular/forms/src/directives/reactive_directives/form_group_directive';
import * as import20 from '@angular/forms/src/directives/control_container';
export class Wrapper_ItemResponseFormInputComponent {
  /*private*/ _eventHandler:Function;
  context:import0.ItemResponseFormInputComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  subscription0:any;
  constructor() {
    this._changed = false;
    this.context = new import0.ItemResponseFormInputComponent();
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
    this._expr_4 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    (this.subscription0 && this.subscription0.unsubscribe());
  }
  check_controlName(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.controlName = currValue;
      this._expr_0 = currValue;
    }
  }
  check_inputId(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.inputId = currValue;
      this._expr_1 = currValue;
    }
  }
  check_inputType(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_2,currValue))) {
      this._changed = true;
      this.context.inputType = currValue;
      this._expr_2 = currValue;
    }
  }
  check_describedby(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_3,currValue))) {
      this._changed = true;
      this.context.describedby = currValue;
      this._expr_3 = currValue;
    }
  }
  check_formGroup(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_4,currValue))) {
      this._changed = true;
      this.context.formGroup = currValue;
      this._expr_4 = currValue;
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
var renderType_ItemResponseFormInputComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_ItemResponseFormInputComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.ItemResponseFormInputComponent>;
  _ItemResponseFormInputComponent_0_3:Wrapper_ItemResponseFormInputComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ItemResponseFormInputComponent_Host0,renderType_ItemResponseFormInputComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'item-response-form-input',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_ItemResponseFormInputComponent0(this.viewUtils,this,0,this._el_0);
    this._ItemResponseFormInputComponent_0_3 = new Wrapper_ItemResponseFormInputComponent();
    this.compView_0.create(this._ItemResponseFormInputComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._ItemResponseFormInputComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.ItemResponseFormInputComponent) && (0 === requestNodeIndex))) { return this._ItemResponseFormInputComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._ItemResponseFormInputComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._ItemResponseFormInputComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const ItemResponseFormInputComponentNgFactory:import8.ComponentFactory<import0.ItemResponseFormInputComponent> = new import8.ComponentFactory<import0.ItemResponseFormInputComponent>('item-response-form-input',View_ItemResponseFormInputComponent_Host0,import0.ItemResponseFormInputComponent);
const styles_ItemResponseFormInputComponent:any[] = ([] as any[]);
var renderType_ItemResponseFormInputComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_ItemResponseFormInputComponent,{});
export class View_ItemResponseFormInputComponent0 extends import2.AppView<import0.ItemResponseFormInputComponent> {
  _el_0:any;
  _FormGroupDirective_0_3:import9.Wrapper_FormGroupDirective;
  _ControlContainer_0_4:any;
  _NgControlStatusGroup_0_5:import10.Wrapper_NgControlStatusGroup;
  _text_1:any;
  _el_2:any;
  _DefaultValueAccessor_2_3:import11.Wrapper_DefaultValueAccessor;
  _NG_VALUE_ACCESSOR_2_4:any[];
  _FormControlName_2_5:import12.Wrapper_FormControlName;
  _NgControl_2_6:any;
  _NgControlStatus_2_7:import10.Wrapper_NgControlStatus;
  _text_3:any;
  /*private*/ _expr_12:any;
  /*private*/ _expr_13:any;
  /*private*/ _expr_14:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_ItemResponseFormInputComponent0,renderType_ItemResponseFormInputComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
    this._expr_12 = import1.UNINITIALIZED;
    this._expr_13 = import1.UNINITIALIZED;
    this._expr_14 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._FormGroupDirective_0_3 = new import9.Wrapper_FormGroupDirective((null as any),(null as any));
    this._ControlContainer_0_4 = this._FormGroupDirective_0_3.context;
    this._NgControlStatusGroup_0_5 = new import10.Wrapper_NgControlStatusGroup(this._ControlContainer_0_4);
    this._text_1 = this.renderer.createText(this._el_0,'\n    ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'input',new import3.InlineArray2(2,'class','form-control'),(null as any));
    this._DefaultValueAccessor_2_3 = new import11.Wrapper_DefaultValueAccessor(this.renderer,new import13.ElementRef(this._el_2));
    this._NG_VALUE_ACCESSOR_2_4 = [this._DefaultValueAccessor_2_3.context];
    this._FormControlName_2_5 = new import12.Wrapper_FormControlName(this._ControlContainer_0_4,(null as any),(null as any),this._NG_VALUE_ACCESSOR_2_4);
    this._NgControl_2_6 = this._FormControlName_2_5.context;
    this._NgControlStatus_2_7 = new import10.Wrapper_NgControlStatus(this._NgControl_2_6);
    this._text_3 = this.renderer.createText(this._el_0,'\n',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_0,new import3.InlineArray4(4,'submit',(null as any),'reset',(null as any)),this.eventHandler(this.handleEvent_0));
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_2,new import3.InlineArray4(4,'input',(null as any),'blur',(null as any)),this.eventHandler(this.handleEvent_2));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3
    ]
    ),[
      disposable_0,
      disposable_1
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import14.DefaultValueAccessor) && (2 === requestNodeIndex))) { return this._DefaultValueAccessor_2_3.context; }
    if (((token === import15.NG_VALUE_ACCESSOR) && (2 === requestNodeIndex))) { return this._NG_VALUE_ACCESSOR_2_4; }
    if (((token === import16.FormControlName) && (2 === requestNodeIndex))) { return this._FormControlName_2_5.context; }
    if (((token === import17.NgControl) && (2 === requestNodeIndex))) { return this._NgControl_2_6; }
    if (((token === import18.NgControlStatus) && (2 === requestNodeIndex))) { return this._NgControlStatus_2_7.context; }
    if (((token === import19.FormGroupDirective) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 3)))) { return this._FormGroupDirective_0_3.context; }
    if (((token === import20.ControlContainer) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 3)))) { return this._ControlContainer_0_4; }
    if (((token === import18.NgControlStatusGroup) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 3)))) { return this._NgControlStatusGroup_0_5.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_0_0_0:any = this.context.formGroup;
    this._FormGroupDirective_0_3.check_form(currVal_0_0_0,throwOnChange,false);
    this._FormGroupDirective_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this._NgControlStatusGroup_0_5.ngDoCheck(this,this._el_0,throwOnChange);
    this._DefaultValueAccessor_2_3.ngDoCheck(this,this._el_2,throwOnChange);
    const currVal_2_1_0:any = this.context.controlName;
    this._FormControlName_2_5.check_name(currVal_2_1_0,throwOnChange,false);
    this._FormControlName_2_5.ngDoCheck(this,this._el_2,throwOnChange);
    this._NgControlStatus_2_7.ngDoCheck(this,this._el_2,throwOnChange);
    this._NgControlStatusGroup_0_5.checkHost(this,this,this._el_0,throwOnChange);
    const currVal_12:any = this.context.inputType;
    if (import3.checkBinding(throwOnChange,this._expr_12,currVal_12)) {
      this.renderer.setElementProperty(this._el_2,'type',currVal_12);
      this._expr_12 = currVal_12;
    }
    const currVal_13:any = this.context.inputId;
    if (import3.checkBinding(throwOnChange,this._expr_13,currVal_13)) {
      this.renderer.setElementProperty(this._el_2,'id',currVal_13);
      this._expr_13 = currVal_13;
    }
    const currVal_14:any = this.context.describedby;
    if (import3.checkBinding(throwOnChange,this._expr_14,currVal_14)) {
      this.renderer.setElementAttribute(this._el_2,'aria-describedby',((currVal_14 == null)? (null as any): currVal_14.toString()));
      this._expr_14 = currVal_14;
    }
    this._NgControlStatus_2_7.checkHost(this,this,this._el_2,throwOnChange);
  }
  destroyInternal():void {
    this._FormControlName_2_5.ngOnDestroy();
    this._FormGroupDirective_0_3.ngOnDestroy();
  }
  handleEvent_0(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._FormGroupDirective_0_3.handleEvent(eventName,$event) && result);
    return result;
  }
  handleEvent_2(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._DefaultValueAccessor_2_3.handleEvent(eventName,$event) && result);
    return result;
  }
}