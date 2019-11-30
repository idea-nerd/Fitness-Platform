export const Settings: any = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      productName: {
        title: 'Product Name',
        type: 'string',
        filter: true,
      },
      date: {
        title: 'Date Sold',
        type: 'string',
        filter: true,
      },
      amount: {
        title: 'Sale Value',
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
