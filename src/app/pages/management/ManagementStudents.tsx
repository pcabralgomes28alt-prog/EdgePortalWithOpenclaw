import { useState } from 'react';
import { Link } from 'react-router';
import { Layout } from '../../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { mockStudents, getStudentsByFilter } from '../../data/mockData';
import { Search, Sparkles, Eye, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../../components/ui/dialog';
import { Student } from '../../data/mockData';
import { filterStudentsWithAI } from '../../services/geminiService';

export function ManagementStudents() {
  // list of students that can be modified locally
  const [students, setStudents] = useState<Student[]>(mockStudents);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSemester, setFilterSemester] = useState<string>('all');
  const [filterEngagement, setFilterEngagement] = useState<string>('all');
  const [aiQuery, setAiQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // state used by "new student" dialog
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    email: '',
    photo: '',
    semester: 3,
    course: '',
    enrollmentDate: '',
  });

  const handleSimpleFilter = () => {
    let results = students;

    if (searchTerm) {
      results = results.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterSemester !== 'all') {
      results = results.filter((s) => s.semester === parseInt(filterSemester));
    }

    if (filterEngagement !== 'all') {
      results = results.filter((s) => s.engagement === filterEngagement);
    }

    setFilteredStudents(results);
  };

  // create student helpers
  const handleCreateStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.course || !newStudent.enrollmentDate) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const student: Student = {
      id: (Date.now() + Math.random()).toString(),
      name: newStudent.name as string,
      email: newStudent.email as string,
      photo:
        newStudent.photo ||
        'https://via.placeholder.com/150.png?text=Aluno',
      semester: newStudent.semester as number,
      course: newStudent.course as string,
      enrollmentDate: newStudent.enrollmentDate as string,

      ira: 0,
      failedCourses: 0,
      schedule: [],
      hardSkills: [],
      tracks: [],
      projects: [],
      languages: [],
      softSkills: [],
      eventParticipation: 0,
      engagement: 'medium',
      monthlyReports: [],
      deadlineCompliance: 0,
    };

    setStudents((prev) => [...prev, student]);
    setFilteredStudents((prev) => [...prev, student]);
    toast.success('Aluno criado com sucesso!');
    setIsNewDialogOpen(false);
    setNewStudent({ name: '', email: '', photo: '', semester: 3, course: '', enrollmentDate: '' });
  };

  const handleAIFilter = async () => {
    if (!aiQuery.trim()) {
      toast.error('Digite uma consulta para filtrar');
      return;
    }

    setIsLoadingAI(true);
    toast.info('Consultando Gemini AI...');

    try {
      const matchingIds = await filterStudentsWithAI(aiQuery, students);
      
      const results = students.filter((s) => matchingIds.includes(s.id));
      
      setFilteredStudents(results);
      
      if (results.length > 0) {
        toast.success(`${results.length} aluno(s) encontrado(s) com Gemini AI`);
      } else {
        toast.warning('Nenhum aluno corresponde aos critérios');
      }
    } catch (error) {
      console.error('Erro no filtro AI:', error);
      toast.error('Erro ao processar consulta. Verifique a chave API do Gemini.');
      
      // Fallback: filtro local simples
      let fallbackResults = students;
      const queryLower = aiQuery.toLowerCase();
      
      if (queryLower.includes('ira') && queryLower.includes('acima')) {
        const match = aiQuery.match(/(\d+)/);
        if (match) {
          const minIra = parseFloat(match[1]);
          fallbackResults = fallbackResults.filter((s) => s.ira >= minIra);
        }
      }
      if (queryLower.includes('projeto')) {
        fallbackResults = fallbackResults.filter((s) => s.projects.length > 0);
      }
      if (queryLower.includes('react')) {
        fallbackResults = fallbackResults.filter((s) => 
          s.hardSkills.some((skill) => skill.toLowerCase().includes('react'))
        );
      }
      
      setFilteredStudents(fallbackResults);
      toast.info(`Filtro local aplicado: ${fallbackResults.length} aluno(s)`);
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alunos</h1>
            <p className="text-gray-600 mt-1">Gerencie e visualize informações dos alunos</p>
          </div>
      
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros Simples</CardTitle>
            <CardDescription>Filtre alunos por critérios básicos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={filterSemester} onValueChange={setFilterSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Períodos</SelectItem>
                  <SelectItem value="3">3º Período</SelectItem>
                  <SelectItem value="4">4º Período</SelectItem>
                  <SelectItem value="5">5º Período</SelectItem>
                  <SelectItem value="6">6º Período</SelectItem>
                  <SelectItem value="7">7º Período</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterEngagement} onValueChange={setFilterEngagement}>
                <SelectTrigger>
                  <SelectValue placeholder="Engajamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="high">Alto</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="low">Baixo</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSimpleFilter}>
                <Search className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Filter */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Filtro Inteligente com IA (Gemini)
            </CardTitle>
            <CardDescription>
              Use linguagem natural para filtrar. Exemplo: "Alunos do 3º período com IRA acima de 8, que participam de projeto e possuem React"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua consulta em linguagem natural..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="bg-white"
                onKeyDown={(e) => e.key === 'Enter' && handleAIFilter()}
                disabled={isLoadingAI}
              />
              <Button 
                onClick={handleAIFilter} 
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isLoadingAI}
              >
                {isLoadingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Filtrar com IA
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h3 className="font-bold text-lg text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {student.course} • {student.semester}º Período
                  </p>

                  <div className="w-full space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">IRA:</span>
                      <span className="font-bold">{student.ira.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Projetos:</span>
                      <span>{student.projects.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Engajamento:</span>
                      <Badge
                        variant={
                          student.engagement === 'high'
                            ? 'default'
                            : student.engagement === 'medium'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {student.engagement === 'high'
                          ? 'Alto'
                          : student.engagement === 'medium'
                          ? 'Médio'
                          : 'Baixo'}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Link to={`/management/students/${student.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        Perfil
                      </Button>
                    </Link>
                    <Link to={`/management/profile360/${student.id}`} className="flex-1">
                      <Button className="w-full">360°</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">Nenhum aluno encontrado com os filtros aplicados.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
