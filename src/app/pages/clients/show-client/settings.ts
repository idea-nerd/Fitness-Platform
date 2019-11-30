export const Settings: any = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      name: {
        title: 'Plan Name',
        type: 'text',
        filter: true,
      },
      startDate: {
        title: 'Start Date',
        type: 'text',
        filter: true,
      },
      endDate: {
        title: 'End Date',
        type: 'text',
        filter: true,
      },
      status: {
        title: 'Status',
        type: 'text',
        filter: true,
      },
    },
    mode: 'external',
    hideHeader: true,
  };
