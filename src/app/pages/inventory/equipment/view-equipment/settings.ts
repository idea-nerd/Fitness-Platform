export const Settings: any = {
  actions: {
    add: false,
    edit: false,
    delete: false,
  },
  columns: {
    name: {
      title: 'Name',
      type: 'string',
      filter: true,
    },
    description: {
      title: 'Description',
      type: 'string',
      filter: true,
    },
    category: {
      title: 'Category',
      type: 'string',
      filter: true,
    },
    quantity: {
      title: 'Quantity',
      type: 'string',
      filter: true,
    },
  },
  mode: 'external',
  hideHeader: true,
};
