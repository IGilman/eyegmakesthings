import { Injectable } from '@angular/core';

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  current?: boolean;
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  logo?: string;       // path to image asset
  logoDark?: boolean;  // true if logo needs a dark background
  logoInitials?: string; // fallback if no logo
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  details?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  readonly name = 'Isaac Gilman';
  readonly title = 'Full Stack Software Engineer';
  readonly tagline = 'Building enterprise software that scales — from microservices to community.';
  readonly bio = `I am a Full Stack Software Engineer passionate about improving user experiences and shipping products that add value. 
  I currently work at Rocket Close, where I design and maintain .NET/C# microservices, Angular applications, and AWS & Azure infrastructure. 
  With over a decade of experience, I've led teams, mentored engineers, and built communities. 
  I'm dedicated to clean code, continuous learning, and creating software that users love.`; 

  readonly email = 'Gilman.Isaac@gmail.com';
  readonly phone = '(734) 655-0305';
  readonly location = 'Detroit, MI';

  readonly socialLinks: SocialLink[] = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/isaacgilman/', icon: 'link' },
    { label: 'GitHub', url: 'https://github.com/isaacgilman', icon: 'code' },
    { label: 'Email', url: 'mailto:Gilman.Isaac@gmail.com', icon: 'mail' },
  ];

  readonly experiences: Experience[] = [
    {
      company: 'Rocket Close',
      role: 'Full Stack Software Engineer',
      period: 'July 2020 – Present',
      location: 'Detroit, MI',
      current: true,
      bullets: [
        'Build and maintain eight enterprise .NET/C# microservices using AWS infrastructure and RabbitMQ messaging.',
        'Transitioned three legacy web applications to Angular 19 and Angular Material for improved user experiences.',
        'Lead the Angular Community of Practice — contributed 17 presentations and grew membership to 125 members since its 2022 inception.',
        'AWS Certified Cloud Practitioner via Amazon certification program.',
        'Mentor, pair-program and review best practices with new hires to help onboard and teach the overall codebase.',
      ],
    },
    {
      company: 'Rocket Close',
      role: 'Release Train Engineer',
      period: 'June 2019 – April 2020',
      location: 'Detroit, MI',
      bullets: [
        'Chief scrum master and co-leader of the Appraisal release train within the Scaled Agile Framework (SAFe).',
        'Ensured the agility, efficiency, and delivery of two Scrum teams by communicating objectives, facilitating all major Program Increment events, and regularly removing impediments.',
        'Published monthly blog posts about technology and Agile transformation.',
      ],
    },
    {
      company: 'Rocket Close',
      role: 'Technology Team Leader & Certified SAFe Scrum Master',
      period: 'July 2015 – June 2019',
      location: 'Detroit, MI',
      bullets: [
        'Led and Scrum Mastered twelve team members across two teams, helping reduce turn time and decrease costs.',
        'Applied SAFe resulting in a 1.4% defect rate, 89% delivery of team iteration goals, and 100% delivery of Program Increment objectives.',
        'Managed two software engineering teams reducing average title examination turn time by 30%.',
        'Conducted interviews, hired team members, and completed 360-degree performance reviews.',
      ],
    },
    {
      company: 'Rocket Close',
      role: 'Quality Assurance Analyst',
      period: 'Jan. 2015 – July 2015',
      location: 'Detroit, MI',
      bullets: [
        'Ensured quality software engineering for the Integrated Mortgage Disclosure Rule implementation project.',
        'Developed test cases and facilitated user acceptance testing to verify business rules.',
        'Trained and mentored new SQAs on best practices and company processes.',
      ],
    },
    {
      company: 'TechTown Detroit',
      role: 'Junction440 Community Builder',
      period: 'Sept. 2013 – Oct. 2014',
      location: 'Detroit, MI',
      bullets: [
        'Established TechTown\'s first co-working community, growing it from 0 to over 40 paying members in one year.',
        'Executed and routinely refreshed co-working rules, policies, and procedures based on customer discovery.',
        'Implemented co-working management software to collect member data, build a website, and process payments.',
      ],
    },
  ];

  readonly additionalExperiences: Experience[] = [
    {
      company: 'Farebox',
      role: 'Freelance Software Engineer',
      period: 'Nov. 2022 – Jan. 2025',
      location: 'Remote',
      bullets: [
        'Maintained a bus scheduling enterprise application with a Vue.js, Node.js, Express.js, and MongoDB stack.',
        'Added features and fixed bugs based on customer feedback during nights and weekends.',
      ],
    },
    {
      company: 'Alumni of Challenge Detroit',
      role: 'President',
      period: 'Jun. 2017 – Nov. 2018',
      location: 'Detroit, MI',
      bullets: [
        'Led seven volunteer committee members to execute the organization\'s vision.',
        'Facilitated monthly meetings, two networking events, and completed leadership elections for new leaders.',
      ],
    },
    {
      company: 'Southwest Rides L3C',
      role: 'Co-founder',
      period: 'Jan. 2012 – Jan. 2017',
      location: 'Detroit, MI',
      bullets: [
        'Raised $60,000 in donations, loans, and grants to launch the business and support youth programming.',
        'Developed a youth entrepreneurship training center via bike retail in Southwest Detroit.',
        'Created a comprehensive business plan approved by the fiduciary committee of Urban Neighborhood Initiatives.',
      ],
    },
  ];

  readonly projects: Project[] = [
    {
      name: 'Rocket Close - Connect Platform',
      description:
        'Enterprise to-do system for borrowers throughout the title/closing process. Hosted in AWS and built with Angular, C#/.Net microservices and RabbitMQ messaging.',
      tags: ['Angular', 'Angular Material', '.NET / C#', 'AWS', 'RabbitMQ'],
      link: 'https://www.rocketclose.com/',
      logo: 'rocket-close.svg',
      logoDark: true,
      featured: true,
    },
    {
      name: 'Rocket Close - Clear Sign Platform',
      description:
        'A digital document signing platform streamlining the title closing workflow. Hosted in Azure and built with Angular, C#/.Net and SQL.',
      tags: ['Angular', 'Angular Material', '.NET / C#', 'Azure'],
      link: 'https://www.rocketclose.com/applications-and-services/clear-sign',
      logo: 'rocket-close.svg',
      logoDark: true,
      featured: true,
    },
    {
      name: 'Farebox - Freelance Contractor',
      description:
        'A bus scheduling enterprise application for transit operators. Maintained and extended the full-stack application with Vue.js, Node.js, Express.js, and MongoDB — adding features and resolving bugs based on real customer feedback.',
      tags: ['Vue.js', 'Node.js', 'Express.js', 'MongoDB'],
      link: 'https://farebox.io/',
      logo: 'farebox.svg',
      logoDark: false,
      featured: true,
    },
    // {
    //   name: 'Mailbox — Coming Soon',
    //   description:
    //     'A new personal project currently in development. Stay tuned for updates — details and a live link will be added here soon.',
    //   tags: ['TBD'],
    //   logoInitials: 'MB',
    //   featured: true,
    // },
  ];


  readonly skillGroups: SkillGroup[] = [
    {
      category: 'Frontend',
      skills: ['Angular', 'Angular Material', 'TypeScript', 'JavaScript', 'Vue.js', 'HTML', 'CSS / SCSS', 'RxJS'],
    },
    {
      category: 'Backend',
      skills: ['.NET / C#', 'Node.js', 'Express.js', 'REST APIs', 'RabbitMQ', 'SQL', 'MongoDB'],
    },
    {
      category: 'Cloud & Tools',
      skills: ['AWS', 'Azure', 'Claude Code', 'Docker', 'Kubernetes', 'AzureDevops'],
    },
    {
      category: 'Leadership & Practices',
      skills: ['SAFe / Scrum', 'Agile', 'Team Leadership', 'Mentorship', 'Code Review', 'Technical Writing'],
    },
  ];
}