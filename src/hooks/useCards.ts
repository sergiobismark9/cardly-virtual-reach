
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Card {
  id: string;
  title: string;
  slug: string;
  name: string;
  position?: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  description?: string;
  avatar_url?: string;
  cover_image_url?: string;
  social_links: Record<string, string>;
  template_style: Record<string, any>;
  is_published: boolean;
  views: number;
  qr_code_url?: string;
  created_at: string;
  updated_at: string;
}

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCards = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_cards')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCards(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar cartões",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCard = async (cardData: Partial<Card>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('business_cards')
        .insert([{ ...cardData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      setCards(prev => [data, ...prev]);
      toast({
        title: "Cartão criado!",
        description: "Seu cartão foi criado com sucesso.",
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: "Erro ao criar cartão",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateCard = async (id: string, updates: Partial<Card>) => {
    try {
      const { data, error } = await supabase
        .from('business_cards')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setCards(prev => prev.map(card => card.id === id ? data : card));
      toast({
        title: "Cartão atualizado!",
        description: "Suas alterações foram salvas.",
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar cartão",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteCard = async (id: string) => {
    try {
      const { error } = await supabase
        .from('business_cards')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setCards(prev => prev.filter(card => card.id !== id));
      toast({
        title: "Cartão excluído",
        description: "O cartão foi removido com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao excluir cartão",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchCards();
  }, [user]);

  return {
    cards,
    loading,
    createCard,
    updateCard,
    deleteCard,
    refetch: fetchCards
  };
};
