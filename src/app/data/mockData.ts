export interface Student {
  id: string;
  name: string;
  email: string;
  photo: string;
  semester: number;
  course: string;
  enrollmentDate: string;
  
  // Academic
  ira: number;
  previousIra?: number;
  failedCourses: number;
  schedule: CourseSchedule[];
  
  // Technical
  hardSkills: string[];
  tracks: string[];
  projects: string[];
  languages: Language[];
  githubRepos?: number;
  
  // Social
  softSkills: SoftSkill[];
  eventParticipation: number;
  engagement: 'high' | 'medium' | 'low';
  
  // Reports
  monthlyReports: MonthlyReport[];
  deadlineCompliance: number; // percentage
}

export interface CourseSchedule {
  code: string;
  name: string;
  day: string;
  time: string;
  professor: string;
}

export interface Language {
  name: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'fluent';
}

export interface SoftSkill {
  name: string;
  score: number; // 0-10
}

export interface MonthlyReport {
  month: string;
  year: number;
  submitted: boolean;
  submittedAt?: string;
  content?: string;
  evidences?: string[];
}

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  qrCode: string;
  attendees: string[]; // student IDs
}

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@student.edu',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    semester: 5,
    course: 'Ciência da Computação',
    enrollmentDate: '2023-02-01',
    ira: 8.7,
    previousIra: 8.2,
    failedCourses: 1,
    schedule: [
      { code: 'CC501', name: 'Banco de Dados', day: 'Segunda', time: '14:00-16:00', professor: 'Dr. Carlos' },
      { code: 'CC502', name: 'Engenharia de Software', day: 'Terça', time: '10:00-12:00', professor: 'Dra. Ana' },
    ],
    hardSkills: ['React', 'Node.js', 'PostgreSQL', 'Python', 'Docker'],
    tracks: ['Full-Stack Development', 'Cloud Computing'],
    projects: ['Sistema de Gestão Acadêmica', 'E-commerce Platform'],
    languages: [
      { name: 'Inglês', level: 'advanced' },
      { name: 'Espanhol', level: 'intermediate' },
    ],
    githubRepos: 23,
    softSkills: [
      { name: 'Comunicação', score: 8 },
      { name: 'Trabalho em Equipe', score: 9 },
      { name: 'Liderança', score: 7 },
      { name: 'Resolução de Problemas', score: 9 },
    ],
    eventParticipation: 12,
    engagement: 'high',
    monthlyReports: [
      {
        month: 'Janeiro',
        year: 2026,
        submitted: true,
        submittedAt: '2026-01-30',
        content: 'Participei do desenvolvimento do módulo de autenticação...',
        evidences: ['github.com/repo1', 'certificado.pdf'],
      },
      {
        month: 'Fevereiro',
        year: 2026,
        submitted: false,
      },
    ],
    deadlineCompliance: 92,
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@student.edu',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    semester: 3,
    course: 'Ciência da Computação',
    enrollmentDate: '2024-02-01',
    ira: 9.2,
    previousIra: 8.9,
    failedCourses: 0,
    schedule: [
      { code: 'CC301', name: 'Estruturas de Dados', day: 'Segunda', time: '08:00-10:00', professor: 'Dr. Pedro' },
      { code: 'CC302', name: 'Algoritmos', day: 'Quarta', time: '14:00-16:00', professor: 'Dra. Julia' },
    ],
    hardSkills: ['React', 'TypeScript', 'Figma', 'UI/UX Design'],
    tracks: ['Frontend Development', 'UX Design'],
    projects: ['Dashboard Analytics', 'Mobile App Redesign'],
    languages: [
      { name: 'Inglês', level: 'fluent' },
      { name: 'Francês', level: 'basic' },
    ],
    githubRepos: 15,
    softSkills: [
      { name: 'Comunicação', score: 10 },
      { name: 'Trabalho em Equipe', score: 9 },
      { name: 'Criatividade', score: 10 },
      { name: 'Organização', score: 9 },
    ],
    eventParticipation: 18,
    engagement: 'high',
    monthlyReports: [
      {
        month: 'Janeiro',
        year: 2026,
        submitted: true,
        submittedAt: '2026-01-28',
        content: 'Finalizei o redesign da interface do aplicativo mobile...',
      },
      {
        month: 'Fevereiro',
        year: 2026,
        submitted: true,
        submittedAt: '2026-02-27',
        content: 'Implementei sistema de design tokens...',
      },
    ],
    deadlineCompliance: 100,
  },
  {
    id: '3',
    name: 'Carlos Santos',
    email: 'carlos.santos@student.edu',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    semester: 7,
    course: 'Engenharia de Software',
    enrollmentDate: '2022-02-01',
    ira: 7.5,
    previousIra: 7.8,
    failedCourses: 3,
    schedule: [
      { code: 'ES701', name: 'Projeto Final', day: 'Quinta', time: '14:00-18:00', professor: 'Dr. Roberto' },
    ],
    hardSkills: ['Java', 'Spring Boot', 'MySQL', 'Jenkins'],
    tracks: ['Backend Development', 'DevOps'],
    projects: ['Microservices Architecture'],
    languages: [
      { name: 'Inglês', level: 'intermediate' },
    ],
    githubRepos: 8,
    softSkills: [
      { name: 'Comunicação', score: 6 },
      { name: 'Trabalho em Equipe', score: 7 },
      { name: 'Persistência', score: 8 },
      { name: 'Pontualidade', score: 5 },
    ],
    eventParticipation: 4,
    engagement: 'low',
    monthlyReports: [
      {
        month: 'Janeiro',
        year: 2026,
        submitted: false,
      },
      {
        month: 'Fevereiro',
        year: 2026,
        submitted: false,
      },
    ],
    deadlineCompliance: 45,
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@student.edu',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    semester: 4,
    course: 'Ciência da Computação',
    enrollmentDate: '2023-08-01',
    ira: 8.1,
    previousIra: 7.9,
    failedCourses: 1,
    schedule: [
      { code: 'CC401', name: 'Redes de Computadores', day: 'Terça', time: '08:00-10:00', professor: 'Dr. Marcos' },
      { code: 'CC402', name: 'Sistemas Operacionais', day: 'Quinta', time: '10:00-12:00', professor: 'Dra. Lucia' },
    ],
    hardSkills: ['Python', 'Django', 'React', 'MongoDB'],
    tracks: ['Full-Stack Development', 'Data Science'],
    projects: ['ML Prediction Model', 'RESTful API'],
    languages: [
      { name: 'Inglês', level: 'advanced' },
    ],
    githubRepos: 18,
    softSkills: [
      { name: 'Comunicação', score: 8 },
      { name: 'Trabalho em Equipe', score: 8 },
      { name: 'Proatividade', score: 9 },
      { name: 'Adaptabilidade', score: 8 },
    ],
    eventParticipation: 10,
    engagement: 'high',
    monthlyReports: [
      {
        month: 'Janeiro',
        year: 2026,
        submitted: true,
        submittedAt: '2026-01-29',
      },
      {
        month: 'Fevereiro',
        year: 2026,
        submitted: true,
        submittedAt: '2026-02-26',
      },
    ],
    deadlineCompliance: 85,
  },
  {
    id: '5',
    name: 'Pedro Almeida',
    email: 'pedro.almeida@student.edu',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    semester: 6,
    course: 'Sistemas de Informação',
    enrollmentDate: '2022-08-01',
    ira: 7.8,
    previousIra: 8.0,
    failedCourses: 2,
    schedule: [
      { code: 'SI601', name: 'Análise de Dados', day: 'Segunda', time: '10:00-12:00', professor: 'Dr. Fernando' },
      { code: 'SI602', name: 'BI e Analytics', day: 'Quarta', time: '14:00-16:00', professor: 'Dra. Beatriz' },
    ],
    hardSkills: ['Python', 'Power BI', 'SQL', 'Tableau'],
    tracks: ['Data Analytics', 'Business Intelligence'],
    projects: ['Sales Dashboard', 'Customer Analysis'],
    languages: [
      { name: 'Inglês', level: 'intermediate' },
    ],
    githubRepos: 11,
    softSkills: [
      { name: 'Comunicação', score: 7 },
      { name: 'Trabalho em Equipe', score: 8 },
      { name: 'Análise Crítica', score: 9 },
      { name: 'Organização', score: 7 },
    ],
    eventParticipation: 7,
    engagement: 'medium',
    monthlyReports: [
      {
        month: 'Janeiro',
        year: 2026,
        submitted: true,
        submittedAt: '2026-01-31',
      },
      {
        month: 'Fevereiro',
        year: 2026,
        submitted: false,
      },
    ],
    deadlineCompliance: 70,
  },
  {
    id: '6',
    name: 'Julia Fernandes',
    email: 'julia.fernandes@student.edu',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
    semester: 3,
    course: 'Ciência da Computação',
    enrollmentDate: '2024-02-01',
    ira: 8.9,
    previousIra: 8.7,
    failedCourses: 0,
    schedule: [
      { code: 'CC303', name: 'Programação Web', day: 'Terça', time: '14:00-16:00', professor: 'Dr. Luis' },
      { code: 'CC304', name: 'Mobile Development', day: 'Quinta', time: '08:00-10:00', professor: 'Dra. Carla' },
    ],
    hardSkills: ['React Native', 'Flutter', 'Firebase', 'JavaScript'],
    tracks: ['Mobile Development', 'Cloud Computing'],
    projects: ['Fitness Tracker App', 'Delivery App'],
    languages: [
      { name: 'Inglês', level: 'fluent' },
      { name: 'Italiano', level: 'basic' },
    ],
    githubRepos: 20,
    softSkills: [
      { name: 'Comunicação', score: 9 },
      { name: 'Trabalho em Equipe', score: 10 },
      { name: 'Inovação', score: 9 },
      { name: 'Dedicação', score: 10 },
    ],
    eventParticipation: 15,
    engagement: 'high',
    monthlyReports: [
      {
        month: 'Janeiro',
        year: 2026,
        submitted: true,
        submittedAt: '2026-01-30',
      },
      {
        month: 'Fevereiro',
        year: 2026,
        submitted: true,
        submittedAt: '2026-02-27',
      },
    ],
    deadlineCompliance: 95,
  },
];

