
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  CreditCard, 
  Crown, 
  Shield, 
  Search, 
  Filter,
  MoreHorizontal,
  UserPlus,
  DollarSign,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'premium';
  cardsCount: number;
  contactsCount: number;
  createdAt: string;
  lastActive: string;
  status: 'active' | 'suspended';
}

const Admin = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("all");
  
  // Mock admin data
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@example.com',
      plan: 'premium',
      cardsCount: 5,
      contactsCount: 124,
      createdAt: '2024-01-15',
      lastActive: '2024-01-20',
      status: 'active'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@example.com',
      plan: 'free',
      cardsCount: 2,
      contactsCount: 45,
      createdAt: '2024-01-18',
      lastActive: '2024-01-19',
      status: 'active'
    },
    {
      id: '3',
      name: 'Pedro Costa',
      email: 'pedro@example.com',
      plan: 'premium',
      cardsCount: 8,
      contactsCount: 289,
      createdAt: '2024-01-10',
      lastActive: '2024-01-20',
      status: 'active'
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === "all" || user.plan === selectedPlan;
    return matchesSearch && matchesPlan;
  });

  const stats = {
    totalUsers: users.length,
    premiumUsers: users.filter(u => u.plan === 'premium').length,
    freeUsers: users.filter(u => u.plan === 'free').length,
    revenue: users.filter(u => u.plan === 'premium').length * 29.90
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600 mt-2">Gerencie usuários, planos e configurações</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar Usuário
          </Button>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5 este mês
                  </p>
                </div>
                <div className="text-blue-600">
                  <Users className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Usuários Premium</p>
                  <p className="text-2xl font-bold">{stats.premiumUsers}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2 este mês
                  </p>
                </div>
                <div className="text-yellow-600">
                  <Crown className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                  <p className="text-2xl font-bold">{Math.round((stats.premiumUsers / stats.totalUsers) * 100)}%</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3% este mês
                  </p>
                </div>
                <div className="text-green-600">
                  <CreditCard className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                  <p className="text-2xl font-bold">R$ {stats.revenue.toFixed(2)}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15% este mês
                  </p>
                </div>
                <div className="text-purple-600">
                  <DollarSign className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os planos</option>
                <option value="free">Gratuito</option>
                <option value="premium">Premium</option>
              </select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Mais Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Usuários Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Cartões</TableHead>
                  <TableHead>Contatos</TableHead>
                  <TableHead>Cadastro</TableHead>
                  <TableHead>Último Acesso</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        user.plan === 'premium' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.plan === 'premium' ? (
                          <Crown className="h-3 w-3 mr-1" />
                        ) : (
                          <Shield className="h-3 w-3 mr-1" />
                        )}
                        {user.plan === 'premium' ? 'Premium' : 'Gratuito'}
                      </span>
                    </TableCell>
                    <TableCell>{user.cardsCount}</TableCell>
                    <TableCell>{user.contactsCount}</TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{new Date(user.lastActive).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status === 'active' ? 'Ativo' : 'Suspenso'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Plan Limits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Limites do Plano Gratuito</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Cartões por usuário:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span>Contatos por usuário:</span>
                <span className="font-medium">100</span>
              </div>
              <div className="flex justify-between">
                <span>Analytics básicos:</span>
                <span className="font-medium">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Marca d'água:</span>
                <span className="font-medium">✓</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limites do Plano Premium</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Cartões por usuário:</span>
                <span className="font-medium">Ilimitado</span>
              </div>
              <div className="flex justify-between">
                <span>Contatos por usuário:</span>
                <span className="font-medium">Ilimitado</span>
              </div>
              <div className="flex justify-between">
                <span>Analytics avançados:</span>
                <span className="font-medium">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Sem marca d'água:</span>
                <span className="font-medium">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Suporte prioritário:</span>
                <span className="font-medium">✓</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
