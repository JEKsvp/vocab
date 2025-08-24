import {createTheme} from '@mui/material/styles';

// Blue Slate & Paper Light Theme Color Tokens - "Paper" 📜
const md3Colors = {
  // Primary colors - Slate Blue
  primary: {
    main: '#4A6C8C',
    light: '#8AB4F8',
    dark: '#1A2D42',
    contrastText: '#FFFFFF',
  },
  // Secondary colors - keeping harmonious with slate blue
  secondary: {
    main: '#5E6B7A',
    light: '#B0B3B8',
    dark: '#2A2A2A',
    contrastText: '#FFFFFF',
  },
  // Tertiary colors - soft complement
  tertiary: {
    main: '#7D7A8C',
    light: '#E1E2E6',
    dark: '#2A2A2A',
    contrastText: '#FFFFFF',
  },
  // Error colors - keeping standard red for accessibility
  error: {
    main: '#B3261E',
    light: '#F9DEDC',
    dark: '#410E0B',
    contrastText: '#FFFFFF',
  },
  // Success colors - keeping accessible green
  success: {
    main: '#146C2E',
    light: '#D7F2E0',
    dark: '#0D2818',
    contrastText: '#FFFFFF',
  },
  // Background colors - Warm off-white paper
  background: {
    default: '#FAF9F6',
    paper: '#FFFFFF',
  },
  // Surface variants
  surface: {
    main: '#FFFFFF',
    variant: '#F0F0F0',
    container: '#FFFFFF',
    containerHigh: '#F8F8F8',
  },
  // Text colors - Dark slate grey
  text: {
    primary: '#2A2A2A',
    secondary: '#5E5E5E',
    disabled: '#8A8A8A',
  },
  // Outline colors - Neutral grey
  outline: {
    main: '#8A8A8A',
    variant: '#D0D0D0',
  },
};

// Blue Slate & Paper Dark Theme Color Tokens - "Slate" 🖋️
const md3ColorsDark = {
  primary: {
    main: '#8AB4F8',
    light: '#B8D4FF',
    dark: '#5A8FD8',
    contrastText: '#1A2D42',
  },
  secondary: {
    main: '#9BA3B0',
    light: '#C8CDD6',
    dark: '#7A8290',
    contrastText: '#1A1D21',
  },
  tertiary: {
    main: '#B0B3B8',
    light: '#D0D3D8',
    dark: '#909398',
    contrastText: '#1A1D21',
  },
  error: {
    main: '#F2B8B5',
    light: '#FFE0DD',
    dark: '#D89995',
    contrastText: '#410E0B',
  },
  success: {
    main: '#6DD58C',
    light: '#9AEAAC',
    dark: '#4DB56C',
    contrastText: '#0D2818',
  },
  background: {
    default: '#1A1D21',
    paper: '#26292E',
  },
  surface: {
    main: '#26292E',
    variant: '#3A3D42',
    container: '#26292E',
    containerHigh: '#32353A',
  },
  text: {
    primary: '#E1E2E6',
    secondary: '#B0B3B8',
    disabled: '#8A8D92',
  },
  outline: {
    main: '#60646B',
    variant: '#4A4E55',
  },
};

// Material Design 3 Typography Scale
const md3Typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  // Display styles
  displayLarge: {
    fontSize: '3.5rem',
    lineHeight: 1.12,
    letterSpacing: '-0.015625em',
    fontWeight: 400,
  },
  displayMedium: {
    fontSize: '2.8125rem',
    lineHeight: 1.16,
    letterSpacing: 0,
    fontWeight: 400,
  },
  displaySmall: {
    fontSize: '2.25rem',
    lineHeight: 1.22,
    letterSpacing: 0,
    fontWeight: 400,
  },
  // Headline styles
  headlineLarge: {
    fontSize: '2rem',
    lineHeight: 1.25,
    letterSpacing: 0,
    fontWeight: 400,
  },
  headlineMedium: {
    fontSize: '1.75rem',
    lineHeight: 1.29,
    letterSpacing: 0,
    fontWeight: 400,
  },
  headlineSmall: {
    fontSize: '1.5rem',
    lineHeight: 1.33,
    letterSpacing: 0,
    fontWeight: 400,
  },
  // Title styles
  titleLarge: {
    fontSize: '1.375rem',
    lineHeight: 1.27,
    letterSpacing: 0,
    fontWeight: 400,
  },
  titleMedium: {
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.009375em',
    fontWeight: 500,
  },
  titleSmall: {
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.006250em',
    fontWeight: 500,
  },
  // Label styles
  labelLarge: {
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.006250em',
    fontWeight: 500,
  },
  labelMedium: {
    fontSize: '0.75rem',
    lineHeight: 1.33,
    letterSpacing: '0.031250em',
    fontWeight: 500,
  },
  labelSmall: {
    fontSize: '0.75rem',
    lineHeight: 1.43,
    letterSpacing: '0.031250em',
    fontWeight: 500,
  },
  // Body styles
  bodyLarge: {
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.009375em',
    fontWeight: 400,
  },
  bodyMedium: {
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.015625em',
    fontWeight: 400,
  },
  bodySmall: {
    fontSize: '0.8125rem',
    lineHeight: 1.38,
    letterSpacing: '0.025000em',
    fontWeight: 400,
  },
};

