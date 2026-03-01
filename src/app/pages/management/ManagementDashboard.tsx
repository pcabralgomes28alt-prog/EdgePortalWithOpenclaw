import { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { mockStudents, calculateClassMetrics } from '../../data/mockData';
import { Users, TrendingUp, AlertTriangle, Award, Calendar } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export function ManagementDashboard() {
  const [selectedSemester, setSelectedSemester] = useState<string>('all');

  const filteredStudents = selectedSemester === 'all' 
    ? mockStudents 
    : mockStudents.filter((s) => s.semester === parseInt(selectedSemester));

  const metrics = calculateClassMetrics();

  const iraDistribution = [
    { range: '0-5', count: filteredStudents.filter((s) => s.ira < 5).length },
    { range: '5-7', count: filteredStudents.filter((s) => s.ira >= 5 && s.ira < 7).length },
    { range: '7-8', count: filteredStudents.filter((s) => s.ira >= 7 && s.ira < 8).length },
    { range: '8-9', count: filteredStudents.filter((s) => s.ira >= 8 && s.ira < 9).length },
    { range: '9-10', count: filteredStudents.filter((s) => s.ira >= 9).length },
  ];

  const engagementData = [
    { name: 'Alto', value: filteredStudents.filter((s) => s.engagement === 'high').length },
    { name: 'Médio', value: filteredStudents.filter((s) => s.engagement === 'medium').length },
    { name: 'Baixo', value: filteredStudents.filter((s) => s.engagement === 'low').length },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const atRiskStudents = filteredStudents.filter(
    (s) => s.ira < 7 || s.engagement === 'low' || s.deadlineCompliance < 60
  );

  const filteredMetrics = {
    totalStudents: filteredStudents.length,
    avgIra: filteredStudents.length > 0 ? (filteredStudents.reduce((sum, s) => sum + s.ira, 0) / filteredStudents.length).toFixed(1) : '0',
    studentsInProjects: filteredStudents.filter((s) => s.projects.length > 0).length,
    avgEvents: filteredStudents.length > 0 ? (filteredStudents.reduce((sum, s) => sum + s.eventParticipation, 0) / filteredStudents.length).toFixed(1) : '0',
    totalFailed: filteredStudents.reduce((sum, s) => sum + s.failedCourses, 0),
  };

  const statsCards = [
    {
      title: 'Total de Alunos',
      value: filteredMetrics.totalStudents.toString(),
      icon: Users,
      color: 'blue',
    },
    {
      title: 'IRA Médio da Turma',
      value: filteredMetrics.avgIra.toString(),
      icon: TrendingUp,
      color: 'green',
    },
    {
      title: 'Alunos em Projetos',
      value: `${filteredMetrics.studentsInProjects}/${filteredMetrics.totalStudents}`,
      icon: Award,
      color: 'purple',
    },
    {
      title: 'Alunos em Risco',
      value: atRiskStudents.length.toString(),
      icon: AlertTriangle,
      color: 'red',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Gestão</h1>
            <p className="text-gray-600 mt-1">Visão geral do desempenho da turma</p>
          </div>
          <div className="w-48">
            <label className="text-sm font-medium text-gray-600 block mb-2">Filtrar por Turma</label>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma turma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Turmas</SelectItem>
                <SelectItem value="3">3º Período</SelectItem>
                <SelectItem value="4">4º Período</SelectItem>
                <SelectItem value="5">5º Período</SelectItem>
                <SelectItem value="6">6º Período</SelectItem>
                <SelectItem value="7">7º Período</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de IRA</CardTitle>
              <CardDescription>Quantidade de alunos por faixa de desempenho</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={iraDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engajamento dos Alunos</CardTitle>
              <CardDescription>Classificação por nível de participação</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* At Risk Students */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Alunos em Situação de Risco
            </CardTitle>
            <CardDescription>
              Alunos com IRA abaixo de 7, baixo engajamento ou cumprimento de prazos inferior a 60%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {atRiskStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">
                        {student.course} • {student.semester}º Período
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">IRA: {student.ira}</p>
                      <p className="text-sm text-gray-600">
                        Prazos: {student.deadlineCompliance}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Reprovações Totais</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{filteredMetrics.totalFailed}</p>
              <p className="text-sm text-gray-600 mt-1">
                Média de {filteredMetrics.totalStudents > 0 ? (filteredMetrics.totalFailed / filteredMetrics.totalStudents).toFixed(1) : '0'} por aluno
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Participação em Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{filteredMetrics.avgEvents}</p>
              <p className="text-sm text-gray-600 mt-1">Média de eventos por aluno</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hard Skills Únicas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">
                {new Set(filteredStudents.flatMap((s) => s.hardSkills)).size}
              </p>
              <p className="text-sm text-gray-600 mt-1">Tecnologias dominadas pela turma</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
