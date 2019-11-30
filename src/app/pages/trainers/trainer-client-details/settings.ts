export const Settings: any = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      createdAt: {
        title: 'Date',
        type: 'string',
        filter: true,
      },
      bfp: {
        title: 'Body Fat %',
        type: 'string',
        filter: true,
      },
      chest: {
        title: 'Chest',
        type: 'string',
        filter: true,
      },
      waist: {
        title: 'Waist',
        type: 'string',
        filter: true,
      },
      hips: {
        title: 'Hips',
        type: 'string',
        filter: true,
      }
    },
    mode: 'external',
    hideHeader: true,
  };
