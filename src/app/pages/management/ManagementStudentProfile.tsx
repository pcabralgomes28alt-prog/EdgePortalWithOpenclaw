import { useParams, Link } from 'react-router';
import { Layout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { getStudentById } from '../../data/mockData';
import { ArrowLeft, Download } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export function ManagementStudentProfile() {
  const { id } = useParams();
  const student = getStudentById(id || '');

  if (!student) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Aluno não encontrado.</p>
          <Link to="/management/students">
            <Button className="mt-4">Voltar para Alunos</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const academicEvolution = [
    { period: '1º', ira: 7.5 },
    { period: '2º', ira: 7.8 },
    { period: '3º', ira: 8.0 },
    { period: '4º', ira: student.previousIra || 8.2 },
    { period: 'Atual', ira: student.ira },
  ];

  const softSkillsData = student.softSkills.map((skill) => ({
    skill: skill.name,
    score: skill.score,
  }));

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/management/students">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Perfil do Aluno</h1>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
        </div>

        {/* Student Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <img
                src={student.photo}
                alt={student.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                <p className="text-gray-600">{student.email}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600">Curso</p>
                    <p className="font-medium">{student.course}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Período</p>
                    <p className="font-medium">{student.semester}º Semestre</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">IRA</p>
                    <p className="font-medium text-xl">{student.ira.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Engajamento</p>
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="academico" className="space-y-4">
          <TabsList>
            <TabsTrigger value="academico">Acadêmico</TabsTrigger>
            <TabsTrigger value="tecnico">Técnico</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          {/* Academic Tab */}
          <TabsContent value="academico" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Evolução do IRA</CardTitle>
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
                  <CardTitle>Indicadores Acadêmicos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>IRA Atual</span>
                      <span className="font-bold">{student.ira.toFixed(2)}</span>
                    </div>
                    <Progress value={(student.ira / 10) * 100} />
                  </div>
                  {student.previousIra && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>IRA Anterior</span>
                        <span className="font-bold">{student.previousIra.toFixed(2)}</span>
                      </div>
                      <Progress value={(student.previousIra / 10) * 100} />
                    </div>
                  )}
                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Reprovações</span>
                      <span className="font-medium">{student.failedCourses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Matrícula desde</span>
                      <span className="font-medium">
                        {new Date(student.enrollmentDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Horário de Aulas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {student.schedule.map((course) => (
                      <div key={course.code} className="border-l-4 border-blue-500 pl-3 py-2">
                        <div className="font-medium">{course.name}</div>
                        <div className="text-sm text-gray-600">{course.code}</div>
                        <div className="text-sm text-gray-500 mt-1">
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
                  <CardTitle>Hard Skills</CardTitle>
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
                  <CardTitle>Trilhas de Aprendizado</CardTitle>
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

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Projetos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {student.projects.map((project) => (
                      <div key={project} className="border-l-4 border-purple-500 pl-3 py-2">
                        <div className="font-medium">{project}</div>
                        <Badge variant="outline" className="mt-1">
                          Ativo
                        </Badge>
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
                            lang.level === 'basic'
                              ? 25
                              : lang.level === 'intermediate'
                              ? 50
                              : lang.level === 'advanced'
                              ? 75
                              : 100
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Repositórios GitHub</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold text-gray-900">
                      {student.githubRepos || 0}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Repositórios públicos</p>
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
                  <CardTitle>Soft Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={softSkillsData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis domain={[0, 10]} />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

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
                  <CardTitle>Participação em Eventos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-5xl font-bold text-blue-600">
                      {student.eventParticipation}
                    </div>
                    <p className="text-gray-600 mt-2">Eventos participados</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pontos Fortes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {student.softSkills
                      .filter((s) => s.score >= 8)
                      .map((skill) => (
                        <div key={skill.name} className="flex items-center justify-between">
                          <span className="text-sm">{skill.name}</span>
                          <Badge variant="default">{skill.score}/10</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="relatorios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Mensais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {student.monthlyReports.map((report) => (
                    <div
                      key={`${report.month}-${report.year}`}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">
                          {report.month}/{report.year}
                        </h4>
                        {report.submitted && report.submittedAt && (
                          <p className="text-sm text-gray-600">
                            Enviado em {new Date(report.submittedAt).toLocaleDateString('pt-BR')}
                          </p>
                        )}
                        {report.content && (
                          <p className="text-sm text-gray-600 mt-2">{report.content}</p>
                        )}
                      </div>
                      <Badge variant={report.submitted ? 'default' : 'destructive'}>
                        {report.submitted ? 'Enviado' : 'Pendente'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taxa de Cumprimento de Prazos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Progress value={student.deadlineCompliance} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {student.deadlineCompliance}%
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
