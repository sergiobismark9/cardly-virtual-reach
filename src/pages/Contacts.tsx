
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Search, 
  Download, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  User, 
  Calendar,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  notes?: string;
  source: 'manual' | 'card_save';
  cardTitle?: string;
  createdAt: string;
}

const Contacts = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '+55 11 99999-1111',
      company: 'TechCorp',
      position: 'Gerente de Vendas',
      source: 'card_save',
      cardTitle: 'Cartão Pessoal',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Pedro Costa',
      email: 'pedro@startup.com',
      phone: '+55 11 99999-2222',
      company: 'StartupXYZ',
      position: 'CEO',
      source: 'manual',
      notes: 'Interessado em parcerias',
      createdAt: '2024-01-18T14:20:00Z'
    },
    {
      id: '3',
      name: 'Ana Lima',
      email: 'ana.lima@consultoria.com',
      phone: '+55 11 99999-3333',
      company: 'Consultoria ABC',
      position: 'Consultora',
      source: 'card_save',
      cardTitle: 'Cartão Empresa',
      createdAt: '2024-01-20T16:45:00Z'
    }
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const csvContent = [
      ['Nome', 'Email', 'Telefone', 'Empresa', 'Cargo', 'Origem', 'Data'],
      ...contacts.map(contact => [
        contact.name,
        contact.email,
        contact.phone,
        contact.company || '',
        contact.position || '',
        contact.source === 'card_save' ? 'Salvou Cartão' : 'Manual',
        new Date(contact.createdAt).toLocaleDateString('pt-BR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contatos.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Contatos exportados!",
      description: "O arquivo CSV foi baixado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contatos</h1>
            <p className="text-gray-600 mt-2">Gerencie seus contatos capturados e adicionados</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={handleExportCSV}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Contato
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Contatos</p>
                  <p className="text-2xl font-bold">{contacts.length}</p>
                </div>
                <div className="text-blue-600">
                  <User className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Via Cartão</p>
                  <p className="text-2xl font-bold">{contacts.filter(c => c.source === 'card_save').length}</p>
                </div>
                <div className="text-green-600">
                  <Download className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Adicionados Manualmente</p>
                  <p className="text-2xl font-bold">{contacts.filter(c => c.source === 'manual').length}</p>
                </div>
                <div className="text-purple-600">
                  <Plus className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, email ou empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contacts List */}
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {contact.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      <p className="text-gray-600">{contact.position} {contact.company && `- ${contact.company}`}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {contact.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {contact.phone}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(contact.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      contact.source === 'card_save' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {contact.source === 'card_save' ? `Salvou: ${contact.cardTitle}` : 'Manual'}
                    </span>
                    
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {contact.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{contact.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'Nenhum contato encontrado' : 'Nenhum contato adicionado'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Tente buscar com outros termos' : 'Adicione contatos manualmente ou compartilhe seus cartões'}
            </p>
            {!searchTerm && (
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Contato
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
