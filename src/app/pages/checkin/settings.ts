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
      startTime: {
        title: 'Enter Time',
        type: 'string',
        filter: true,
      },
      endTime: {
        title: 'Exit Time',
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
