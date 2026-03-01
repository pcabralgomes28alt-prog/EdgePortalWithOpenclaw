import { Layout } from '../../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { useAuth } from '../../context/AuthContext';
import { mockStudents } from '../../data/mockData';
import { 
  GraduationCap, 
  Code, 
  Users, 
  TrendingUp, 
  Calendar,
  Award,
  BookOpen,
  GitBranch,
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from 'recharts';

export function StudentDashboard() {
  const { user } = useAuth();
  const student = mockStudents.find((s) => s.id === user?.id) || mockStudents[0];

  const softSkillsData = student.softSkills.map((skill) => ({
    skill: skill.name,
    score: skill.score,
  }));

  const academicEvolution = [
    { period: '1º Sem', ira: 7.5 },
    { period: '2º Sem', ira: 7.8 },
    { period: '3º Sem', ira: 8.0 },
    { period: '4º Sem', ira: 8.2 },
    { period: 'Atual', ira: student.ira },
  ];

  const statsCards = [
    {
      title: 'IRA',
      value: student.ira.toFixed(1),
      change: student.previousIra ? `+${(student.ira - student.previousIra).toFixed(1)}` : null,
      icon: GraduationCap,
      color: 'blue',
    },
    {
      title: 'Projetos',
      value: student.projects.length.toString(),
      icon: Code,
      color: 'purple',
    },
    {
      title: 'Hard Skills',
      value: student.hardSkills.length.toString(),
      icon: Award,
      color: 'green',
    },
    {
      title: 'Eventos',
      value: student.eventParticipation.toString(),
      icon: Calendar,
      color: 'orange',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visão 360°</h1>
          <p className="text-gray-600 mt-1">Seu desempenho acadêmico, técnico e social</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        {stat.change && (
                          <span className="text-sm font-medium text-green-600">{stat.change}</span>
                        )}
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                      <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs for Different Views */}
        <Tabs defaultValue="geral" className="space-y-4">
          <TabsList>
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="academico">Acadêmico</TabsTrigger>
            <TabsTrigger value="tecnico">Técnico</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="geral" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Evolução do IRA</CardTitle>
                  <CardDescription>Seu desempenho acadêmico ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={academicEvolution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="ira" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Soft Skills</CardTitle>
                  <CardDescription>Avaliação de competências comportamentais</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={softSkillsData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis domain={[0, 10]} />
                      <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Indicadores de Engajamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Cumprimento de Prazos</span>
                    <span className="text-gray-600">{student.deadlineCompliance}%</span>
                  </div>
                  <Progress value={student.deadlineCompliance} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Relatórios Mensais Enviados</span>
                    <span className="text-gray-600">
                      {student.monthlyReports.filter((r) => r.submitted).length}/
                      {student.monthlyReports.length}
                    </span>
                  </div>
                  <Progress 
                    value={(student.monthlyReports.filter((r) => r.submitted).length / student.monthlyReports.length) * 100} 
                  />
                </div>
                <div className="pt-2">
                  <span className="text-sm font-medium">Status de Engajamento: </span>
                  <Badge 
                    variant={student.engagement === 'high' ? 'default' : student.engagement === 'medium' ? 'secondary' : 'destructive'}
                  >
                    {student.engagement === 'high' ? 'Alto' : student.engagement === 'medium' ? 'Médio' : 'Baixo'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Tab */}
          <TabsContent value="academico" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Acadêmicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Curso:</span>
                    <span className="font-medium">{student.course}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Período:</span>
                    <span className="font-medium">{student.semester}º Semestre</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IRA Atual:</span>
                    <span className="font-medium">{student.ira.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IRA Anterior:</span>
                    <span className="font-medium">{student.previousIra?.toFixed(2) || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reprovações:</span>
                    <span className="font-medium">{student.failedCourses}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horário de Aulas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {student.schedule.map((course) => (
                      <div key={course.code} className="border-l-4 border-blue-500 pl-3 py-2">
                        <div className="font-medium text-sm">{course.name}</div>
                        <div className="text-xs text-gray-600">{course.code}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {course.day} • {course.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Technical Tab */}
          <TabsContent value="tecnico" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Hard Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {student.hardSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Trilhas de Aprendizado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {student.tracks.map((track) => (
                      <div key={track} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm">{track}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="w-5 h-5" />
                    Projetos Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {student.projects.map((project) => (
                      <div key={project} className="border-l-4 border-purple-500 pl-3 py-2">
                        <div className="font-medium text-sm">{project}</div>
                        <Badge variant="outline" className="mt-1">Em andamento</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Idiomas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {student.languages.map((lang) => (
                      <div key={lang.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-gray-600 capitalize">{lang.level}</span>
                        </div>
                        <Progress 
                          value={
                            lang.level === 'basic' ? 25 :
                            lang.level === 'intermediate' ? 50 :
                            lang.level === 'advanced' ? 75 : 100
                          } 
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Soft Skills Detalhadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={softSkillsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="skill" angle={-45} textAnchor="end" height={100} />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Participação em Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-5xl font-bold text-blue-600 mb-2">
                      {student.eventParticipation}
                    </div>
                    <p className="text-gray-600">Eventos participados</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Pontos Fortes e Áreas de Melhoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Pontos Fortes
                      </h4>
                      <div className="space-y-2">
                        {student.softSkills
                          .filter((s) => s.score >= 8)
                          .map((skill) => (
                            <div key={skill.name} className="flex items-center gap-2">
                              <Badge variant="default">{skill.score}/10</Badge>
                              <span className="text-sm">{skill.name}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-700 mb-3">Áreas de Melhoria</h4>
                      <div className="space-y-2">
                        {student.softSkills
                          .filter((s) => s.score < 8)
                          .map((skill) => (
                            <div key={skill.name} className="flex items-center gap-2">
                              <Badge variant="secondary">{skill.score}/10</Badge>
                              <span className="text-sm">{skill.name}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
