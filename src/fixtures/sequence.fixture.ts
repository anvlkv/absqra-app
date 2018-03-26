import { AssetContentTypes, AssetTypes } from '../models/enums/asset.enums';
import { ItemLifeCycleTypes, QuantityOrder } from '../models/enums/item.enums';
import { TYPE_ValidationTypes, ValidationTypes } from '../models/enums/formatConstraint.enums';
import { StepTypes } from '../models/enums/step.enums';


export const sequence = {
  id: 1,
  header: {
    name: 'Fixture sequence',
    description: 'Fixture description',
  },
  steps: [{
    id: 1,
    type: StepTypes.ITEM_REF,
    order: 1,
    isItemOrigin: true,
    item: {
      question: {
        assetType: AssetTypes.STATIC,
        contentType: AssetContentTypes.TEXT,
        content: 'Fixture asset',
      },
      name: 'Fixture item',
      description: 'Fixture description ',
      offers: QuantityOrder.MULTIPLE,
      expects: QuantityOrder.ONE,
      assets: [
        {
          id: 1,
          assetType: AssetTypes.STATIC,
          contentType: AssetContentTypes.TEXT,
          content: 'blah blah',
          order: 1,
        },
        {
          id: 2,
          assetType: AssetTypes.STATIC,
          contentType: AssetContentTypes.TEXT,
          content: 'blah2 blah2',
          order: 2,
        },
      ],
      formatConstraints: [
        {
          validationType: ValidationTypes.TYPE,
          validationSubType: TYPE_ValidationTypes.IS_TEXT,
          booleanConstraint: true,
        },
      ],
      lifeCycle: ItemLifeCycleTypes.ONE_ONE,
    },

  }, {
    id: 2,
    type: StepTypes.ITEM_REF,
    order: 2,
    isItemOrigin: true,
    item: {
      name: 'Fixture 2',
      question: {
        assetType: AssetTypes.STATIC,
        contentType: AssetContentTypes.TEXT,
        content: 'Fixture asset 2',
      },
      offers: QuantityOrder.MULTIPLE,
      expects: QuantityOrder.ONE,
      lifeCycle: ItemLifeCycleTypes.ONE_ONE,
      assets: [
        {
          assetType: AssetTypes.DYNAMIC,
          content: '1',
          order: 1,
          /* this properties aren't stored!
          only generated on server when populating dynamic assets */
          isGenerated: true,
          source: '1:1',
        },
      ],
      formatConstraints: [
        {
          validationType: ValidationTypes.TYPE,
          validationSubType: TYPE_ValidationTypes.IS_TEXT,
          booleanConstraint: true,
        },
      ],
    },
  }],
};
