import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  CreditCard, 
  Users, 
  Settings, 
  Plus, 
  Eye, 
  Share2, 
  BarChart3,
  Bell,
  Search,
  Menu,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 w-64 h-full bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VC</span>
            </div>
            <span className="font-bold text-lg">VirtualCardPro</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            label="Dashboard" 
            active 
            onClick={() => navigate('/dashboard')}
          />
          <SidebarItem 
            icon={<CreditCard className="h-5 w-5" />} 
            label="Meus Cartões" 
            onClick={() => navigate('/cards')}
          />
          <SidebarItem 
            icon={<Users className="h-5 w-5" />} 
            label="Contatos" 
            onClick={() => navigate('/contacts')}
          />
          <SidebarItem icon={<BarChart3 className="h-5 w-5" />} label="Analytics" />
          <SidebarItem icon={<Settings className="h-5 w-5" />} label="Configurações" />
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-1">Upgrade para Pro</h3>
              <p className="text-xs text-gray-600 mb-3">Cartões ilimitados e analytics avançados</p>
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Total de Visualizações"
              value="1,234"
              change="+12%"
              icon={<Eye className="h-5 w-5" />}
              positive
            />
            <StatsCard
              title="Cartões Ativos"
              value="3"
              change="+1"
              icon={<CreditCard className="h-5 w-5" />}
              positive
            />
            <StatsCard
              title="Contatos Capturados"
              value="89"
              change="+23%"
              icon={<Users className="h-5 w-5" />}
              positive
            />
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  Ações Rápidas
                  <Plus className="h-5 w-5 text-blue-600" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => navigate('/cards/new')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Novo Cartão
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar Cartão
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Adicionar Contato
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Seus Cartões</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardItem
                  title="Cartão Pessoal"
                  views="567 visualizações"
                  status="Ativo"
                />
                <CardItem
                  title="Cartão Empresa"
                  views="423 visualizações"
                  status="Ativo"
                />
                <CardItem
                  title="Cartão Freelancer"
                  views="244 visualizações"
                  status="Rascunho"
                />
              </CardContent>
            </Card>
          </div>

          {/* Recent activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  action="João Silva visualizou seu cartão"
                  time="2 min atrás"
                  icon={<Eye className="h-4 w-4" />}
                />
                <ActivityItem
                  action="Maria Santos clicou no seu WhatsApp"
                  time="15 min atrás"
                  icon={<Share2 className="h-4 w-4" />}
                />
                <ActivityItem
                  action="Pedro Costa salvou seu contato"
                  time="1h atrás"
                  icon={<Users className="h-4 w-4" />}
                />
                <ActivityItem
                  action="Ana Lima visualizou seu cartão"
                  time="2h atrás"
                  icon={<Eye className="h-4 w-4" />}
                />
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false, onClick }: { 
  icon: React.ReactNode, 
  label: string, 
  active?: boolean,
  onClick?: () => void 
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
      active 
        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const StatsCard = ({ title, value, change, icon, positive }: { 
  title: string, 
  value: string, 
  change: string, 
  icon: React.ReactNode, 
  positive: boolean 
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <div className="text-blue-600">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold">{value}</span>
        <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
    </CardContent>
  </Card>
);

const CardItem = ({ title, views, status }: { title: string, views: string, status: string }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-gray-600">{views}</p>
    </div>
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
      status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
    }`}>
      {status}
    </span>
  </div>
);

const ActivityItem = ({ action, time, icon }: { action: string, time: string, icon: React.ReactNode }) => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900">{action}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
  </div>
);

export default Dashboard;
