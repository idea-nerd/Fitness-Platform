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
      gender: {
        title: 'Gender',
        type: 'string',
        filter: true,
      },
      /*dob: {
        title: 'Date of Birth',
        type: 'string',
        filter: true,
      },
      startBy: {
        title: 'Member Since',
        type: 'string',
        filter: true,
      },*/
      status: {
        title: 'Status',
        type: 'string',
        filter: true,
      },
    },
    mode: 'external',
    hideHeader: true,
  };
