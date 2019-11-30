import { NbMenuItem } from '@nebular/theme';


export const OWNER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Reports',
    group: true,
  },
  {
    title: 'Reports',
    icon: 'activity-outline',
    link: '/pages/owners/reports/revenue',
  },
  /*{
    title: 'Activity',
    group: true,
  },
  {
    title: 'Overview',
    icon: 'grid-outline',
    link: '/pages/owners/activity/registration',
  },*/
  {
    title: 'Expense',
    group: true,
  },
  {
    title: 'Expenses',
    icon: 'trending-down-outline',
    link: '/pages/expenses/view',
  },
  {
    title: 'Staff',
    group: true,
  },
  {
    title: 'Trainers',
    icon: 'person-outline',
    link: '/pages/expenses/trainers',
  },
  /*{
    title: 'REPORTS',
    group: true,
  },
  {
    title: 'Reports',
    icon: 'file-text-outline',
    children: [
      {
        title: 'Clients Report',
        link: '/pages/reports/clients/view',
      },
      {
        title: 'Financial Report',
        link: '/pages/reports/financials/view',
      },
      {
        title: 'Attendance Report',
        link: '/pages/reports/attendance/view',
      },
      {
        title: 'Lead Report',
        link: '/pages/reports/lead/view',
      },
    ],
  },*/
  {
    title: 'MANAGE',
    group: true,
  },
  {
    title: 'Users',
    icon: 'people-outline',
    link: '/pages/users/view',
  }, 
];

export const TRAINER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,

  },
  {
    title: 'Training',
    group: true,
  },
  {
    title: 'Leads',
    icon: 'person-add-outline',
    link: '/pages/leads/view',
  },
  {
    title: 'Clients',
    icon: 'people-outline',
    link: '/pages/trainers/clients/view',
    hidden: false,
  }
];

export const MANAGER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  /*{
    title: 'Store',
    group: true,
  },
  {
    title: 'Products',
    icon: 'grid-outline',
    link: '/pages/products/view',
    hidden: false,
  },
  {
    title: 'Sales',
    icon: 'shopping-cart-outline',
    link: '/pages/sales/view',
    hidden: false,
  },
  {
    title: 'Gym',
    group: true,
  },
  {
    title: 'Inventory',
    icon: 'smartphone-outline',
    link: '/pages/equipments/view',
  },*/
  {
    title: 'Business',
    group: true,
  },
  {
    title: 'Clients',
    icon: 'people-outline',
    link: '/pages/clients/view',
  },
  {
    title: 'Leads',
    icon: 'person-add-outline',
    link: '/pages/leads/view',
  },
  {
    title: 'Appointments',
    icon: 'calendar-outline',
    link: '/pages/appointments/trainers',
  },
  {
    title: 'Subscriptions',
    icon: 'shopping-bag-outline',
    link: '/pages/subscriptions/view',
  },
  {
    title: 'Attendance',
    icon: 'bell-outline',
    link: '/pages/checkin/view',
  },
  {
    title: 'Expenses',
    group: true,
  },
  {
    title: 'Expenses',
    icon: 'trending-down-outline',
    link: '/pages/expenses/view',
  },
  {
    title: 'Manage',
    group: true,
  },
  {
    title: 'Plans',
    icon: 'cube-outline',
    link: '/pages/plans/view',
  },
  {
    title: 'Services',
    icon: 'car-outline',
    link: '/pages/services/view',
  }
];
