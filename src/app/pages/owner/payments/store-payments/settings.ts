export const Settings: any = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      name: {
        title: 'Product',
        type: 'string',
        filter: true,
      },
      amount: {
        title: 'Amount',
        type: 'string',
        filter: true,
      },
      discountPercent: {
        title: 'Discount',
        type: 'string',
        filter: true,
      },
      status: {
        title: 'Status',
        type: 'string',
        filter: true,
      },
    },
    mode: 'external',
    hideHeader: true,
  };
