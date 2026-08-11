# Simple Components UI

A reusable React + TypeScript UI component library built with **Tailwind CSS**, **shadcn/ui**, and **Framer Motion**.

Simple Components UI provides reusable, customizable components designed to speed up development while keeping interfaces consistent and responsive.

## Installation

Install the package from npm:

```bash
npm install @simple-components-ui/components
```

## Usage

Import components directly from the package:

```tsx
import { Button } from "@simple-components-ui/components";

export default function Example() {
  return (
    <Button>
      Get Started
    </Button>
  );
}
```

## Components

The library is organized into reusable component categories.

### Forms

* Button
* Input
* Textarea
* Select
* Checkbox
* Radio
* Switch
* Form components

### Overlays

* Modal
* Drawer
* Popover
* Tooltip
* Dropdown
* Context menu

### Feedback

* Alert
* Toast
* Progress
* Spinner
* Skeleton
* Empty state

### Navigation

* Tabs
* Breadcrumb
* Pagination
* Sidebar
* Stepper

### Data Display

* Card
* Badge
* Avatar
* Table
* Data table
* Timeline

### Drag & Drop

The library includes reusable drag-and-drop components that allow existing React elements to participate in drag-and-drop interactions without requiring the underlying component to be rewritten.

Example:

```tsx
import { DndWrapper } from "@simple-components-ui/components";

export default function Example() {
  return (
    <DndWrapper id="item-1">
      <div>
        Drag me
      </div>
    </DndWrapper>
  );
}
```

More drag-and-drop functionality will be added as the library evolves.

## Design & Technology

Simple Components UI is built around several technologies:

* **React** — Component architecture
* **TypeScript** — Type safety and developer experience
* **Tailwind CSS** — Utility-first styling
* **shadcn/ui** — UI patterns and accessible component foundations
* **Framer Motion** — Animations and transitions
* **tsup** — Library bundling and TypeScript declaration generation

## TypeScript

The library ships with TypeScript declaration files, providing type safety and editor autocomplete when consuming the package.

```tsx
import { Button } from "@simple-components-ui/components";

<Button variant="primary">
  Save Changes
</Button>
```

## Development

Clone the repository:

```bash
git clone https://github.com/AsimAliMurtaza/simple-components-ui.git
cd simple-components-ui
```

Install dependencies:

```bash
npm install
```

Start the development environment:

```bash
npm run dev
```

Build the npm package:

```bash
npm run build
```

The compiled package is generated inside:

```text
dist/
```

## Project Structure

```text
simple-components-ui/
│
├── app/
│   └── ...                    # Demo / development application
│
├── components/
│   ├── forms/
│   ├── overlays/
│   ├── feedback/
│   ├── navigation/
│   ├── data/
│   └── dnd/
│
├── index.ts                   # Public package exports
├── package.json
├── tsconfig.json
└── README.md
```

The `components/` directory contains the reusable library components, while `app/` provides the development and demonstration environment.

## Publishing

The package is published to npm as:

```text
@simple-components-ui/components
```

Before publishing a new release, build the package:

```bash
npm run build
```

Preview the files that will be included:

```bash
npm pack --dry-run
```

For a new minor release:

```bash
npm version minor
npm publish
git push --follow-tags
```

The package follows [Semantic Versioning](https://semver.org/).

## Roadmap

Simple Components UI is actively evolving.

Planned improvements include:

* More reusable form components
* Advanced overlays
* Data tables
* Command palette
* Combobox
* Date picker
* Advanced drag-and-drop components
* Improved accessibility
* Component tests
* More comprehensive documentation
* Improved theming
* Automated CI/CD releases

## Contributing

Contributions, suggestions, and improvements are welcome.

If you find a bug or have an idea for a component, open an issue or submit a pull request.

Before submitting a pull request, make sure the project builds successfully:

```bash
npm run build
```

## License

This project is licensed under the **MIT License**.

## Author

**Asim Ali Murtaza**

Software Engineer focused on full-stack development, AI engineering, reusable systems, and modern web applications.

* GitHub: [AsimAliMurtaza](https://github.com/AsimAliMurtaza)
* npm: [@simple-components-ui](https://www.npmjs.com/org/simple-components-ui)

---

Built to make reusable UI development simpler.
