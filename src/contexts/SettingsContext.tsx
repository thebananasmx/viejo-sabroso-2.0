import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAppSettings, updateAppSettings } from "../lib/firestore";
import { toast } from "sonner";

export interface AppSettings {
  // Header settings
  headerTitle: string;
  headerSubtitle: string;
  headerIcon: string; // URL of the uploaded icon
  headerIconFileName?: string; // Firebase Storage filename for deletion

  // Page metadata
  pageTitle: string;
  pageDescription: string;

  // OpenGraph data
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;

  // Icons
  favicon: string;
  webClip: string; // Apple touch icon

  // Theme color
  themeColor: string;
}

const defaultSettings: AppSettings = {
  headerTitle: "Viejo Sabroso",
  headerSubtitle: "Summerween 25",
  headerIcon: "🍽️", // Default emoji, will be replaced by uploaded image
  headerIconFileName: undefined,
  pageTitle: "Viejo Sabroso - Auténtica Comida Mexicana",
  pageDescription:
    "Disfruta de la auténtica comida mexicana en Viejo Sabroso. Ordena en línea y disfruta de nuestros platillos tradicionales.",
  ogTitle: "Viejo Sabroso - Auténtica Comida Mexicana",
  ogDescription:
    "Disfruta de la auténtica comida mexicana en Viejo Sabroso. Ordena en línea y disfruta de nuestros platillos tradicionales.",
  ogImage: "https://picsum.photos/1200/630?random=restaurant",
  ogUrl: window.location.origin,
  favicon: "/favicon.ico",
  webClip: "/apple-touch-icon.png",
  themeColor: "#FF7518",
};

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load settings from Firebase on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const savedSettings = await getAppSettings();
        if (savedSettings) {
          setSettings({ ...defaultSettings, ...savedSettings });
        }
      } catch (err) {
        console.error("Error loading settings:", err);
        setError("Error al cargar la configuración");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Update document head when settings change
  useEffect(() => {
    updateDocumentHead(settings);
  }, [settings]);

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };

      console.log("Updating settings:", updatedSettings);

      // Update Firebase
      await updateAppSettings(updatedSettings);

      // Update local state
      setSettings(updatedSettings);

      toast.success("Configuración guardada exitosamente");
    } catch (err: any) {
      console.error("Error updating settings:", err);
      const errorMessage = err.message || err.code || "Error desconocido";
      toast.error(`Error al guardar la configuración: ${errorMessage}`);
      throw err;
    }
  };

  const value: SettingsContextType = {
    settings,
    updateSettings,
    loading,
    error,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// Utility function to update document head
const updateDocumentHead = (settings: AppSettings) => {
  // Update page title
  document.title = settings.pageTitle;

  // Update or create meta description
  updateMetaTag("description", settings.pageDescription);

  // Update OpenGraph tags
  updateMetaTag("property", "og:title", settings.ogTitle);
  updateMetaTag("property", "og:description", settings.ogDescription);
  updateMetaTag("property", "og:image", settings.ogImage);
  updateMetaTag("property", "og:url", settings.ogUrl);
  updateMetaTag("property", "og:type", "website");

  // Update Twitter Card tags
  updateMetaTag("name", "twitter:card", "summary_large_image");
  updateMetaTag("name", "twitter:title", settings.ogTitle);
  updateMetaTag("name", "twitter:description", settings.ogDescription);
  updateMetaTag("name", "twitter:image", settings.ogImage);

  // Update theme color
  updateMetaTag("name", "theme-color", settings.themeColor);
  updateMetaTag("name", "msapplication-TileColor", settings.themeColor);

  // Update favicon
  updateFavicon(settings.favicon);

  // Update Apple touch icon
  updateAppleTouchIcon(settings.webClip);
};

const updateMetaTag = (
  attributeName: string,
  attributeValue: string,
  content?: string,
) => {
  let element = document.querySelector(
    `meta[${attributeName}="${attributeValue}"]`,
  ) as HTMLMetaElement;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  if (content) {
    element.setAttribute("content", content);
  }
};

const updateFavicon = (faviconUrl: string) => {
  let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = faviconUrl;
};

const updateAppleTouchIcon = (iconUrl: string) => {
  let link = document.querySelector(
    'link[rel="apple-touch-icon"]',
  ) as HTMLLinkElement;

  if (!link) {
    link = document.createElement("link");
    link.rel = "apple-touch-icon";
    document.head.appendChild(link);
  }

  link.href = iconUrl;
};
