import { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { useAuth } from '../../context/AuthContext';
import { mockStudents } from '../../data/mockData';
import { CheckCircle, XCircle, Lock, FileText } from 'lucide-react';
import { toast } from 'sonner';

export function StudentReports() {
  const { user } = useAuth();
  const student = mockStudents.find((s) => s.id === user?.id) || mockStudents[0];
  const [reportContent, setReportContent] = useState('');

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const isLastDayOfMonth = new Date().getDate() === new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleSubmitReport = () => {
    if (reportContent.trim()) {
      toast.success('Relatório mensal enviado com sucesso!');
      setReportContent('');
    } else {
      toast.error('Por favor, preencha o conteúdo do relatório.');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios Mensais</h1>
          <p className="text-gray-600 mt-1">Registre suas atividades e evidências mensais</p>
        </div>

        {/* Current Month Report */}
        <Card>
          <CardHeader>
            <CardTitle>Relatório de Fevereiro/2026</CardTitle>
            <CardDescription>
              {isLastDayOfMonth ? (
                <span className="text-orange-600 font-medium">
                  Último dia para envio! Edição será bloqueada após hoje.
                </span>
              ) : (
                'Prazo de envio: até o último dia do mês'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição das Atividades
              </label>
              <Textarea
                placeholder="Descreva suas principais atividades, projetos desenvolvidos, aprendizados e conquistas do mês..."
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                rows={8}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Evidências (URLs)
              </label>
              <Textarea
                placeholder="Cole os links para evidências: GitHub repos, certificados, artigos, etc."
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmitReport}>
                <FileText className="w-4 h-4 mr-2" />
                Enviar Relatório
              </Button>
              <Button variant="outline">Salvar Rascunho</Button>
            </div>
          </CardContent>
        </Card>

        {/* Historical Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Relatórios</CardTitle>
            <CardDescription>Todos os seus relatórios mensais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {student.monthlyReports.map((report) => (
                <div
                  key={`${report.month}-${report.year}`}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    {report.submitted ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {report.month}/{report.year}
                      </h4>
                      {report.submitted && report.submittedAt && (
                        <p className="text-sm text-gray-600">
                          Enviado em {new Date(report.submittedAt).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.submitted ? (
                      <>
                        <Badge variant="default">Enviado</Badge>
                        {/* Check if it's a past month - should be locked */}
                        {new Date(`${report.year}-${report.month}-01`) < new Date(currentYear, currentMonth, 1) && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                        <Button variant="outline" size="sm">
                          Visualizar
                        </Button>
                      </>
                    ) : (
                      <Badge variant="destructive">Pendente</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Cumprimento de Prazos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${student.deadlineCompliance}%` }}
                  />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {student.deadlineCompliance}%
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {student.monthlyReports.filter((r) => r.submitted).length} de{' '}
              {student.monthlyReports.length} relatórios enviados
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
