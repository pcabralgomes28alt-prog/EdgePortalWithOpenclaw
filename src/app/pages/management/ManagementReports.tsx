import { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { mockStudents, calculateClassMetrics } from '../../data/mockData';
import { FileText, Download, Sparkles, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export function ManagementReports() {
  const [reportType, setReportType] = useState('class');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedReport, setGeneratedReport] = useState('');

  const metrics = calculateClassMetrics();

  const handleGenerateReport = () => {
    if (reportType === 'student' && !selectedStudent) {
      toast.error('Selecione um aluno');
      return;
    }

    let report = '';

    if (reportType === 'class' && selectedClass) {
     
//Modificado apenas até total de reprovações
      const alunosTurma = mockStudents.filter((item)=> item.semester == selectedClass)
      report = `RELATÓRIO CONSOLIDADO DA TURMA
      
Data: ${new Date().toLocaleDateString('pt-BR')}

=== MÉTRICAS GERAIS DA TURMA ===
Total de Alunos: ${alunosTurma.length}
IRA Médio: ${alunosTurma.reduce((act, item)=>{
  act += item.ira;
  return act
},0) / alunosTurma.length}
Alunos em Projetos: ${alunosTurma.length}/${alunosTurma.length}
Participação Média em Eventos: ${alunosTurma.reduce((act, item)=>{
  act += item.eventParticipation;
  return act
},0) / alunosTurma.length} eventos/aluno
Total de Reprovações: ${alunosTurma.reduce((act, item)=>{
  act += item.failedCourses;
  return act
},0)}

=== ANÁLISE DE DESEMPENHO ===
Alunos com IRA >= 8.0: ${mockStudents.filter((s) => s.ira >= 8).length}
Alunos com IRA 7.0-7.9: ${mockStudents.filter((s) => s.ira >= 7 && s.ira < 8).length}
Alunos com IRA < 7.0: ${mockStudents.filter((s) => s.ira < 7).length}

=== ENGAJAMENTO ===
Alto: ${mockStudents.filter((s) => s.engagement === 'high').length} alunos
Médio: ${mockStudents.filter((s) => s.engagement === 'medium').length} alunos
Baixo: ${mockStudents.filter((s) => s.engagement === 'low').length} alunos

=== TECNOLOGIAS DOMINADAS ===
Total de Hard Skills Únicas: ${new Set(mockStudents.flatMap((s) => s.hardSkills)).size}
Tecnologias Mais Comuns: ${
  Array.from(new Set(mockStudents.flatMap((s) => s.hardSkills)))
    .slice(0, 5)
    .join(', ')
}

=== RECOMENDAÇÕES ===
• Média de IRA está ${metrics.avgIra >= 8 ? 'excelente' : metrics.avgIra >= 7 ? 'boa, mas pode melhorar' : 'abaixo do esperado'}
• ${metrics.studentsInProjects} alunos estão alocados em projetos práticos
• Considerar ações para aumentar engajamento dos ${mockStudents.filter((s) => s.engagement === 'low').length} alunos com baixo engajamento
• Taxa de participação em eventos está ${metrics.avgEvents >= 10 ? 'excelente' : metrics.avgEvents >= 5 ? 'adequada' : 'necessita melhoria'}

---
Relatório gerado automaticamente em ${new Date().toLocaleString('pt-BR')}`;
    }

    if (reportType === 'class' && selectedClass == "todos") {
      report = `RELATÓRIO CONSOLIDADO DA TURMA
      
Data: ${new Date().toLocaleDateString('pt-BR')}

=== MÉTRICAS GERAIS ===
Total de Alunos: ${metrics.totalStudents}
IRA Médio: ${metrics.avgIra}
Alunos em Projetos: ${metrics.studentsInProjects}/${metrics.totalStudents}
Participação Média em Eventos: ${metrics.avgEvents} eventos/aluno
Total de Reprovações: ${metrics.totalFailed}

=== ANÁLISE DE DESEMPENHO ===
Alunos com IRA >= 8.0: ${mockStudents.filter((s) => s.ira >= 8).length}
Alunos com IRA 7.0-7.9: ${mockStudents.filter((s) => s.ira >= 7 && s.ira < 8).length}
Alunos com IRA < 7.0: ${mockStudents.filter((s) => s.ira < 7).length}

=== ENGAJAMENTO ===
Alto: ${mockStudents.filter((s) => s.engagement === 'high').length} alunos
Médio: ${mockStudents.filter((s) => s.engagement === 'medium').length} alunos
Baixo: ${mockStudents.filter((s) => s.engagement === 'low').length} alunos

=== TECNOLOGIAS DOMINADAS ===
Total de Hard Skills Únicas: ${new Set(mockStudents.flatMap((s) => s.hardSkills)).size}
Tecnologias Mais Comuns: ${
  Array.from(new Set(mockStudents.flatMap((s) => s.hardSkills)))
    .slice(0, 5)
    .join(', ')
}

=== RECOMENDAÇÕES ===
• Média de IRA está ${metrics.avgIra >= 8 ? 'excelente' : metrics.avgIra >= 7 ? 'boa, mas pode melhorar' : 'abaixo do esperado'}
• ${metrics.studentsInProjects} alunos estão alocados em projetos práticos
• Considerar ações para aumentar engajamento dos ${mockStudents.filter((s) => s.engagement === 'low').length} alunos com baixo engajamento
• Taxa de participação em eventos está ${metrics.avgEvents >= 10 ? 'excelente' : metrics.avgEvents >= 5 ? 'adequada' : 'necessita melhoria'}

---
Relatório gerado automaticamente em ${new Date().toLocaleString('pt-BR')}`;
    } else {
      const student = mockStudents.find((s) => s.id === selectedStudent);
      if (student) {
        const avgSoftSkill = student.softSkills.reduce((sum, s) => sum + s.score, 0) / student.softSkills.length;
        
        report = `RELATÓRIO INDIVIDUAL DO ALUNO

Nome: ${student.name}
Curso: ${student.course}
Período: ${student.semester}º Semestre
Email: ${student.email}

=== DESEMPENHO ACADÊMICO ===
IRA Atual: ${student.ira.toFixed(2)}
${student.previousIra ? `IRA Anterior: ${student.previousIra.toFixed(2)} (${student.ira > student.previousIra ? '+' : ''}${(student.ira - student.previousIra).toFixed(2)})` : ''}
Reprovações: ${student.failedCourses}
Matrícula desde: ${new Date(student.enrollmentDate).toLocaleDateString('pt-BR')}

=== CAPACIDADE TÉCNICA ===
Hard Skills (${student.hardSkills.length}): ${student.hardSkills.join(', ')}
Trilhas: ${student.tracks.join(', ')}
Projetos Ativos (${student.projects.length}): ${student.projects.join(', ')}
Repositórios GitHub: ${student.githubRepos || 'N/A'}

=== IDIOMAS ===
${student.languages.map((lang) => `${lang.name}: ${lang.level}`).join('\n')}

=== SOFT SKILLS ===
Média Geral: ${avgSoftSkill.toFixed(1)}/10
${student.softSkills.map((skill) => `${skill.name}: ${skill.score}/10`).join('\n')}

=== ENGAJAMENTO ===
Participação em Eventos: ${student.eventParticipation}
Cumprimento de Prazos: ${student.deadlineCompliance}%
Relatórios Mensais Enviados: ${student.monthlyReports.filter((r) => r.submitted).length}/${student.monthlyReports.length}
Nível de Engajamento: ${student.engagement === 'high' ? 'Alto' : student.engagement === 'medium' ? 'Médio' : 'Baixo'}

=== ANÁLISE E RECOMENDAÇÕES ===
${student.ira >= 8.5 ? '✅ Desempenho acadêmico excelente' : student.ira >= 7 ? '⚠️ Desempenho acadêmico adequado, mas com potencial de melhoria' : '🔴 Necessita suporte acadêmico urgente'}
${student.projects.length >= 2 ? '✅ Boa participação em projetos práticos' : '⚠️ Recomenda-se maior envolvimento em projetos'}
${avgSoftSkill >= 8 ? '✅ Excelentes soft skills' : avgSoftSkill >= 6 ? '⚠️ Soft skills adequadas' : '🔴 Necessita desenvolvimento de soft skills'}
${student.deadlineCompliance >= 80 ? '✅ Bom cumprimento de prazos' : '⚠️ Necessita melhorar gestão de tempo'}

---
Relatório gerado em ${new Date().toLocaleString('pt-BR')}`;
      }
    }

    setGeneratedReport(report);
    toast.success('Relatório gerado com sucesso!');
    
  };

  const handleAIReport = () => {
    if (!aiPrompt.trim()) {
      toast.error('Digite uma solicitação para a IA');
      return;
    }

    toast.success('Gerando relatório com IA...');
    
    const report = `RELATÓRIO ESTRATÉGICO GERADO POR IA

Solicitação: "${aiPrompt}"

=== ANÁLISE ===
Com base nos dados da turma, identificamos os seguintes padrões:

1. CORRELAÇÃO IRA × PROJETOS
   • Alunos com IRA >= 8.0 têm média de ${
     (mockStudents.filter((s) => s.ira >= 8).reduce((sum, s) => sum + s.projects.length, 0) /
       mockStudents.filter((s) => s.ira >= 8).length).toFixed(1)
   } projetos
   • Alunos com IRA < 7.0 têm média de ${
     (mockStudents.filter((s) => s.ira < 7).reduce((sum, s) => sum + s.projects.length, 0) /
       Math.max(mockStudents.filter((s) => s.ira < 7).length, 1)).toFixed(1)
   } projetos
   • Conclusão: Forte correlação positiva entre desempenho acadêmico e participação em projetos

2. SOFT SKILLS × EVENTOS
   • Alunos com alta participação em eventos (>10) apresentam média de soft skills superior
   • Recomendação: Incentivar participação em eventos para desenvolver competências comportamentais

3. TECNOLOGIAS MAIS DEMANDADAS
   ${Array.from(new Set(mockStudents.flatMap((s) => s.hardSkills)))
     .slice(0, 5)
     .map((skill, i) => `${i + 1}. ${skill}`)
     .join('\n   ')}

4. ALUNOS DE DESTAQUE
   ${mockStudents
     .filter((s) => s.ira >= 8.5 && s.projects.length >= 2)
     .map((s) => `• ${s.name} - IRA ${s.ira.toFixed(1)}, ${s.projects.length} projetos`)
     .join('\n   ')}

5. ALUNOS QUE PRECISAM DE ATENÇÃO
   ${mockStudents
     .filter((s) => s.ira < 7 || s.engagement === 'low')
     .map((s) => `• ${s.name} - IRA ${s.ira.toFixed(1)}, Engajamento ${s.engagement}`)
     .join('\n   ')}

=== INSIGHTS ESTRATÉGICOS ===
• ${metrics.avgIra >= 8 ? 'Turma apresenta alto nível acadêmico' : 'Necessário reforço acadêmico'}
• ${metrics.studentsInProjects / metrics.totalStudents >= 0.8 ? 'Boa taxa de alocação em projetos' : 'Aumentar oferta de projetos práticos'}
• Diversidade técnica: ${new Set(mockStudents.flatMap((s) => s.hardSkills)).size} tecnologias diferentes dominadas

---
Análise gerada por IA em ${new Date().toLocaleString('pt-BR')}`;

    setGeneratedReport(report);
  };

  const handleExportPDF = () => {
    toast.success('Relatório exportado em PDF!');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios Estratégicos</h1>
          <p className="text-gray-600 mt-1">Gere relatórios consolidados e análises com IA</p>
        </div>

        {/* Report Generator */}
        <Card>
          <CardHeader>
            <CardTitle>Gerador de Relatórios</CardTitle>
            <CardDescription>Selecione o tipo de relatório desejado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tipo de Relatório
                </label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class">Relatório da Turma</SelectItem>
                    <SelectItem value="student">Relatório Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {reportType === 'class' && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Selecionar Turma
                  </label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha uma turma" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='todos'>Todas</SelectItem>
                        <SelectItem value='3'>3</SelectItem>
                        <SelectItem value='4'>4</SelectItem>
                        <SelectItem value='5'>5</SelectItem>
                        <SelectItem value='6'>6</SelectItem>
                        <SelectItem value='7'>7</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {reportType === 'student' && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Selecionar Aluno
                  </label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha um aluno" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

            </div>

            <Button onClick={handleGenerateReport}>
              <FileText className="w-4 h-4 mr-2" />
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>

        {/* AI Report Generator */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Relatório com IA
            </CardTitle>
            <CardDescription>
              Peça análises específicas usando linguagem natural
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Ex: Analise a correlação entre desempenho acadêmico e participação em projetos, identificando alunos de destaque e aqueles que precisam de suporte..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={3}
              className="bg-white"
            />
            <Button onClick={handleAIReport} className="bg-purple-600 hover:bg-purple-700">
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar Análise com IA
            </Button>
          </CardContent>
        </Card>

        {/* Generated Report */}
        {generatedReport && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Relatório Gerado</CardTitle>
                <Button onClick={handleExportPDF}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg border">
                {generatedReport}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="w-4 h-4" />
                IRA Médio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{metrics.avgIra}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="w-4 h-4" />
                Alunos Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{metrics.totalStudents}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="w-4 h-4" />
                Em Projetos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {metrics.studentsInProjects}/{metrics.totalStudents}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