// Create Material Design 3 Light Theme
export const materialDesign3LightTheme = createTheme({
  palette: {
    mode: 'light',
    ...md3Colors,
    divider: md3Colors.outline.variant,
    action: {
      hover: 'rgba(103, 80, 164, 0.08)',
      selected: 'rgba(103, 80, 164, 0.12)',
      disabled: 'rgba(28, 27, 31, 0.12)',
      focus: 'rgba(103, 80, 164, 0.12)',
    },
  },
  typography: {
    ...md3Typography,
    // Map MD3 typography to MUI variants
    h1: md3Typography.displayLarge,
    h2: md3Typography.displayMedium,
    h3: md3Typography.displaySmall,
    h4: md3Typography.headlineLarge,
    h5: md3Typography.headlineMedium,
    h6: md3Typography.headlineSmall,
    subtitle1: md3Typography.titleLarge,
    subtitle2: md3Typography.titleMedium,
    body1: md3Typography.bodyLarge,
    body2: md3Typography.bodyMedium,
    button: md3Typography.labelLarge,
    caption: md3Typography.bodySmall,
    overline: md3Typography.labelSmall,
  },
  shape: {
    borderRadius: 12, // Material Design 3 uses larger border radius
  },
  spacing: 4, // 4px base spacing unit
  components: {
    // Button component overrides
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Rounded corners for buttons
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: md3Colors.primary.main,
          color: md3Colors.primary.contrastText,
          '&:hover': {
            backgroundColor: md3Colors.primary.dark,
          },
        },
        outlined: {
          borderColor: md3Colors.outline.main,
          color: md3Colors.primary.main,
          '&:hover': {
            backgroundColor: md3Colors.primary.light,
            borderColor: md3Colors.primary.main,
          },
        },
      },
    },
    // Card component overrides
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
          backgroundColor: md3Colors.surface.container,
        },
      },
    },
    // Paper component overrides
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: md3Colors.surface.container,
        },
        elevation1: {
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        },
        elevation2: {
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        },
        elevation3: {
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    // TextField component overrides
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4, // Smaller radius for text fields
            '& fieldset': {
              borderColor: md3Colors.outline.main,
            },
            '&:hover fieldset': {
              borderColor: md3Colors.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: md3Colors.primary.main,
              borderWidth: 2,
            },
          },
        },
      },
    },
    // Chip component overrides
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        filled: {
          backgroundColor: md3Colors.surface.containerHigh,
          color: md3Colors.text.primary,
        },
      },
    },
    // Accordion component overrides
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:before': {
            display: 'none',
          },
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        },
      },
    },
  },
});

// Create Material Design 3 Dark Theme
export const materialDesign3DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...md3ColorsDark,
    divider: md3ColorsDark.outline.variant,
    action: {
      hover: 'rgba(208, 188, 255, 0.12)',
      selected: 'rgba(208, 188, 255, 0.16)',
      disabled: 'rgba(230, 225, 229, 0.12)',
      focus: 'rgba(208, 188, 255, 0.16)',
    },
  },
  typography: {
    ...md3Typography,
    // Map MD3 typography to MUI variants
    h1: md3Typography.displayLarge,
    h2: md3Typography.displayMedium,
    h3: md3Typography.displaySmall,
    h4: md3Typography.headlineLarge,
    h5: md3Typography.headlineMedium,
    h6: md3Typography.headlineSmall,
    subtitle1: md3Typography.titleLarge,
    subtitle2: md3Typography.titleMedium,
    body1: md3Typography.bodyLarge,
    body2: md3Typography.bodyMedium,
    button: md3Typography.labelLarge,
    caption: md3Typography.bodySmall,
    overline: md3Typography.labelSmall,
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 4,
  components: {
    // Button component overrides for dark theme
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: md3ColorsDark.primary.main,
          color: md3ColorsDark.primary.contrastText,
          '&:hover': {
            backgroundColor: md3ColorsDark.primary.light,
          },
        },
        outlined: {
          borderColor: md3ColorsDark.outline.main,
          color: md3ColorsDark.primary.main,
          '&:hover': {
            backgroundColor: md3ColorsDark.primary.dark,
            borderColor: md3ColorsDark.primary.main,
          },
        },
      },
    },
    // Card component overrides for dark theme
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
          backgroundColor: md3ColorsDark.surface.container,
        },
      },
    },
    // Paper component overrides for dark theme
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: md3ColorsDark.surface.container,
        },
        elevation1: {
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        },
        elevation2: {
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        },
        elevation3: {
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    // TextField component overrides for dark theme
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            '& fieldset': {
              borderColor: md3ColorsDark.outline.main,
            },
            '&:hover fieldset': {
              borderColor: md3ColorsDark.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: md3ColorsDark.primary.main,
              borderWidth: 2,
            },
          },
        },
      },
    },
    // Chip component overrides for dark theme
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        filled: {
          backgroundColor: md3ColorsDark.surface.containerHigh,
          color: md3ColorsDark.text.primary,
        },
      },
    },
    // Accordion component overrides for dark theme
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:before': {
            display: 'none',
          },
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        },
      },
    },
  },
});