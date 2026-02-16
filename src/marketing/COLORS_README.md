# Marketing Colors System

This file contains the centralized color palette for the marketing section of the real estate application.

## Usage

### Basic Import
```javascript
import colors from './colors';

// Use colors in your styles
const buttonStyle = {
  backgroundColor: colors.primary.main,
  color: colors.text.white
};
```

### Available Color Categories

#### Primary Colors
- `colors.primary.main` - Main brand color (#3182ce)
- `colors.primary.dark` - Darker variant (#2c5aa0)
- `colors.primary.light` - Lighter variant (#4299e1)
- `colors.primary.lighter` - Lightest variant (#63b3ed)

#### Secondary Colors
- `colors.secondary.main` - Secondary brand color (#1a365d)
- `colors.secondary.dark` - Darker variant (#153e75)
- `colors.secondary.light` - Lighter variant (#2d3748)

#### Background Colors
- `colors.background.white` - Pure white (#ffffff)
- `colors.background.light` - Light gray (#f7fafc)
- `colors.background.gray` - Medium gray (#edf2f7)
- `colors.background.dark` - Dark background (#1a365d)

#### Text Colors
- `colors.text.primary` - Primary text (#1a365d)
- `colors.text.secondary` - Secondary text (#4a5568)
- `colors.text.light` - Light text (#718096)
- `colors.text.white` - White text (#ffffff)
- `colors.text.muted` - Muted text (#cbd5e0)

#### Status Colors
- `colors.status.success` - Success green (#38a169)
- `colors.status.warning` - Warning yellow (#d69e2e)
- `colors.status.error` - Error red (#e53e3e)
- `colors.status.info` - Info blue (#3182ce)

#### Border Colors
- `colors.border.light` - Light border (#e2e8f0)
- `colors.border.medium` - Medium border (#cbd5e0)
- `colors.border.dark` - Dark border (#a0aec0)

#### Shadow Colors
- `colors.shadow.light` - Light shadow (rgba(0, 0, 0, 0.1))
- `colors.shadow.medium` - Medium shadow (rgba(0, 0, 0, 0.15))
- `colors.shadow.dark` - Dark shadow (rgba(0, 0, 0, 0.25))

#### Overlay Colors
- `colors.overlay.light` - Light overlay (rgba(0, 0, 0, 0.3))
- `colors.overlay.medium` - Medium overlay (rgba(0, 0, 0, 0.5))
- `colors.overlay.dark` - Dark overlay (rgba(0, 0, 0, 0.7))
- `colors.overlay.white` - White overlay (rgba(255, 255, 255, 0.1))

### Utility Functions

#### getColor(path)
Get a color using dot notation:
```javascript
import { getColor } from './colors';

const primaryColor = getColor('primary.main'); // Returns '#3182ce'
```

#### rgba(color, alpha)
Convert hex color to rgba with custom alpha:
```javascript
import { rgba } from './colors';

const transparentBlue = rgba('#3182ce', 0.5); // Returns 'rgba(49, 130, 206, 0.5)'
```

## Best Practices

1. **Always use the centralized colors** instead of hardcoded hex values
2. **Use semantic color names** (e.g., `colors.text.primary` instead of `colors.primary.main` for text)
3. **Maintain consistency** across all components
4. **Update this file** when adding new colors to the palette
5. **Use overlay colors** for background overlays on images
6. **Use shadow colors** for consistent box shadows

## Example Component

```javascript
import colors from '../colors';

const ExampleComponent = () => {
  const containerStyle = {
    backgroundColor: colors.background.white,
    color: colors.text.primary,
    border: `1px solid ${colors.border.light}`,
    boxShadow: `0 2px 4px ${colors.shadow.light}`
  };

  const buttonStyle = {
    backgroundColor: colors.primary.main,
    color: colors.text.white,
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '5px'
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle}>Click Me</button>
    </div>
  );
};
```