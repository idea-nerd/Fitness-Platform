export const Settings: any = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      name: {
        title: 'Plan Name',
        type: 'string',
        filter: true,
      },
      description: {
        title: 'Description',
        type: 'string',
        filter: true,
      },
      days: {
        title: 'Monthly Sessions',
        type: 'string',
        filter: true,
      },
      amount: {
        title: 'Cost',
        type: 'string',
        filter: true,
      },
    },
    mode: 'external',
    hideHeader: true,
  };
