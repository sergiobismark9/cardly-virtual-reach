
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  MousePointer, 
  Users, 
  Calendar,
  Download,
  Filter
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock data for analytics
  const viewsData = [
    { day: "Dom", views: 45, clicks: 12 },
    { day: "Seg", views: 78, clicks: 25 },
    { day: "Ter", views: 92, clicks: 31 },
    { day: "Qua", views: 67, clicks: 18 },
    { day: "Qui", views: 89, clicks: 28 },
    { day: "Sex", views: 134, clicks: 42 },
    { day: "Sáb", views: 156, clicks: 48 }
  ];

  const sourceData = [
    { name: "WhatsApp", value: 45, color: "#25D366" },
    { name: "Instagram", value: 30, color: "#E4405F" },
    { name: "LinkedIn", value: 15, color: "#0077B5" },
    { name: "Email", value: 10, color: "#EA4335" }
  ];

  const chartConfig = {
    views: {
      label: "Visualizações",
      color: "#3b82f6",
    },
    clicks: {
      label: "Cliques",
      color: "#10b981",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">Acompanhe o desempenho dos seus cartões</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-6">
          {["7d", "30d", "90d", "1y"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === "7d" && "7 dias"}
              {range === "30d" && "30 dias"}
              {range === "90d" && "90 dias"}
              {range === "1y" && "1 ano"}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% vs período anterior
                  </p>
                </div>
                <div className="text-blue-600">
                  <Eye className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Cliques</p>
                  <p className="text-2xl font-bold">456</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% vs período anterior
                  </p>
                </div>
                <div className="text-green-600">
                  <MousePointer className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                  <p className="text-2xl font-bold">37%</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5% vs período anterior
                  </p>
                </div>
                <div className="text-purple-600">
                  <BarChart3 className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Novos Contatos</p>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +23% vs período anterior
                  </p>
                </div>
                <div className="text-orange-600">
                  <Users className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Views and Clicks Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Visualizações e Cliques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="views" fill="var(--color-views)" />
                  <Bar dataKey="clicks" fill="var(--color-clicks)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Origens do Tráfego
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-2 border rounded shadow">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm">{data.value}% do tráfego</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {sourceData.map((source) => (
                  <div key={source.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: source.color }}
                    />
                    <span className="text-sm">{source.name}: {source.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance by Card */}
        <Card>
          <CardHeader>
            <CardTitle>Performance por Cartão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Cartão Pessoal", views: 567, clicks: 234, rate: "41%" },
                { name: "Cartão Empresa", views: 423, clicks: 156, rate: "37%" },
                { name: "Cartão Freelancer", views: 244, clicks: 66, rate: "27%" }
              ].map((card) => (
                <div key={card.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{card.name}</h4>
                    <p className="text-sm text-gray-600">{card.views} views • {card.clicks} cliques</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{card.rate}</div>
                    <div className="text-sm text-gray-600">Taxa de conversão</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
