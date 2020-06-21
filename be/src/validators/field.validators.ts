import validator from './index';

export const fieldValidator = (obj) => {
  return validator(obj, {
    properties: {
      name: {
        description: 'name validation',
        message: 'name is required',
        type: 'string',
        required: true
      },
      area: {
        description: 'area validation',
        message: 'area is required',
        type: 'number',
        required: true
      },
      cropType: {
        description: 'cropType validation',
        name: "cropType",
        type: 'string',
        enum: ['Wheat', 'Broccoli', 'Strawberries'],
        required: true
      },
    }
  })
}
