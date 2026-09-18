export const profile = {
  name: 'Najakhul Fahmi',
  logo: 'FahmiNaja',
  roles: ['Business Analyst', 'System Developer', 'Freelancer'],
  tagline: 'Make it work, make it right, make it fast.',
  location: 'Cikarang, Indonesia',
  email: 'fahminajaa@gmail.com',
  careerStart: 2019,
  headline: 'Business Analyst & System Developer.',
  summary:
    'Business Analyst and System Development specializing in business analyst, data analyst, data engineering and full-stack development. Having good knowledges with all stages of the development cycle for dynamic web projects and experienced in analyzing issue, bug-fix, and problem solving as an technical operation support.',
  links: {
    linkedin: 'https://id.linkedin.com/in/fahminaja',
    instagram: 'https://www.instagram.com/fahminaja/',
    github: 'https://github.com/fahminaja',
  },
}

export const photos = ['/img/myphoto1.png', '/img/myphoto2.png']

export const skills = [
  { title: 'Front End', items: ['VueJS', 'ReactJS', 'JQuery', 'Kendo Telerik UI'] },
  {
    title: 'Back End',
    items: ['ASP .NET / .NET Core', 'Node JS / Express JS / Prisma JS', 'PHP CodeIgniter'],
  },
  { title: 'Database', items: ['SQL Server', 'MySQL'] },
  {
    title: 'Languages',
    items: ['C#', 'PHP', 'JavaScript', 'TypeScript', 'YAML (CI/CD)', 'HTML5 / CSS'],
  },
  {
    title: 'Tools',
    items: ['SAP Tracker RPA', 'Power Automate', 'SQL Server Integration Services', 'Selenium'],
  },
  { title: 'Workspace', items: ['GitLab', 'GitHub', 'Azure DevOps'] },
]

