export const Settings: any = {
  actions: {
    add: false,
    edit: false,
    delete: false,
  },
  columns: {
    firstName: {
      title: 'First Name',
      type: 'string',
      filter: true,
    },
    lastName: {
      title: 'Last Name',
      type: 'string',
      filter: true,
    },
    planName: {
      title: 'Plan Name',
      type: 'string',
      filter: true,
    },
    startDate: {
      title: 'Start Date',
      type: 'string',
      filter: true,
    },
    endDate: {
      title: 'End Date',
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
