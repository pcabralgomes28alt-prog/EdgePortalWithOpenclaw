import { Layout } from '../../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { useAuth } from '../../context/AuthContext';
import { mockStudents } from '../../data/mockData';
import { Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';
import React from 'react';

export function StudentProfile() {
  const { user } = useAuth();
  const student = mockStudents.find((s) => s.id === user?.id) || mockStudents[0];

  // file upload state
  const [enrollmentFile, setEnrollmentFile] = React.useState<File | null>(null);
  const [historyFile, setHistoryFile] = React.useState<File | null>(null);
  const enrollmentInputRef = React.useRef<HTMLInputElement>(null);
  const historyInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (type: string) => {
    toast.success(`${type} enviado com sucesso!`);
  };

  const onEnrollmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEnrollmentFile(file);
      toast.success('Comprovante de Matrícula selecionado');
    }
  };

  const onHistoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHistoryFile(file);
      toast.success('Histórico Acadêmico selecionado');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-600 mt-1">Gerencie suas informações e documentos</p>
        </div>

        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={student.photo} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nome Completo</label>
                    <p className="text-gray-900">{student.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{student.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Curso</label>
                    <p className="text-gray-900">{student.course}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Período</label>
                    <p className="text-gray-900">{student.semester}º Turma</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Matrícula desde</label>
                    <p className="text-gray-900">
                      {new Date(student.enrollmentDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">IRA</label>
                    <p className="text-gray-900 font-bold text-lg">{student.ira.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos Acadêmicos</CardTitle>
            <CardDescription>Faça upload dos seus documentos obrigatórios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* hidden inputs for files */}
            <input
              ref={enrollmentInputRef}
              type="file"
              accept="application/pdf"
              className="sr-only"
              onChange={onEnrollmentChange}
            />
            <input
              ref={historyInputRef}
              type="file"
              accept="application/pdf"
              className="sr-only"
              onChange={onHistoryChange}
            />

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Comprovante de Matrícula</h4>
                    <p className="text-sm text-gray-600">
                      PDF com extração automática de horários
                    </p>
                    {enrollmentFile && (
                      <p className="text-xs text-green-600 mt-1">
                        Selecionado: {enrollmentFile.name}
                      </p>
                    )}
                  </div>
                </div>
                <Button onClick={() => enrollmentInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Histórico Acadêmico</h4>
                    <p className="text-sm text-gray-600">PDF do histórico completo</p>
                    {historyFile && (
                      <p className="text-xs text-green-600 mt-1">
                        Selecionado: {historyFile.name}
                      </p>
                    )}
                  </div>
                </div>
                <Button onClick={() => historyInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Horário de Aulas</CardTitle>
            <CardDescription>Suas aulas do semestre atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {student.schedule.map((course) => (
                <div
                  key={course.code}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{course.name}</h4>
                    <p className="text-sm text-gray-600">{course.code} • Prof. {course.professor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{course.day}</p>
                    <p className="text-sm text-gray-600">{course.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
