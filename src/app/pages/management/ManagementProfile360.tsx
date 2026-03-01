import { useParams, Link } from 'react-router';
import { Layout } from '../../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { getStudentById } from '../../data/mockData';
import { ArrowLeft, Brain, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';

export function ManagementProfile360() {
  const { id } = useParams();
  const student = getStudentById(id || '');

  if (!student) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Aluno não encontrado.</p>
        </div>
      </Layout>
    );
  }

  // Calculate correlations
  const avgSoftSkill = student.softSkills.reduce((sum, s) => sum + s.score, 0) / student.softSkills.length;
  const technicalProductivity = student.projects.length + student.hardSkills.length / 5;

  // AI Insights
  const insights = [];
  
  if (student.ira >= 8.5 && student.projects.length >= 2) {
    insights.push({
      type: 'success',
      title: 'Alto Desempenho Integrado',
      description: 'Excelente correlação entre desempenho acadêmico e produção técnica.',
    });
  }

  if (student.ira < 7.5 && student.projects.length === 0) {
    insights.push({
      type: 'warning',
      title: 'Risco de Desengajamento',
      description: 'IRA abaixo da média e ausência de participação em projetos. Recomenda-se mentoria individual.',
    });
  }

  if (avgSoftSkill >= 8 && student.eventParticipation >= 10) {
    insights.push({
      type: 'success',
      title: 'Forte Perfil Social',
      description: 'Alta pontuação em soft skills correlacionada com participação ativa em eventos.',
    });
  }

  if (student.deadlineCompliance < 70) {
    insights.push({
      type: 'alert',
      title: 'Atenção: Cumprimento de Prazos',
      description: 'Taxa de entrega abaixo do esperado. Considerar acompanhamento mais próximo.',
    });
  }

  if (student.hardSkills.length >= 5 && student.ira >= 8.0) {
    insights.push({
      type: 'success',
      title: 'Perfil Técnico Forte',
      description: 'Domínio de múltiplas tecnologias aliado a bom desempenho acadêmico.',
    });
  }

  // 360° Data
  const profile360Data = [
    { subject: 'Acadêmico', A: (student.ira / 10) * 100, fullMark: 100 },
    { subject: 'Técnico', A: (student.projects.length / 3) * 100, fullMark: 100 },
    { subject: 'Social', A: avgSoftSkill * 10, fullMark: 100 },
    { subject: 'Engajamento', A: student.eventParticipation * 5, fullMark: 100 },
    { subject: 'Prazos', A: student.deadlineCompliance, fullMark: 100 },
  ];

  // Correlation scatter data
  const correlationData = [
    {
      ira: student.ira,
      projects: student.projects.length,
      name: student.name.split(' ')[0],
    },
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">Perfil 360°</h1>
            <p className="text-gray-600">Análise integrada e insights gerados por IA</p>
          </div>
        </div>

        {/* Student Summary */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <img
                src={student.photo}
                alt={student.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
                <p className="text-gray-600">
                  {student.course} • {student.semester}º Período • IRA {student.ira.toFixed(2)}
                </p>
              </div>
              <Badge
                variant={
                  student.engagement === 'high'
                    ? 'default'
                    : student.engagement === 'medium'
                    ? 'secondary'
                    : 'destructive'
                }
                className="text-lg px-4 py-2"
              >
                Engajamento{' '}
                {student.engagement === 'high' ? 'Alto' : student.engagement === 'medium' ? 'Médio' : 'Baixo'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border-purple-200">
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              Insights Gerados por IA
            </CardTitle>
            <CardDescription>Análise automática de padrões e correlações</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`flex gap-4 p-4 rounded-lg ${
                    insight.type === 'success'
                      ? 'bg-green-50 border border-green-200'
                      : insight.type === 'warning'
                      ? 'bg-yellow-50 border border-yellow-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  {insight.type === 'success' ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : insight.type === 'warning' ? (
                    <TrendingUp className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 360° Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Visão 360° Integrada</CardTitle>
            <CardDescription>Análise consolidada de todos os eixos de desempenho</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={profile360Data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  name={student.name}
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Impacto Acadêmico → Técnico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">IRA</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{student.ira.toFixed(1)}</span>
                    {student.previousIra && (
                      <span className="text-sm text-green-600">
                        +{(student.ira - student.previousIra).toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Projetos Técnicos</p>
                  <span className="text-3xl font-bold">{student.projects.length}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Hard Skills</p>
                  <span className="text-3xl font-bold">{student.hardSkills.length}</span>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium">
                    {student.ira >= 8 && student.projects.length >= 2
                      ? '✅ Correlação positiva forte'
                      : student.ira >= 7 && student.projects.length >= 1
                      ? '⚠️ Correlação moderada'
                      : '🔴 Necessita atenção'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Soft Skills → Produtividade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Média Soft Skills</p>
                  <span className="text-3xl font-bold">{avgSoftSkill.toFixed(1)}/10</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Participação em Eventos</p>
                  <span className="text-3xl font-bold">{student.eventParticipation}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Cumprimento de Prazos</p>
                  <span className="text-3xl font-bold">{student.deadlineCompliance}%</span>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium">
                    {avgSoftSkill >= 8 && student.deadlineCompliance >= 80
                      ? '✅ Alta produtividade'
                      : avgSoftSkill >= 6 && student.deadlineCompliance >= 60
                      ? '⚠️ Produtividade moderada'
                      : '🔴 Necessita suporte'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Indicadores Consolidados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm font-medium">Desempenho Acadêmico</span>
                  <Badge variant={student.ira >= 8 ? 'default' : student.ira >= 7 ? 'secondary' : 'destructive'}>
                    {student.ira >= 8 ? 'Excelente' : student.ira >= 7 ? 'Bom' : 'Precisa Melhorar'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <span className="text-sm font-medium">Capacidade Técnica</span>
                  <Badge
                    variant={
                      student.hardSkills.length >= 5 ? 'default' : student.hardSkills.length >= 3 ? 'secondary' : 'destructive'
                    }
                  >
                    {student.hardSkills.length >= 5 ? 'Avançado' : student.hardSkills.length >= 3 ? 'Intermediário' : 'Iniciante'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm font-medium">Perfil Social</span>
                  <Badge
                    variant={
                      avgSoftSkill >= 8 ? 'default' : avgSoftSkill >= 6 ? 'secondary' : 'destructive'
                    }
                  >
                    {avgSoftSkill >= 8 ? 'Destaque' : avgSoftSkill >= 6 ? 'Adequado' : 'Em Desenvolvimento'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                  <span className="text-sm font-medium">Engajamento Geral</span>
                  <Badge
                    variant={
                      student.engagement === 'high' ? 'default' : student.engagement === 'medium' ? 'secondary' : 'destructive'
                    }
                  >
                    {student.engagement === 'high' ? 'Alto' : student.engagement === 'medium' ? 'Médio' : 'Baixo'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              Recomendações Estratégicas
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {student.ira < 7.5 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm font-medium">📚 Fortalecer base acadêmica através de monitoria ou grupos de estudo</p>
                </div>
              )}
              {student.projects.length < 2 && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm font-medium">💻 Incentivar participação em projetos práticos e hackathons</p>
                </div>
              )}
              {avgSoftSkill < 7 && (
                <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                  <p className="text-sm font-medium">🤝 Desenvolver soft skills através de workshops e dinâmicas em grupo</p>
                </div>
              )}
              {student.deadlineCompliance < 70 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-sm font-medium">⏰ Implementar acompanhamento semanal para melhorar gestão de tempo</p>
                </div>
              )}
              {student.ira >= 8 && student.projects.length >= 2 && avgSoftSkill >= 8 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm font-medium">🌟 Perfil completo! Candidato ideal para posições de liderança e mentoria</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
