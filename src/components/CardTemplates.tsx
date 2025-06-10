
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export interface Template {
  id: string;
  name: string;
  preview: string;
  isPremium: boolean;
  style: Record<string, any>;
}

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Moderno',
    preview: '/api/placeholder/300/200',
    isPremium: false,
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      layout: 'centered'
    }
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    preview: '/api/placeholder/300/200',
    isPremium: false,
    style: {
      background: '#ffffff',
      textColor: '#333333',
      layout: 'left-aligned',
      borderColor: '#e5e7eb'
    }
  },
  {
    id: 'professional',
    name: 'Profissional',
    preview: '/api/placeholder/300/200',
    isPremium: true,
    style: {
      background: 'linear-gradient(45deg, #1e3c72 0%, #2a5298 100%)',
      textColor: '#ffffff',
      layout: 'business-card'
    }
  },
  {
    id: 'creative',
    name: 'Criativo',
    preview: '/api/placeholder/300/200',
    isPremium: true,
    style: {
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)',
      textColor: '#ffffff',
      layout: 'creative'
    }
  }
];

interface CardTemplatesProps {
  selectedTemplate?: string;
  onTemplateSelect: (template: Template) => void;
  userPlan: 'free' | 'premium';
}

const CardTemplates = ({ selectedTemplate, onTemplateSelect, userPlan }: CardTemplatesProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Escolha um Template</h3>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const canSelect = !template.isPremium || userPlan === 'premium';
          
          return (
            <div key={template.id} className="relative">
              <Card className={`cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
              } ${!canSelect ? 'opacity-50' : ''}`}>
                <CardContent className="p-3">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <div 
                      className="w-full h-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ 
                        background: template.style.background || '#f3f4f6',
                        color: template.style.textColor || '#000000'
                      }}
                    >
                      {template.name}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{template.name}</span>
                    {template.isPremium && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Premium
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className="w-full mt-2"
                onClick={() => canSelect && onTemplateSelect(template)}
                disabled={!canSelect}
              >
                {!canSelect ? 'Requer Premium' : isSelected ? 'Selecionado' : 'Selecionar'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardTemplates;
