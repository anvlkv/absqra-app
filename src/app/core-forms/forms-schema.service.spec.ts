import { TestBed, inject, async} from '@angular/core/testing';
import { FormConfig, FormsSchemaService } from './forms-schema.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { mockResponseService } from '../api/response.service.mock';
import { instance, spy } from 'ts-mockito';
import { ResponseService } from '../api/response.service';
import { QuantityOrder } from '../../models/enums/item.enums';
import {
  META_VALUE_ValidationTypes, TYPE_ValidationTypes,
  ValidationTypes, VALUE_ValidationTypes,
} from '../../models/enums/formatConstraint.enums';



describe('FormsSchemaService', () => {
  let rsmock;
  beforeEach(() => {
    rsmock = mockResponseService();
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        FormsSchemaService,
        {
          provide: ResponseService,
          useValue: instance(rsmock)
        }
      ]
    });
  });

  it('should be created', inject([FormsSchemaService], (service: FormsSchemaService) => {
    expect(service).toBeTruthy();
  }));


  describe('with no matter what config', () => {
    beforeEach(inject([FormsSchemaService, ResponseService], (service, response) => {
      response.nextStep().subscribe((step) => {
        service.questionnaire = step.item;
      });
    }));

    it('should set its questionnaire', inject([FormsSchemaService], (service: FormsSchemaService) => {
      expect(service.questionnaire).toBeTruthy();
    }));

    it('should generate formGroup', inject([FormsSchemaService], (service: FormsSchemaService) => {
      service.getFg().subscribe((fg) => {
        expect(fg instanceof FormGroup).toBeTruthy()
      });
    }));

    it('should generate config', inject([FormsSchemaService], (service: FormsSchemaService) => {
      service.getConfig().subscribe((conf) => {
        expect(conf instanceof FormConfig).toBeTruthy()
      });
    }));

    it('should update config when input changes', inject([FormsSchemaService, ResponseService], (service: FormsSchemaService, response) => {

      const subscriber =  {
        spy: function () {}
      };

      spyOn(subscriber, 'spy');

      service.getConfig().subscribe(subscriber.spy);

      response.nextStep().subscribe(() => {
        async(() => {
          expect((<any>subscriber.spy).calls.count()).toEqual(2);
        })
      });
    }));

    it('should update formGroup when input changes', inject([FormsSchemaService, ResponseService], (service: FormsSchemaService, response) => {
      const subscriber =  {
        spy: function () {}
      };

      spyOn(subscriber, 'spy');

      service.getFg().subscribe(subscriber.spy);

      response.nextStep().subscribe(() => {
        async(() => {
          expect((<any>subscriber.spy).calls.count()).toEqual(2);
        })
      });
    }));
  });


  describe('config and group', () => {
    it('should add text input in config and group', inject([FormsSchemaService], (service: FormsSchemaService) => {
      service.questionnaire = {
        expects: QuantityOrder.ONE,
        offers: QuantityOrder.NONE,
        name: 'item name'
      };

      service.getConfig().subscribe(config => {
        expect(config.inputs[0].type).toEqual('text');
        expect(config.inputs.length).toEqual(1);
      });

      service.getFg().subscribe(fg => {
        expect(fg.controls[service.questionnaire.name]).toBeTruthy();
        expect(Object.keys(fg.controls).length).toEqual(1);
      });
    }));

    it('should not have validators', inject([FormsSchemaService], (service: FormsSchemaService) => {
      service.questionnaire = {
        expects: QuantityOrder.ONE,
        offers: QuantityOrder.NONE,
        name: 'item name'
      };

      service.getConfig().subscribe(config => {
        expect(config.inputs[0].required).toBeFalsy();
        expect(config.inputs[0].min).toBeFalsy();
        expect(config.inputs[0].max).toBeFalsy();
      });

      service.getFg().subscribe(fg => {
        expect(fg.controls[service.questionnaire.name].validator).toBeFalsy();
      });
    }));

    it('should add input of different type in config and group', inject([FormsSchemaService], (service: FormsSchemaService) => {
      service.questionnaire = {
        expects: QuantityOrder.ONE,
        offers: QuantityOrder.NONE,
        name: 'item name',
        formatConstraints: [
          {
            validationType: ValidationTypes.TYPE,
            validationSubType: TYPE_ValidationTypes.IS_NUMBER,
            booleanConstraint: true
          }
        ]
      };

      service.getConfig().subscribe(config => {
        expect(config.inputs[0].type).toEqual('number');
        expect(config.inputs.length).toEqual(1);
      });

      service.getFg().subscribe(fg => {
        expect(fg.controls[service.questionnaire.name]).toBeTruthy();
        expect(Object.keys(fg.controls).length).toEqual(1);
      });
    }));

    it('should add validator and required attribute in config and group', inject([FormsSchemaService], (service: FormsSchemaService) => {
      service.questionnaire = {
        expects: QuantityOrder.ONE,
        offers: QuantityOrder.NONE,
        name: 'item name',
        formatConstraints: [
          {
            validationType: ValidationTypes.TYPE,
            validationSubType: TYPE_ValidationTypes.IS_NUMBER,
            booleanConstraint: true
          },
          {
            validationType: ValidationTypes.META_VALUE,
            validationSubType: META_VALUE_ValidationTypes.EXISTS,
            booleanConstraint: true
          }
        ]
      };
      service.getConfig().subscribe(config => {
        expect(config.inputs[0].required).toBeTruthy();

        service.getFg().subscribe(fg => {
          expect(fg.controls[service.questionnaire.name].validator).toBeTruthy();
        });
      });
    }));

    it('should add validator and min and max attributes in config and group', inject([FormsSchemaService], (service: FormsSchemaService) => {
      service.questionnaire = {
        expects: QuantityOrder.ONE,
        offers: QuantityOrder.NONE,
        name: 'item name',
        formatConstraints: [
          {
            validationType: ValidationTypes.TYPE,
            validationSubType: TYPE_ValidationTypes.IS_NUMBER,
            booleanConstraint: true
          },
          {
            validationType: ValidationTypes.VALUE,
            validationSubType: VALUE_ValidationTypes.MAX,
            numericConstraint: 10
          },
          {
            validationType: ValidationTypes.VALUE,
            validationSubType: VALUE_ValidationTypes.MIN,
            numericConstraint: 1
          }
        ]
      };

      service.getConfig().subscribe(config => {
        expect(config.inputs[0].max).toEqual(10);
        expect(config.inputs[0].min).toEqual(1);
      });

      service.getFg().subscribe(fg => {
        expect(fg.controls[service.questionnaire.name].validator).toBeTruthy();
      });
    }));

    it('should add list input in config and group', inject([FormsSchemaService], (service: FormsSchemaService) => {
      service.questionnaire = {
        expects: QuantityOrder.MULTIPLE,
        offers: QuantityOrder.NONE,
        name: 'item name',
      };

      service.getConfig().subscribe(config => {
        expect(config.inputs[0].type).toEqual('list-input');
        expect(config.inputs.length).toEqual(1);
        expect(config.inputs[0].value instanceof FormConfig).toBeTruthy();
      });

      service.getFg().subscribe(fg => {
        expect(fg.controls[service.questionnaire.name] instanceof FormArray).toBeTruthy();
        expect(Object.keys(fg.controls).length).toEqual(1);
      });
    }));

    it('should add yes-no input in config and group', inject([FormsSchemaService], (service: FormsSchemaService) => {
      service.questionnaire = {
        expects: QuantityOrder.ONE,
        offers: QuantityOrder.ONE,
        name: 'item name',
      };

      service.getConfig().subscribe(config => {
        expect(config.inputs[0].type).toEqual('yes-no-input');
        expect(config.inputs.length).toEqual(1);
      });

      service.getFg().subscribe(fg => {
        expect(fg.controls[service.questionnaire.name] instanceof FormControl).toBeTruthy();
        expect(Object.keys(fg.controls).length).toEqual(1);
      });
    }));

    it('should add multiple checkbox inputs in config and group', inject([FormsSchemaService], (service: FormsSchemaService) => {
      service.questionnaire = {
        expects: QuantityOrder.MULTIPLE,
        offers: QuantityOrder.MULTIPLE,
        name: 'item name',
        assets: [
          {
            content: 'a1'
          },
          {
            content: 'a2'
          }
        ]
      };

      service.getConfig().subscribe(config => {
        expect(config.inputs[0].type).toEqual('select-multiple');
        expect(config.inputs.length).toEqual(1);
        expect((<FormConfig>(config.inputs[0].value)).inputs.length).toEqual(2);
      });

      service.getFg().subscribe(fg => {
        const group = <FormGroup>(fg.controls[service.questionnaire.name]);
        expect(group.controls['a1'] && group.controls['a2']).toBeTruthy();
        expect(Object.keys(group.controls).length).toEqual(2);
      });
    }));

    it('should add multiple radio inputs when multiple is offered and one is expected', inject([FormsSchemaService], (service) => {
      service.questionnaire = {
        expects: QuantityOrder.ONE,
        offers: QuantityOrder.MULTIPLE,
        name: 'item name',
        assets: [
          {
            content: 'a1'
          },
          {
            content: 'a2'
          }
        ]
      };

      service.getConfig().subscribe(config => {
        expect(config.inputs[0].type).toEqual('select-single');
        expect(config.inputs[0].value.inputs.length).toEqual(2);
      });

      service.getFg().subscribe(fg => {
        const group = <FormGroup>(fg.controls[service.questionnaire.name]);
        expect(group).toBeTruthy();
      });
    }));

    xit('should add portal-form in config and group', inject([FormsSchemaService], (service: FormsSchemaService) => {
      expect(null).toBeTruthy();
    }));

    xit('should provide formGroup and config for portal-form', inject([FormsSchemaService], (service: FormsSchemaService) => {
      expect(null).toBeTruthy();
    }));
  });

});
