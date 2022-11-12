import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: ''
  },
  {
    label: 'Master Info',
    isTitle: true
  },
 
 
  {
    label: 'Employment',
    icon: 'mail',
    subItems: [
      {
        label: 'Job Administrator',
        link: 'Administrator/Jobs',
      },
      {
        label: 'Job Application',
        link: 'Administrator/Application'
      },
    ]
  },
 
];
