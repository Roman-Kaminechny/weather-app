"use client"

import * as React from "react"
import { 
  Theme, 
  ThemeColors, 
  ThemeContextType, 
  ThemeRadius,
  PanelBackgroundType
} from "@/lib/theme-types";
import { 
  getAllThemes, 
  getThemeById, 
  addCustomTheme, 
  loadCustomThemes, 
  removeCustomTheme,
  officialThemes
} from "@/lib/theme-registry";

// Create the context with a default value
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Load custom themes from local storage
  React.useEffect(() => {
    loadCustomThemes();
  }, []);

  // Initialize with default theme (first official theme)
  const [currentTheme, setCurrentThemeState] = React.useState<Theme>(officialThemes[0]);
  const [colors, setColors] = React.useState<ThemeColors>(currentTheme.colors);
  const [radius, setRadius] = React.useState<ThemeRadius>(currentTheme.radius);
  const [borderWidth, setBorderWidth] = React.useState(currentTheme.borderWidth);
  const [defaultTheme, setDefaultTheme] = React.useState(false);
  const [defaultDarkTheme, setDefaultDarkTheme] = React.useState(false);
  const [darkColorScheme, setDarkColorScheme] = React.useState(false);
  const [scaling, setScaling] = React.useState<string>(currentTheme.scaling || "100%");
  const [panelBackground, setPanelBackground] = React.useState<PanelBackgroundType>(currentTheme.panelBackground || "solid");

  // Set the current theme, updating all related state
  const setCurrentTheme = (theme: Theme) => {
    setCurrentThemeState(theme);
    setColors(theme.colors);
    setRadius(theme.radius);
    setBorderWidth(theme.borderWidth);
    setScaling(theme.scaling || "100%");
    setPanelBackground(theme.panelBackground || "solid");
    
    // Apply the theme to CSS variables
    applyThemeToCssVariables(theme);
    
    // Store the current theme ID in localStorage
    localStorage.setItem('current-theme-id', theme.id);
  };

  // Save the current configuration as a theme
  const saveTheme = () => {
    // Create a theme object from current settings
    const themeToSave: Theme = {
      id: `custom-${Date.now()}`,
      name: "Custom Theme",
      description: "Your custom theme",
      colors,
      radius,
      borderWidth,
      fontFamily: "Inter, system-ui, sans-serif", // Default or from state
      type: "custom",
      isDark: darkColorScheme,
      scaling,
      panelBackground
    };
    
    // Add to custom themes and select it
    addCustomTheme(themeToSave);
    setCurrentTheme(themeToSave);
  };

  // Export theme to JSON
  const exportTheme = () => {
    const themeToExport: Theme = {
      id: `export-${Date.now()}`,
      name: "Exported Theme",
      description: "Theme exported from the configurator",
      colors,
      radius,
      borderWidth,
      fontFamily: "Inter, system-ui, sans-serif", // Default or from state
      type: "custom",
      isDark: darkColorScheme,
      scaling,
      panelBackground
    };
    
    return JSON.stringify(themeToExport, null, 2);
  };

  // Import theme from JSON
  const importTheme = (themeJson: string) => {
    try {
      const importedTheme = JSON.parse(themeJson) as Theme;
      
      // Ensure required properties exist
      if (!importedTheme.colors || !importedTheme.radius || !importedTheme.borderWidth) {
        throw new Error("Invalid theme format");
      }
      
      // Generate a unique ID for the imported theme
      importedTheme.id = `imported-${Date.now()}`;
      importedTheme.type = "custom";
      
      // Add to custom themes and select it
      addCustomTheme(importedTheme);
      setCurrentTheme(importedTheme);
      
      return true;
    } catch (e) {
      console.error("Failed to import theme:", e);
      return false;
    }
  };

  // Reset to the default theme
  const resetToDefaults = () => {
    setCurrentTheme(officialThemes[0]);
  };

  // Apply theme settings to CSS variables
  const applyThemeToCssVariables = (theme: Theme) => {
    if (typeof document === 'undefined') return; // SSR check
    
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      // Handle special case for border, ring and other colors that need HSL format
      if (key === 'border' || key === 'card-border' || key === 'ring' || key === 'input') {
        // Extract HSL values from the string and set them in the ShadCN format
        const match = value.match(/hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*\)/);
        if (match) {
          const [_, h, s, l] = match;
          root.style.setProperty(`--${key}`, `${h} ${s}% ${l}%`);
        } else {
          root.style.setProperty(`--${key}`, value);
        }
      } else {
        // For other colors, set them directly
        root.style.setProperty(`--${key}`, value);
        
        // Calculate and set foreground colors
        if (!key.includes('foreground')) {
          const foregroundKey = `${key}-foreground`;
          // Only set foreground if not already explicitly defined
          if (!theme.colors[foregroundKey]) {
            const foregroundColor = key === 'neutral' 
              ? (theme.isDark ? 'hsl(0, 0%, 98%)' : 'hsl(222.2, 47.4%, 11.2%)') 
              : getContrastColor(value);
            root.style.setProperty(`--${foregroundKey}`, foregroundColor);
          }
        }
      }
    });
    
    // Apply radius
    Object.entries(theme.radius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });
    
    // Apply border width
    root.style.setProperty('--border-width', `${theme.borderWidth}px`);
    
    // Apply scaling
    root.style.setProperty('--ui-scaling', theme.scaling || "100%");
    
    // Apply panel background type
    root.style.setProperty('--panel-background', theme.panelBackground || "solid");
    
    // Apply typography if available
    if (theme.fontFamily) {
      root.style.setProperty('--font-family', theme.fontFamily);
    }
    
    if (theme.baseFontSize) {
      root.style.setProperty('--font-size-base', `${theme.baseFontSize}px`);
    }
    
    if (theme.lineHeight) {
      root.style.setProperty('--line-height-base', theme.lineHeight.toString());
    }
    
    if (theme.fontWeights) {
      Object.entries(theme.fontWeights).forEach(([weight, value]) => {
        root.style.setProperty(`--font-weight-${weight}`, value.toString());
      });
    }
    
    // Apply effects if available
    if (theme.effects) {
      root.style.setProperty('--depth-effect', theme.effects.depth ? '1' : '0');
      root.style.setProperty('--noise-effect', theme.effects.noise ? '1' : '0');
      
      // Set data attributes for effects to work with CSS selectors
      document.documentElement.setAttribute('data-depth-effect', theme.effects.depth ? '1' : '0');
      document.documentElement.setAttribute('data-noise-effect', theme.effects.noise ? '1' : '0');
    }
    
    // Apply shadow definitions if available
    if (theme.shadows) {
      Object.entries(theme.shadows).forEach(([key, value]) => {
        const varName = key === 'DEFAULT' ? '--shadow' : `--shadow-${key}`;
        if (value !== undefined) {
          root.style.setProperty(varName, value);
        }
      });
    }
    
    // Apply custom CSS if available
    if (theme.customCss) {
      const style = document.getElementById('theme-custom-css') || document.createElement('style');
      style.id = 'theme-custom-css';
      style.textContent = theme.customCss;
      if (!document.getElementById('theme-custom-css')) {
        document.head.appendChild(style);
      }
    } else {
      const existingStyle = document.getElementById('theme-custom-css');
      if (existingStyle) {
        existingStyle.textContent = '';
      }
    }
    
    // Set dark mode class if needed
    if (theme.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Load the saved theme on initial render
  React.useEffect(() => {
    const savedThemeId = localStorage.getItem('current-theme-id');
    if (savedThemeId) {
      const savedTheme = getThemeById(savedThemeId);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      }
    }
  }, []);

  // Apply CSS variable changes when component state changes
  React.useEffect(() => {
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Apply radius
    Object.entries(radius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });
    
    // Apply border width
    root.style.setProperty('--border-width', `${borderWidth}px`);
    
    // Apply scaling
    root.style.setProperty('--ui-scaling', scaling);
    
    // Apply panel background type
    root.style.setProperty('--panel-background', panelBackground);
    
  }, [colors, radius, borderWidth, scaling, panelBackground]);
  
  // Helper to get contrasting color for text
  const getContrastColor = (bgColor: string): string => {
    // This is a simplified version - a real implementation would parse the HSL and calculate contrast
    if (bgColor.includes('hsl')) {
      // Extract lightness from HSL
      const match = bgColor.match(/hsl\(\s*\d+\s*,\s*\d+(?:\.\d+)?%\s*,\s*(\d+(?:\.\d+)?)%\s*\)/);
      if (match && match[1]) {
        const lightness = parseFloat(match[1]);
        return lightness > 60 ? 'hsl(222.2, 47.4%, 11.2%)' : 'hsl(0, 0%, 98%)';
      }
    }
    return 'hsl(0, 0%, 98%)'; // Default to light text
  };

  const contextValue: ThemeContextType = {
    currentTheme,
    setCurrentTheme,
    colors,
    setColors,
    radius,
    setRadius,
    borderWidth,
    setBorderWidth,
    defaultTheme,
    setDefaultTheme,
    defaultDarkTheme,
    setDefaultDarkTheme,
    darkColorScheme,
    setDarkColorScheme,
    scaling,
    setScaling,
    panelBackground,
    setPanelBackground,
    saveTheme,
    exportTheme,
    importTheme,
    resetToDefaults
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
} 