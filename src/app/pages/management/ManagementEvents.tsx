import { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { mockEvents, mockStudents } from '../../data/mockData';
import { Calendar, Plus, QrCode, Users } from 'lucide-react';
import { toast } from 'sonner';

export function ManagementEvents() {
  const [events] = useState(mockEvents);
  const [isOpen, setIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
  });

  const handleCreateEvent = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.time || !newEvent.location) {
      toast.error('Preencha todos os campos');
      return;
    }

    toast.success('Evento criado com sucesso! QR Code gerado automaticamente.');
    setIsOpen(false);
    setNewEvent({ name: '', date: '', time: '', location: '' });
  };

  const generateQRCode = (eventId: string) => {
    // Simulate QR code download
    toast.success('QR Code baixado com sucesso!');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
            <p className="text-gray-600 mt-1">Gerencie eventos e controle de presença</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Evento</DialogTitle>
                <DialogDescription>
                  O QR Code será gerado automaticamente após a criação
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Evento</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Workshop React Avançado"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Horário</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Local</Label>
                  <Input
                    id="location"
                    placeholder="Ex: Auditório Principal"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  />
                </div>
                <Button onClick={handleCreateEvent} className="w-full">
                  Criar Evento
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => {
            const isPast = new Date(event.date) < new Date();
            return (
              <Card key={event.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="p-3 bg-blue-100 rounded-lg h-fit">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{event.name}</h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span>📅 {new Date(event.date).toLocaleDateString('pt-BR')}</span>
                              <span>🕐 {event.time}</span>
                              <span>📍 {event.location}</span>
                            </div>
                          </div>
                          <Badge variant={isPast ? 'secondary' : 'default'}>
                            {isPast ? 'Finalizado' : 'Próximo'}
                          </Badge>
                        </div>

                        <div className="mt-4 flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {event.attendees.length} participante(s)
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateQRCode(event.id)}
                          >
                            <QrCode className="w-4 h-4 mr-2" />
                            Baixar QR Code
                          </Button>
                        </div>

                        {/* Attendees */}
                        {event.attendees.length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm font-medium text-gray-700 mb-2">Participantes:</p>
                            <div className="flex flex-wrap gap-2">
                              {event.attendees.map((studentId) => {
                                const student = mockStudents.find((s) => s.id === studentId);
                                return student ? (
                                  <div
                                    key={studentId}
                                    className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
                                  >
                                    <img
                                      src={student.photo}
                                      alt={student.name}
                                      className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <span className="text-sm">{student.name}</span>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* QR Code Info */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Como funciona o QR Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm text-gray-700">
              <li>1. Ao criar um evento, um QR Code único é gerado automaticamente</li>
              <li>2. Baixe e projete/imprima o QR Code no local do evento</li>
              <li>3. Alunos escaneiam o código para confirmar presença</li>
              <li>4. A confirmação é registrada automaticamente no sistema</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
