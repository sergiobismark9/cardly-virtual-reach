
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Globe, 
  Download,
  Share2,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  RotateCcw
} from "lucide-react";

const CardViewer = () => {
  const [flipped, setFlipped] = useState(false);

  // Dados mock do cartão
  const cardData = {
    name: "João Silva",
    title: "Desenvolvedor Full-Stack",
    company: "TechSolutions",
    email: "joao@techsolutions.com",
    phone: "+55 11 99999-9999",
    whatsapp: "+5511999999999",
    website: "https://techsolutions.com",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    address: "São Paulo, SP",
    social: {
      facebook: "joaosilva",
      instagram: "joaosilva",
      linkedin: "joaosilva"
    },
    slogan: "Transformando ideias em soluções digitais inovadoras"
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = `Confira meu cartão de visita digital: ${cardData.name} - ${cardData.title}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Cartão de ${cardData.name}`,
        text: text,
        url: url
      });
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert("Link copiado para a área de transferência!");
    }
  };

  const handleWhatsAppShare = () => {
    const url = window.location.href;
    const text = `Confira meu cartão de visita digital: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const downloadVCard = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${cardData.name}
TITLE:${cardData.title}
ORG:${cardData.company}
TEL:${cardData.phone}
EMAIL:${cardData.email}
URL:${cardData.website}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cardData.name.replace(' ', '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Card Container */}
        <div className="relative w-full h-96 mb-6" style={{ perspective: '1000px' }}>
          <div 
            className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              flipped ? 'rotate-y-180' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of card */}
            <Card className={`absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-xl ${
              flipped ? 'opacity-0' : 'opacity-100'
            }`}>
              <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center">
                <div className="mb-4">
                  <img 
                    src={cardData.photo} 
                    alt={cardData.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white shadow-lg"
                  />
                  <img 
                    src={cardData.logo} 
                    alt={cardData.company}
                    className="w-12 h-12 rounded-lg mx-auto"
                  />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{cardData.name}</h1>
                <p className="text-lg text-blue-600 font-medium mb-1">{cardData.title}</p>
                <p className="text-gray-600 mb-4">{cardData.company}</p>
                
                <div className="flex items-center text-gray-500 mb-6">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{cardData.address}</span>
                </div>

                <div className="flex space-x-4">
                  <ActionButton 
                    icon={<Phone className="h-4 w-4" />}
                    onClick={() => window.open(`tel:${cardData.phone}`)}
                    color="blue"
                  />
                  <ActionButton 
                    icon={<MessageCircle className="h-4 w-4" />}
                    onClick={() => window.open(`https://wa.me/${cardData.whatsapp}`)}
                    color="green"
                  />
                  <ActionButton 
                    icon={<Mail className="h-4 w-4" />}
                    onClick={() => window.open(`mailto:${cardData.email}`)}
                    color="red"
                  />
                  <ActionButton 
                    icon={<Globe className="h-4 w-4" />}
                    onClick={() => window.open(cardData.website, '_blank')}
                    color="purple"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Back of card */}
            <Card className={`absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 shadow-xl transform rotate-y-180 ${
              flipped ? 'opacity-100' : 'opacity-0'
            }`}>
              <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Conecte-se comigo</h2>
                  <p className="text-gray-600 italic">"{cardData.slogan}"</p>
                </div>

                <div className="space-y-3 mb-6 w-full">
                  <ContactItem 
                    icon={<Phone className="h-4 w-4" />}
                    text={cardData.phone}
                    onClick={() => window.open(`tel:${cardData.phone}`)}
                  />
                  <ContactItem 
                    icon={<Mail className="h-4 w-4" />}
                    text={cardData.email}
                    onClick={() => window.open(`mailto:${cardData.email}`)}
                  />
                  <ContactItem 
                    icon={<Globe className="h-4 w-4" />}
                    text={cardData.website}
                    onClick={() => window.open(cardData.website, '_blank')}
                  />
                </div>

                <div className="flex space-x-4 mb-6">
                  <SocialButton 
                    icon={<Facebook className="h-4 w-4" />}
                    onClick={() => window.open(`https://facebook.com/${cardData.social.facebook}`, '_blank')}
                    color="blue"
                  />
                  <SocialButton 
                    icon={<Instagram className="h-4 w-4" />}
                    onClick={() => window.open(`https://instagram.com/${cardData.social.instagram}`, '_blank')}
                    color="pink"
                  />
                  <SocialButton 
                    icon={<Linkedin className="h-4 w-4" />}
                    onClick={() => window.open(`https://linkedin.com/in/${cardData.social.linkedin}`, '_blank')}
                    color="blue"
                  />
                </div>

                <Button 
                  onClick={downloadVCard}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Salvar Contato
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button 
            onClick={() => setFlipped(!flipped)}
            variant="outline"
            className="flex-1"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            {flipped ? 'Ver Frente' : 'Ver Verso'}
          </Button>
        </div>

        {/* Share buttons */}
        <div className="space-y-3">
          <Button 
            onClick={downloadVCard}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Salvar Contato
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={handleWhatsAppShare}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button 
              onClick={handleShare}
              variant="outline"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Criado com{' '}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VirtualCardPro
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, onClick, color }: { 
  icon: React.ReactNode, 
  onClick: () => void, 
  color: 'blue' | 'green' | 'red' | 'purple' 
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    green: 'bg-green-100 text-green-600 hover:bg-green-200',
    red: 'bg-red-100 text-red-600 hover:bg-red-200',
    purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200'
  };

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-full transition-colors ${colorClasses[color]}`}
    >
      {icon}
    </button>
  );
};

const SocialButton = ({ icon, onClick, color }: { 
  icon: React.ReactNode, 
  onClick: () => void, 
  color: 'blue' | 'pink' 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    pink: 'bg-pink-500 hover:bg-pink-600'
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full text-white transition-colors ${colorClasses[color]}`}
    >
      {icon}
    </button>
  );
};

const ContactItem = ({ icon, text, onClick }: { 
  icon: React.ReactNode, 
  text: string, 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-white/50 transition-colors"
  >
    <div className="text-gray-500">{icon}</div>
    <span className="text-sm text-gray-700 text-left flex-1">{text}</span>
  </button>
);

export default CardViewer;
