export const Settings: any = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      note: {
        title: 'Description',
        type: 'string',
        filter: true,
      },
      category: {
        title: 'Category',
        type: 'string',
        filter: true,
      },
      dueDate: {
        title: 'Date Due',
        type: 'string',
        filter: true,
      },
      amount: {
        title: 'Cost',
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
