import React, { useState } from "react";
import { useSettings } from "../contexts/SettingsContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { ArrowLeft, Save, Eye, Palette, Globe, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Settings: React.FC = () => {
  const { settings, updateSettings, loading } = useSettings();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(settings);
  const [saving, setSaving] = useState(false);

  // Update form data when settings change
  React.useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateSettings(formData);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    // Update settings temporarily for preview
    updateSettings(formData);
    // Navigate to customer menu to see changes
    window.open("/menu-cliente", "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin-menu")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Volver</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Configuración
                </h1>
                <p className="text-gray-600">
                  Personaliza la apariencia y contenido de tu restaurante
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={handlePreview}
                className="flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Vista Previa</span>
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? "Guardando..." : "Guardar"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="header" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="header" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Encabezado</span>
            </TabsTrigger>
            <TabsTrigger value="page" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Página</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Redes Sociales</span>
            </TabsTrigger>
            <TabsTrigger value="icons" className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>Iconos</span>
            </TabsTrigger>
          </TabsList>

          {/* Header Settings */}
          <TabsContent value="header">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Encabezado</CardTitle>
                <CardDescription>
                  Personaliza el título y subtítulo que aparecen en el menú del
                  cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="headerTitle">Título Principal</Label>
                  <Input
                    id="headerTitle"
                    value={formData.headerTitle}
                    onChange={(e) =>
                      handleInputChange("headerTitle", e.target.value)
                    }
                    placeholder="Ej: Viejo Sabroso"
                  />
                  <p className="text-sm text-gray-500">
                    Este es el nombre principal de tu restaurante
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headerSubtitle">Subtítulo</Label>
                  <Input
                    id="headerSubtitle"
                    value={formData.headerSubtitle}
                    onChange={(e) =>
                      handleInputChange("headerSubtitle", e.target.value)
                    }
                    placeholder="Ej: Auténtica comida mexicana"
                  />
                  <p className="text-sm text-gray-500">
                    Descripción breve que aparece debajo del título
                  </p>
                </div>

                <Separator />

                {/* Preview */}
                <div className="space-y-2">
                  <Label>Vista Previa</Label>
                  <div className="border rounded-lg p-4 bg-gradient-to-r from-orange-500 to-orange-600">
                    <div className="text-center text-white">
                      <h1 className="text-3xl font-bold mb-2">
                        {formData.headerTitle}
                      </h1>
                      <p className="text-orange-100">
                        {formData.headerSubtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Page Settings */}
          <TabsContent value="page">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de la Página</CardTitle>
                <CardDescription>
                  Información que aparece en el título del navegador y motores
                  de búsqueda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="pageTitle">Título de la Página</Label>
                  <Input
                    id="pageTitle"
                    value={formData.pageTitle}
                    onChange={(e) =>
                      handleInputChange("pageTitle", e.target.value)
                    }
                    placeholder="Ej: Viejo Sabroso - Auténtica Comida Mexicana"
                  />
                  <p className="text-sm text-gray-500">
                    Aparece en la pestaña del navegador y resultados de Google
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pageDescription">
                    Descripción de la Página
                  </Label>
                  <Textarea
                    id="pageDescription"
                    value={formData.pageDescription}
                    onChange={(e) =>
                      handleInputChange("pageDescription", e.target.value)
                    }
                    placeholder="Describe tu restaurante y servicios..."
                    rows={3}
                  />
                  <p className="text-sm text-gray-500">
                    Descripción que aparece en los resultados de búsqueda
                    (máximo 160 caracteres)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="themeColor">Color del Tema</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="themeColor"
                      type="color"
                      value={formData.themeColor}
                      onChange={(e) =>
                        handleInputChange("themeColor", e.target.value)
                      }
                      className="w-20 h-10"
                    />
                    <Input
                      value={formData.themeColor}
                      onChange={(e) =>
                        handleInputChange("themeColor", e.target.value)
                      }
                      placeholder="#FF7518"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Color principal de la aplicación en dispositivos móviles
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Settings */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Redes Sociales</CardTitle>
                <CardDescription>
                  Información que aparece cuando comparten tu página en redes
                  sociales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ogTitle">Título para Redes Sociales</Label>
                  <Input
                    id="ogTitle"
                    value={formData.ogTitle}
                    onChange={(e) =>
                      handleInputChange("ogTitle", e.target.value)
                    }
                    placeholder="Ej: Viejo Sabroso - Auténtica Comida Mexicana"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogDescription">
                    Descripción para Redes Sociales
                  </Label>
                  <Textarea
                    id="ogDescription"
                    value={formData.ogDescription}
                    onChange={(e) =>
                      handleInputChange("ogDescription", e.target.value)
                    }
                    placeholder="Descripción atractiva para redes sociales..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogImage">Imagen para Redes Sociales</Label>
                  <Input
                    id="ogImage"
                    type="url"
                    value={formData.ogImage}
                    onChange={(e) =>
                      handleInputChange("ogImage", e.target.value)
                    }
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  <p className="text-sm text-gray-500">
                    Imagen que aparece cuando comparten tu página (recomendado:
                    1200x630px)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogUrl">URL del Sitio</Label>
                  <Input
                    id="ogUrl"
                    type="url"
                    value={formData.ogUrl}
                    onChange={(e) => handleInputChange("ogUrl", e.target.value)}
                    placeholder="https://tu-restaurante.com"
                  />
                </div>

                {/* Preview */}
                <Separator />
                <div className="space-y-2">
                  <Label>Vista Previa de Redes Sociales</Label>
                  <div className="border rounded-lg overflow-hidden">
                    {formData.ogImage && (
                      <img
                        src={formData.ogImage}
                        alt="Preview"
                        className="w-full h-32 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">
                        {formData.ogTitle}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {formData.ogDescription}
                      </p>
                      <p className="text-gray-400 text-xs mt-2">
                        {formData.ogUrl}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Icons Settings */}
          <TabsContent value="icons">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Iconos</CardTitle>
                <CardDescription>
                  Iconos que aparecen en el navegador y cuando agregan tu sitio
                  a la pantalla de inicio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon</Label>
                  <Input
                    id="favicon"
                    type="url"
                    value={formData.favicon}
                    onChange={(e) =>
                      handleInputChange("favicon", e.target.value)
                    }
                    placeholder="/favicon.ico"
                  />
                  <p className="text-sm text-gray-500">
                    Icono pequeño que aparece en la pestaña del navegador
                    (recomendado: 16x16px o 32x32px)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webClip">Icono de Apple (Web Clip)</Label>
                  <Input
                    id="webClip"
                    type="url"
                    value={formData.webClip}
                    onChange={(e) =>
                      handleInputChange("webClip", e.target.value)
                    }
                    placeholder="/apple-touch-icon.png"
                  />
                  <p className="text-sm text-gray-500">
                    Icono que aparece cuando agregan tu sitio a la pantalla de
                    inicio en iOS (recomendado: 180x180px)
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Herramientas Útiles</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Generador de Favicon</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Crea favicons de diferentes tamaños automáticamente
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            "https://favicon.io/favicon-generator/",
                            "_blank",
                          )
                        }
                      >
                        Abrir Generador
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">
                        Generador de Iconos Apple
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Crea iconos optimizados para dispositivos Apple
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            "https://realfavicongenerator.net/",
                            "_blank",
                          )
                        }
                      >
                        Abrir Generador
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
