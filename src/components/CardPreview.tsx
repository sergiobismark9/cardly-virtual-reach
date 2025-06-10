
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

interface CardPreviewProps {
  data: {
    name: string;
    position?: string;
    company?: string;
    email?: string;
    phone?: string;
    website?: string;
    avatar_url?: string;
    template_style?: Record<string, any>;
  };
}

const CardPreview = ({ data }: CardPreviewProps) => {
  const template = data.template_style || {};
  const background = template.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  const textColor = template.textColor || '#ffffff';
  const layout = template.layout || 'centered';

  const renderLayout = () => {
    if (layout === 'business-card') {
      return (
        <div className="h-full flex">
          <div className="w-1/3 bg-white/20 p-4 flex flex-col items-center justify-center">
            {data.avatar_url ? (
              <img 
                src={data.avatar_url} 
                alt={data.name}
                className="w-16 h-16 rounded-full border-2 border-white mb-2"
              />
            ) : (
              <div className="w-16 h-16 bg-white/30 rounded-full mb-2 flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {data.name?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 p-4 flex flex-col justify-center">
            <h3 className="text-lg font-bold mb-1">{data.name || 'Seu Nome'}</h3>
            <p className="text-sm opacity-90 mb-1">{data.position || 'Sua Posição'}</p>
            {data.company && <p className="text-sm opacity-75">{data.company}</p>}
          </div>
        </div>
      );
    }

    if (layout === 'left-aligned') {
      return (
        <div className="h-full flex items-center p-6" style={{ background: '#ffffff', color: '#333333' }}>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{data.name || 'Seu Nome'}</h3>
            <p className="text-gray-600 mb-1">{data.position || 'Sua Posição'}</p>
            {data.company && <p className="text-gray-500 text-sm">{data.company}</p>}
            <div className="flex space-x-4 mt-4 text-sm">
              {data.phone && <Phone className="h-4 w-4" />}
              {data.email && <Mail className="h-4 w-4" />}
              {data.website && <Globe className="h-4 w-4" />}
            </div>
          </div>
          {data.avatar_url && (
            <img 
              src={data.avatar_url} 
              alt={data.name}
              className="w-20 h-20 rounded-lg border border-gray-200"
            />
          )}
        </div>
      );
    }

    // Default centered layout
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        {data.avatar_url ? (
          <img 
            src={data.avatar_url} 
            alt={data.name}
            className="w-20 h-20 rounded-full border-2 border-white mb-4"
          />
        ) : (
          <div className="w-20 h-20 bg-white/30 rounded-full mb-4 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {data.name?.charAt(0) || '?'}
            </span>
          </div>
        )}
        <h3 className="text-xl font-bold mb-2">{data.name || 'Seu Nome'}</h3>
        <p className="opacity-90 mb-1">{data.position || 'Sua Posição'}</p>
        {data.company && <p className="opacity-75 text-sm">{data.company}</p>}
        
        <div className="flex space-x-4 mt-6">
          {data.phone && (
            <div className="p-2 bg-white/20 rounded-full">
              <Phone className="h-4 w-4" />
            </div>
          )}
          {data.email && (
            <div className="p-2 bg-white/20 rounded-full">
              <Mail className="h-4 w-4" />
            </div>
          )}
          {data.website && (
            <div className="p-2 bg-white/20 rounded-full">
              <Globe className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="p-0">
        <div 
          className="aspect-video rounded-lg overflow-hidden"
          style={{ 
            background,
            color: textColor
          }}
        >
          {renderLayout()}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPreview;
