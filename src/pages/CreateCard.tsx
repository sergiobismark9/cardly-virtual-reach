
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCards, Card as CardType } from "@/hooks/useCards";
import { useAuth } from "@/contexts/AuthContext";
import ImageUpload from "@/components/ImageUpload";
import CardTemplates, { Template } from "@/components/CardTemplates";
import CardPreview from "@/components/CardPreview";
import QRCodeGenerator from "@/components/QRCodeGenerator";

const CreateCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { createCard, updateCard, cards } = useCards();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    name: '',
    position: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    avatar_url: '',
    cover_image_url: '',
    social_links: {},
    template_style: {},
    is_published: false
  });

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [loading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (isEditing && cards.length > 0) {
      const card = cards.find(c => c.id === id);
      if (card) {
        setFormData({
          title: card.title,
          slug: card.slug,
          name: card.name,
          position: card.position || '',
          company: card.company || '',
          phone: card.phone || '',
          email: card.email || '',
          website: card.website || '',
          description: card.description || '',
          avatar_url: card.avatar_url || '',
          cover_image_url: card.cover_image_url || '',
          social_links: card.social_links || {},
          template_style: card.template_style || {},
          is_published: card.is_published
        });
      }
    }
  }, [isEditing, id, cards]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate slug from title
      if (field === 'title') {
        updated.slug = value
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
      }
      
      return updated;
    });
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    updateField('template_style', template.style);
  };

  const handleSave = async (publish: boolean = false) => {
    try {
      setSaveLoading(true);
      const cardData = { ...formData, is_published: publish };
      
      if (isEditing) {
        await updateCard(id!, cardData);
      } else {
        await createCard(cardData);
      }
      
      navigate('/cards');
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const cardUrl = formData.slug ? `${window.location.origin}/c/${formData.slug}` : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/cards')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? 'Editar Cartão' : 'Novo Cartão'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isEditing ? 'Atualize as informações do seu cartão' : 'Crie seu cartão de visita virtual'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => handleSave(false)}
              disabled={loading}
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Rascunho
            </Button>
            <Button 
              onClick={() => handleSave(true)}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {loading ? 'Salvando...' : 'Publicar Cartão'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Título do Cartão</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="Ex: Cartão Pessoal, Cartão Empresa..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">URL do Cartão</label>
                  <div className="flex">
                    <span className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-600">
                      /c/
                    </span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => updateField('slug', e.target.value)}
                      placeholder="seu-nome"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome Completo</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Seu nome"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Cargo/Posição</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => updateField('position', e.target.value)}
                      placeholder="Ex: Desenvolvedor, CEO..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Empresa</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    placeholder="Nome da empresa"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => updateField('website', e.target.value)}
                    placeholder="https://seusite.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Imagens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Foto de Perfil</label>
                  <ImageUpload
                    currentImage={formData.avatar_url}
                    onImageChange={(url) => updateField('avatar_url', url)}
                    folder="avatars"
                    aspectRatio="square"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Template do Cartão</CardTitle>
              </CardHeader>
              <CardContent>
                <CardTemplates
                  selectedTemplate={selectedTemplate?.id}
                  onTemplateSelect={handleTemplateSelect}
                  userPlan={user?.user_metadata?.plan || 'free'}
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visualização do Cartão</CardTitle>
              </CardHeader>
              <CardContent>
                <CardPreview data={formData} />
              </CardContent>
            </Card>

            {/* QR Code */}
            {cardUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>QR Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <QRCodeGenerator url={cardUrl} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
