import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Eye, Share2, Trash2, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CardData {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  views: number;
  createdAt: string;
  name: string;
  position: string;
}

const Cards = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cards] = useState<CardData[]>([
    {
      id: '1',
      title: 'Cartão Pessoal',
      slug: 'joao-silva',
      status: 'published',
      views: 234,
      createdAt: '2024-01-15',
      name: 'João Silva',
      position: 'Desenvolvedor Frontend'
    },
    {
      id: '2', 
      title: 'Cartão Empresa',
      slug: 'joao-silva-empresa',
      status: 'draft',
      views: 0,
      createdAt: '2024-01-20',
      name: 'João Silva',
      position: 'CEO - TechStart'
    }
  ]);

  const handleCopyLink = (slug: string) => {
    const link = `${window.location.origin}/c/${slug}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: "O link do cartão foi copiado para a área de transferência.",
    });
  };

  const handleShare = (slug: string) => {
    const link = `${window.location.origin}/c/${slug}`;
    const message = `Confira meu cartão de visita virtual: ${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meus Cartões</h1>
            <p className="text-gray-600 mt-2">Gerencie seus cartões de visita virtuais</p>
          </div>
          <Button 
            onClick={() => navigate('/cards/new')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Cartão
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Cartões</p>
                  <p className="text-2xl font-bold">{cards.length}</p>
                </div>
                <div className="text-blue-600">
                  <Plus className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cartões Publicados</p>
                  <p className="text-2xl font-bold">{cards.filter(c => c.status === 'published').length}</p>
                </div>
                <div className="text-green-600">
                  <Eye className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Views</p>
                  <p className="text-2xl font-bold">{cards.reduce((sum, card) => sum + card.views, 0)}</p>
                </div>
                <div className="text-purple-600">
                  <Share2 className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{card.name}</p>
                    <p className="text-sm text-gray-500">{card.position}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    card.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {card.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{card.views} visualizações</span>
                  <span>Criado em {new Date(card.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/c/${card.slug}`)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/cards/edit/${card.id}`)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyLink(card.slug)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(card.slug)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {cards.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cartão criado ainda</h3>
            <p className="text-gray-600 mb-6">Crie seu primeiro cartão de visita virtual</p>
            <Button 
              onClick={() => navigate('/cards/new')}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Cartão
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
