import { GoogleGenerativeAI } from '@google/generative-ai';

// Chave API do Gemini - configure no .env como VITE_GEMINI_API_KEY
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAov47Z8JjnG9LEGSIjpE5UA9lua4LC1VE';

const genAI = new GoogleGenerativeAI(API_KEY);

export interface Student {
  id: string;
  name: string;
  email: string;
  photo: string;
  semester: number;
  course: string;
  enrollmentDate: string;
  ira: number;
  previousIra?: number;
  failedCourses: number;
  schedule: Array<{ code: string; name: string; day: string; time: string; professor: string }>;
  hardSkills: string[];
  tracks: string[];
  projects: string[];
  languages: Array<{ name: string; level: string }>;
  githubRepos?: number;
  softSkills: Array<{ name: string; score: number }>;
  eventParticipation: number;
  engagement: 'high' | 'medium' | 'low';
  monthlyReports: Array<{ month: string; year: number; submitted: boolean; submittedAt?: string; content?: string; evidences?: string[] }>;
  deadlineCompliance: number;
}

/**
 * Filtra alunos usando Gemini AI com linguagem natural
 * @param query Consulta em linguagem natural (ex: "alunos com IRA acima de 8")
 * @param students Lista de alunos para filtrar
 * @returns Promise com IDs dos alunos que correspondem ao critério
 */
export async function filterStudentsWithAI(query: string, students: Student[]): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Criar resumo dos dados dos alunos para enviar ao Gemini
    const studentsSummary = students.map(s => ({
      id: s.id,
      name: s.name,
      course: s.course,
      semester: s.semester,
      ira: s.ira,
      failedCourses: s.failedCourses,
      hardSkills: s.hardSkills,
      projects: s.projects.length,
      eventParticipation: s.eventParticipation,
      engagement: s.engagement,
      deadlineCompliance: s.deadlineCompliance,
      languages: s.languages.map(l => l.name),
      softSkills: s.softSkills
    }));

    const prompt = `Você é um assistente que ajuda a filtrar alunos com base em critérios.

DADOS DOS ALUNOS (JSON):
${JSON.stringify(studentsSummary, null, 2)}

CONSULTA DO USUÁRIO:
"${query}"

Analise a consulta e retorne APENAS um array JSON com os IDs dos alunos que correspondem ao critério.
Exemplo de resposta: ["1", "2", "3"]

REGRAS:
- Retorne APENAS o array JSON, sem explicações
- Se nenhum aluno corresponder, retorne []
- Interprete a consulta em linguagem natural
- Considere IRA, período/semestre, projetos, skills, engajamento, etc.

RESPONDA APENAS COM O ARRAY JSON:`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extrair JSON da resposta
    const jsonMatch = text.match(/\[[\s\S]*?\]/);
    if (jsonMatch) {
      const ids = JSON.parse(jsonMatch[0]);
      return ids.filter((id: unknown): id is string => typeof id === 'string');
    }

    return [];
  } catch (error) {
    console.error('Erro ao filtrar com Gemini:', error);
    throw error;
  }
}
