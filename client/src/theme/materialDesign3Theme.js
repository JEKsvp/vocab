import {createTheme} from '@mui/material/styles';

// Material Design 3 Color Tokens
const md3Colors = {
  // Primary colors
  primary: {
    main: '#6750A4',
    light: '#EADDFF',
    dark: '#21005D',
    contrastText: '#FFFFFF',
  },
  // Secondary colors
  secondary: {
    main: '#625B71',
    light: '#E8DEF8',
    dark: '#1D192B',
    contrastText: '#FFFFFF',
  },
  // Tertiary colors
  tertiary: {
    main: '#7D5260',
    light: '#FFD8E4',
    dark: '#31111D',
    contrastText: '#FFFFFF',
  },
  // Error colors
  error: {
    main: '#B3261E',
    light: '#F9DEDC',
    dark: '#410E0B',
    contrastText: '#FFFFFF',
  },
  // Success colors (custom for the app)
  success: {
    main: '#146C2E',
    light: '#D7F2E0',
    dark: '#0D2818',
    contrastText: '#FFFFFF',
  },
  // Surface colors
  background: {
    default: '#FFFBFE',
    paper: '#FFFBFE',
  },
  // Surface variants
  surface: {
    main: '#FEF7FF',
    variant: '#E7E0EC',
    container: '#F3EDF7',
    containerHigh: '#ECE6F0',
  },
  // Text colors
  text: {
    primary: '#1C1B1F',
    secondary: '#49454F',
    disabled: '#49454F',
  },
  // Outline colors
  outline: {
    main: '#79747E',
    variant: '#CAC4D0',
  },
};

// Dark theme color tokens
const md3ColorsDark = {
  primary: {
    main: '#D0BCFF',
    light: '#4F378B',
    dark: '#EADDFF',
    contrastText: '#21005D',
  },
  secondary: {
    main: '#CCC2DC',
    light: '#4A4458',
    dark: '#E8DEF8',
    contrastText: '#1D192B',
  },
  tertiary: {
    main: '#EFB8C8',
    light: '#633B48',
    dark: '#FFD8E4',
    contrastText: '#31111D',
  },
  error: {
    main: '#F2B8B5',
    light: '#601410',
    dark: '#F9DEDC',
    contrastText: '#410E0B',
  },
  success: {
    main: '#6DD58C',
    light: '#0F5132',
    dark: '#D7F2E0',
    contrastText: '#0D2818',
  },
  background: {
    default: '#1C1B1F',
    paper: '#1C1B1F',
  },
  surface: {
    main: '#1A1A1E',
    variant: '#4F4B55',
    container: '#2A2831',
    containerHigh: '#343139',
  },
  text: {
    primary: '#E6E1E5',
    secondary: '#D0C4D0',
    disabled: '#B8B1B8',
  },
  outline: {
    main: '#A5A1AB',
    variant: '#5A555F',
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