export const mockEvents: Event[] = [
  {
    id: 'evt1',
    name: 'Workshop React Avançado',
    date: '2026-03-15',
    time: '14:00',
    location: 'Auditório Principal',
    qrCode: 'QR-REACT-2026-03-15',
    attendees: ['1', '2', '4', '6'],
  },
  {
    id: 'evt2',
    name: 'Hackathon Edge Academy',
    date: '2026-03-20',
    time: '09:00',
    location: 'Lab 1 e 2',
    qrCode: 'QR-HACK-2026-03-20',
    attendees: ['1', '2', '4', '5', '6'],
  },
  {
    id: 'evt3',
    name: 'Palestra: Carreira em Tech',
    date: '2026-02-10',
    time: '19:00',
    location: 'Online',
    qrCode: 'QR-CAREER-2026-02-10',
    attendees: ['1', '2', '3', '4', '5', '6'],
  },
];

// Helper functions
export function getStudentById(id: string): Student | undefined {
  return mockStudents.find((s) => s.id === id);
}

export function getStudentsByFilter(filter: {
  semester?: number;
  project?: string;
  minIra?: number;
  hardSkill?: string;
  engagement?: string;
}): Student[] {
  return mockStudents.filter((student) => {
    if (filter.semester && student.semester !== filter.semester) return false;
    if (filter.project && !student.projects.includes(filter.project)) return false;
    if (filter.minIra && student.ira < filter.minIra) return false;
    if (filter.hardSkill && !student.hardSkills.includes(filter.hardSkill)) return false;
    if (filter.engagement && student.engagement !== filter.engagement) return false;
    return true;
  });
}

export function calculateClassMetrics() {
  const totalStudents = mockStudents.length;
  const avgIra = mockStudents.reduce((sum, s) => sum + s.ira, 0) / totalStudents;
  const totalFailed = mockStudents.reduce((sum, s) => sum + s.failedCourses, 0);
  const studentsInProjects = mockStudents.filter((s) => s.projects.length > 0).length;
  const avgEvents = mockStudents.reduce((sum, s) => sum + s.eventParticipation, 0) / totalStudents;

  return {
    totalStudents,
    avgIra: Number(avgIra.toFixed(2)),
    totalFailed,
    studentsInProjects,
    avgEvents: Number(avgEvents.toFixed(1)),
  };
}
