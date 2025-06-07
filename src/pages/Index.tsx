
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Share2, Users, Zap, ArrowRight, Star, Shield, Smartphone } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'landing'>('landing');

  if (currentView === 'login') {
    return <LoginPage onBack={() => setCurrentView('landing')} onRegister={() => setCurrentView('register')} />;
  }

  if (currentView === 'register') {
    return <RegisterPage onBack={() => setCurrentView('landing')} onLogin={() => setCurrentView('login')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VC</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VirtualCardPro
            </span>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" onClick={() => setCurrentView('login')}>
              Entrar
            </Button>
            <Button onClick={() => setCurrentView('register')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Começar Grátis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
            Seus Cartões de Visita
            <br />
            <span className="text-4xl md:text-5xl">Agora São Digitais</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Crie cartões de visita virtuais interativos, compartilhe via WhatsApp ou link, e acompanhe suas visualizações em tempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setCurrentView('register')}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
            >
              Criar Meu Cartão Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2">
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Tudo que você precisa em um só lugar
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Smartphone className="h-8 w-8" />}
            title="Design Responsivo"
            description="Seus cartões ficam perfeitos em qualquer dispositivo - celular, tablet ou desktop."
          />
          <FeatureCard
            icon={<Share2 className="h-8 w-8" />}
            title="Compartilhamento Fácil"
            description="Envie por WhatsApp, email ou copie o link. Simples assim."
          />
          <FeatureCard
            icon={<Eye className="h-8 w-8" />}
            title="Analytics em Tempo Real"
            description="Veja quantas pessoas visualizaram seu cartão e clicaram nos seus links."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Gestão de Contatos"
            description="Organize todos os contatos que interagiram com seus cartões."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Links Interativos"
            description="Telefone, WhatsApp, email, site e redes sociais - tudo clicável."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Seguro e Confiável"
            description="Seus dados estão protegidos com a melhor tecnologia de segurança."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para revolucionar seus cartões de visita?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Junte-se a milhares de profissionais que já modernizaram sua forma de fazer networking.
          </p>
          <Button 
            onClick={() => setCurrentView('register')}
            size="lg" 
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
          >
            Começar Agora - É Grátis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VC</span>
              </div>
              <span className="text-xl font-bold">VirtualCardPro</span>
            </div>
            <div className="text-gray-400">
              © 2024 VirtualCardPro. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
    <CardContent className="p-0">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const LoginPage = ({ onBack, onRegister }: { onBack: () => void, onRegister: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simular login bem-sucedido
    if (email && password) {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">VC</span>
            </div>
            <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
            <p className="text-gray-600">Entre na sua conta para continuar</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Sua senha"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3">
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <button onClick={onRegister} className="text-blue-600 hover:text-blue-700 font-medium">
                Registre-se
              </button>
            </p>
            <button onClick={onBack} className="mt-2 text-gray-500 hover:text-gray-600 text-sm">
              ← Voltar ao início
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RegisterPage = ({ onBack, onLogin }: { onBack: () => void, onLogin: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegister = () => {
    if (formData.password === formData.confirmPassword && formData.email && formData.name) {
      window.location.href = '/dashboard';
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">VC</span>
            </div>
            <h1 className="text-2xl font-bold">Criar conta</h1>
            <p className="text-gray-600">Comece a criar seus cartões virtuais</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Seu nome"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mínimo 8 caracteres"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirmar senha</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirme sua senha"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3">
              Criar Conta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <button onClick={onLogin} className="text-blue-600 hover:text-blue-700 font-medium">
                Fazer login
              </button>
            </p>
            <button onClick={onBack} className="mt-2 text-gray-500 hover:text-gray-600 text-sm">
              ← Voltar ao início
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