export const jobs = [
  {
    role: 'Business Analyst and System Development',
    company: 'PT. Indonesia Epson Industry, Cikarang, West Java',
    period: 'Aug 2019 - Present',
    points: [
      'Managed all phases of development, including requirement gathering with stakeholders across departments, system architecture, application and database design, implementation using coding standards, deployment to server, and ongoing maintenance.',
      'Initiated documentation standards for requirement specs, UI/UX mockups, and database design to streamline cross-team collaboration.',
      'Led the development of new features on legacy systems, leveraging a varied technology stack to enhance functionality and performance.',
      'Introduced coding best practices inspired by Clean Code principles to improve maintainability, modularity, and team-wide consistency.',
      'Conducted code reviews to ensure code quality and compliance with standard coding guidelines.',
      'Introduced automated system deployment using CI/CD pipelines that adopted as the standard practice.',
      'Designed and deployed the HR System infrastructure on AWS for the company’s Odoo-based application, utilizing services such as EC2, ECS (Docker), EFS, S3, Lambda, Load Balancer, and Auto Scaling to achieve scalable and highly available system architecture.',
      'Led and delivered major internal applications that gained high-level exposure and broad adoption across company units.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'PT. PLN (Persero), Semarang, Central Java',
    period: 'Jan - Feb 2018',
    points: [
      "Developed mobile application for registering data of the customers who's install the new electricity and adding power for electricity using Xamarin.",
    ],
  },
]

export const education = {
  school: 'Diponegoro University',
  period: '2015 - 2019',
  degree: 'Bachelor of Engineering - BE . Computer Engineering . GPA: 3.72',
  place: 'Semarang, Central Java, Indonesia',
}

export const organizations = [
  {
    role: 'Head of Network Routing and Switching Division - CERC',
    period: 'Mar 2018 - Jun 2018',
    place: 'Semarang, Central Java, Indonesia',
  },
  {
    role: 'Organization Manager - HIMASKOM',
    period: '2017 - 2018',
    place: 'Semarang, Central Java, Indonesia',
  },
  {
    role: 'Information and Communication Staff - HIMASKOM',
    period: '2016 - 2017',
    place: 'Semarang, Central Java, Indonesia',
  },
]

export const achievements = [
  {
    title:
      'The Best Graduate Student on Department Computer Engineering at Diponegoro University Graduation 155 Period',
    period: 'Aug 2019',
    note: '3 year 10 month, GPA 3.72',
  },
  {
    title:
      'Finalist of Cisco Networking Academy NetRiders Asia Pacific and Japan 2017 CCENT Competition',
    period: 'Sep 2017',
  },
]

export type Project = {
  id: string
  title: string
  type: 'Web' | 'Mobile'
  category: string
  client: string
  date: string
  description: string
  cover: string
  images: string[]
}

const imgs = (dir: string, names: string[]) => names.map((n) => `/img/${dir}/${n}`)

export const projects: Project[] = [
  {
    id: 'dmcc',
    title: 'DMCC - Tangerang',
    type: 'Web',
    category: 'Web Application',
    client: 'PT. Telkom Indonesia (Persero) Tbk.',
    date: 'November 2021',
    description:
      'DMCC (Daily Monitoring CC Tangerang) is an application that is used to collect data and monitor all services available at Plasa and Nossa in one branch of PT. Telkom Indonesia (Persero) Tbk. Plasa serves everything related to the installation of new devices, the submission of promotions, the return of devices, and other matters related to the products offered. Nossa (Network Operation Support System Assurance) is a service for making complaints if customers experience disruptions in the form of tickets that will be managed from input of disruption reports to completion.',
    cover: '/img/dmcc/dashboard1.jpg',
    images: imgs('dmcc', [
      'dashboard1.jpg',
      'dashboard2.jpg',
      'plasa1.jpg',
      'plasa2.jpg',
      'plasa3.jpg',
      'plasa4.jpg',
      'nossa1.jpg',
      'nossa2.jpg',
      'nossa3.jpg',
      'nossa4.jpg',
      'nossa5.jpg',
    ]),
  },
  {
    id: 'plnmobile',
    title: 'PLN DJTY Mobile Apps',
    type: 'Mobile',
    category: 'Mobile Application',
    client: 'PT. PLN (Persero) Tbk.',
    date: 'Feb 2018',
    description:
      'The PLN DJTY application is used to support all services provided by PT. PLN (Persero) Tbk., centralizing them into a single mobile application. It contains information related to customers who will increase their power capacity and customers who will undergo new installations, commonly referred to as "pasang baru." Additionally, the application includes information about data summaries, PLN profiles, code of conduct, whistleblower system, and GCG (Good Corporate Governance).',
    cover: '/img/plnmobile/mainmenu.jpg',
    images: imgs('plnmobile', [
      'mainmenu.jpg',
      'sidemenu.jpg',
      'filter1.jpg',
      'filter2.jpg',
      'filter3.jpg',
      'pb1.jpg',
      'pb2.jpg',
      'pb3.jpg',
      'pb4.jpg',
      'pbtd1.jpg',
      'td1.jpg',
      'td2.jpg',
      'td3.jpg',
      'td4.jpg',
      'td5.jpg',
      'td6.jpg',
    ]),
  },
  {
    id: 'posbariki',
    title: 'Bariki Ngopi POS Application',
    type: 'Web',
    category: 'Web Application',
    client: 'Bariki Ngopi',
    date: 'July 2019',
    description:
      'This application is made to make it easier for customers to order food or drinks at Bariki Ngopi Cafe. In addition, this application will also collect all transactions that have been made. From these transaction data, a report on sales data will be displayed so that the cafe owner can see monthly income, daily transaction volume in the form of graphs or labels.',
    cover: '/img/posbariki/dashboard1.png',
    images: imgs('posbariki', [
      'dashboard1.png',
      'dashboard2.png',
      'menulist.png',
      'ordermenu.png',
      'detailcart.png',
      'detailitem.png',
      'additem.png',
      'deleteitem.png',
      'deleteditem.png',
      'transaction.png',
      'detailtransaction.png',
    ]),
  },
]

export const highlights = [
  {
    title: 'RFID System in Warehouse',
    points: [
      'Develop web based application for efficiency while receiving and warehousing printer part named Goodscontrol.',
      'Develop web based application for avoid potential box loss and controlling box actual location named Boxcontrol.',
    ],
  },
  {
    title: 'Customs Audit Countermeasures / Logistic Management',
    points: [
      'Develop web based application for efficiency on creating BC 40 document based on Customs regulation named TPBExchange.',
      'Develop Robot Process Automation (RPA) for Gate In process to avoid penalty from Customs, handling more than 18000 pending document. This robot could finish Gate In process only 45-60 second every single document. Without RPA its tooks 120 second.',
      'Develop web based application for efficiency on creating BC 27 document based on Customs regulation and to avoid penalty from Customs caused by the shipping process without BC 27 documents as well.',
    ],
  },
  {
    title: 'HR / GA',
    points: [
      'Lead and Develop single page application named JASUKE (Jam Supir Kerja) for controlling driver working hour, tracking driver position and its reduce until 32% working hour.',
    ],
  },
  {
    title: 'Purchasing',
    points: [
      'Create auditor sheet printing automation using Microsoft Power Automate on Stock Taking Project.',
      'Create Automated RFQ to approval flow, from quotation requests to approval and archival (E-APC).',
    ],
  },
  {
    title: 'Accounting',
    points: [
      "Lead and Develop single page application named PROMAG (Profitability Data Management) To create financial reports related to the company's profit and loss, marginal income from product sales, and also for material ratio analysis in every product sold. The system also implements RPA for the process of retrieving data from the SAP System in real time, RPA on the system is run using the ClickOnce method.",
    ],
  },
]
