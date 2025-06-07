
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Eye, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CardFormData {
  title: string;
  slug: string;
  name: string;
  position: string;
  company: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  photo: string;
  logo: string;
  frontMessage: string;
  backMessage: string;
  status: 'draft' | 'published';
}

const CreateCard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CardFormData>({
    title: '',
    slug: '',
    name: '',
    position: '',
    company: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    linkedin: '',
    instagram: '',
    facebook: '',
    photo: '',
    logo: '',
    frontMessage: '',
    backMessage: 'Obrigado por visitar meu cartão!',
    status: 'draft'
  });

  const updateField = (field: keyof CardFormData, value: string) => {
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

  const handleSave = (status: 'draft' | 'published') => {
    // TODO: Save to database
    console.log('Saving card:', { ...formData, status });
    navigate('/cards');
  };

  const handlePreview = () => {
    // TODO: Open preview modal or navigate to preview
    console.log('Preview card:', formData);
  };

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
              <h1 className="text-3xl font-bold text-gray-900">Novo Cartão</h1>
              <p className="text-gray-600 mt-1">Crie seu cartão de visita virtual</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSave('draft')}
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Rascunho
            </Button>
            <Button 
              onClick={() => handleSave('published')}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Publicar Cartão
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
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium mb-2">WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => updateField('whatsapp', e.target.value)}
                      placeholder="5511999999999"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
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

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Redes Sociais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => updateField('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/seuperfil"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Instagram</label>
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => updateField('instagram', e.target.value)}
                      placeholder="@seuusuario"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Facebook</label>
                    <input
                      type="text"
                      value={formData.facebook}
                      onChange={(e) => updateField('facebook', e.target.value)}
                      placeholder="facebook.com/seuusuario"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
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
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
                  {/* Card Preview */}
                  <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm mx-auto">
                    {/* Front of card */}
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                        {formData.photo ? (
                          <img src={formData.photo} alt="Foto" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span className="text-gray-400 text-xs">Foto</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {formData.name || 'Seu Nome'}
                        </h3>
                        <p className="text-gray-600">
                          {formData.position || 'Sua Posição'}
                        </p>
                        {formData.company && (
                          <p className="text-sm text-gray-500">{formData.company}</p>
                        )}
                      </div>
                      <div className="flex justify-center space-x-4 text-sm">
                        {formData.phone && (
                          <a href={`tel:${formData.phone}`} className="text-blue-600">
                            Ligar
                          </a>
                        )}
                        {formData.whatsapp && (
                          <a href={`https://wa.me/${formData.whatsapp}`} className="text-green-600">
                            WhatsApp
                          </a>
                        )}
                        {formData.email && (
                          <a href={`mailto:${formData.email}`} className="text-red-600">
                            Email
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Imagens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Foto Pessoal</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Clique para fazer upload da sua foto</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Logo da Empresa</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Clique para fazer upload do logo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
