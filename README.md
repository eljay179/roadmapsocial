# Interactive Project Roadmap

A beautiful, interactive roadmap component built with React, TypeScript, and Tailwind CSS. Features smooth scrolling animations, timeline navigation, and responsive design.

![Roadmap Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&h=600)

## Features

- 🎯 Interactive timeline navigation
- 📱 Fully responsive design
- ✨ Smooth scroll animations
- 🎨 Customizable themes
- 📅 Automatic current period highlighting
- 🔄 Progress status indicators
- 🖱️ Click-to-navigate timeline

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/interactive-roadmap.git
cd interactive-roadmap
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Customization

### Modifying Roadmap Data

Edit `src/components/RoadmapTimeline/roadmapData.tsx` to update the roadmap items:

```typescript
export const roadmapData = [
  {
    title: 'Your Milestone',
    date: 'Q1 2024',  // Format: 'Q[1-4] YYYY'
    description: 'Description of your milestone',
    icon: <YourIcon className="w-6 h-6" />,
    status: 'not-started' | 'in-progress' | 'completed'
  },
  // Add more items...
];
```

### Styling

#### Colors and Theme

1. Update the gradient colors in `src/App.tsx`:
```tsx
<div className="min-h-screen bg-gradient-to-b from-[#yourColor] to-[#yourColor]">
```

2. Modify card styling in `src/components/RoadmapTimeline/RoadmapCard.tsx`:
```tsx
<div className="bg-[#yourColor]/10 backdrop-blur-lg ...">
```

#### Timeline Appearance

Customize the timeline in `src/components/RoadmapTimeline/HorizontalTimeline.tsx`:

```tsx
// Timeline line
<div className="h-0.5 bg-[#yourColor]/30 ..." />

// Timeline nodes
<button className="... bg-[#yourColor]" />
```

### Layout

Adjust spacing and layout in `src/components/RoadmapTimeline/RoadmapTimeline.tsx`:

```tsx
// Modify top padding
<div className="relative pt-[yourValue]">

// Adjust card container padding
<div className="pb-[yourValue] px-[yourValue]">
```

## Component Structure

```
src/components/RoadmapTimeline/
├── RoadmapTimeline.tsx    # Main component
├── Header.tsx             # Title and description
├── HorizontalTimeline.tsx # Interactive timeline
├── RoadmapCard.tsx       # Individual milestone cards
└── roadmapData.tsx       # Roadmap content
```

## Integration

To use this component in your project:

1. Copy the `RoadmapTimeline` directory to your components folder
2. Import required dependencies:
```tsx
import { RoadmapTimeline } from './components/RoadmapTimeline/RoadmapTimeline';
```

3. Use the component:
```tsx
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900">
      <RoadmapTimeline />
    </div>
  );
}
```

## Dependencies

- React 18.x
- TypeScript 5.x
- Tailwind CSS 3.x
- Lucide React (for icons)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.