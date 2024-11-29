 ## Introduction

 `Stencil UI` is a robust, open-source development UI library designed to revolutionize the creation of scalable and secure web applications. Stencil UI simplifies the use of common UI components in production-ready code, ensuring consistency, predictability, and adherence to the highest standards with code that’s built to scale.

Our user-friendly interface fosters seamless integration with APIs, data models, databases, authentication, and authorization. Built on a flexible, mono-repo architecture, Stencil UI allows effortless customization of the code and offers a diverse range of integrations.

With a strong focus on collaboration, Stencil UI streamlines team-oriented development, making it an ideal choice for groups of all sizes, from startups to large enterprises. Our UI Library enables you to concentrate on your business logic, while we handle the heavy lifting on the UI side.

Experience the fastest way to develop web applications with Stencil UI.

 ## Table of Contents
- [Screenshot](#screenshot)
- [Usage](#usage)
- [Development](#development)
- [Resources](#resources)
- [Structure](#structure)
- [Contributing](#contributing)
- [Conclusion](#conclusion)
- [License](#license)


## Screenshot
![all-molecules-app](https://github.com/SamagraX-Stencil/stencil-web/assets/88641794/8a261351-35bf-4f6d-820f-785611fc1afa)
![bot-app](https://github.com/SamagraX-Stencil/stencil-web/assets/88641794/c6bca5ba-be18-4049-af3a-c7d5ee63475d)


## Some Important Terminologies
### Molecules
A molecule is a compound component made up of various atoms. It represents a more intricate UI element designed to fulfill a specific function within an application's interface. For example, a JSON to Table or an OTP (One-Time Password) Input Molecule, each composed of multiple atoms to provide a comprehensive and functional unit.

All molecules currently supported can be viewed on this [website](https://stencil-ui-templates.vercel.app/).

 

## Usage 

To get started with Stencil-UI, you can use the hosted version of the product to check all the available molecules. You can get started immediately at [stencil-ui-templates](https://stencil-ui-templates.vercel.app/). The [website](https://stencil-ui-templates.vercel.app) provides an overview of the application, and additional information on the product and guides can be found in the [docs](https://stencil-docs.vercel.app/).


## Development
 Pre-requisites

To start development on Stencil UI, make sure that you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [Yarn](https://yarnpkg.com/)
- [Turborepo](https://turborepo.org/)
- [Git](https://git-scm.com/)
- [StoryBook](https://storybook.js.org/)

### Running Stencil UI

> **Note**
> It is also possible to start development with GitHub Codespaces. When navigating to `< > Code`, select `Codespaces` instead of `Local`. Click on either the `+` sign or the `Create codespace on master` button.

Stencil UI uses a monorepo architecture - powered by [Turbo Repo](https://turbo.build/repo) - where multiple applications and libraries exist in a single repository. To set up a local development environment, follow these steps:

**BEFORE** you run the following steps, make sure:
- You have TypeScript installed locally on your machine: `npm install -g typescript`
- You are using a supported Node.js version (check `engines` `node` in the [package.json](./package.json))
- You are using a supported npm version (check `engines` `npm` in the [package.json](./package.json))


1. Clone the repository and install dependencies:

    ```shell
    git clone https://github.com/SamagraX-Stencil/stencil-web && cd stencil-web && yarn install
    ```
2. To start the local development

- first, create a build of all packages using

    ```bash
    turbo build
    ```

- now start the project

    ```bash
    turbo dev
    ```
> **Note**
>   The above command will start all bot-app/ and all-molecule-example/ on the 7001 and 3001 ports respectively

The development environment should now be set up.Happy hacking! 👾
 
## Structure

The repository is organized as follows:

```
stencil-ui/
stencil-ui/
├── packages/
│   ├── molecules/
│   ├── pages/
│   ├── config-manager/
│   ├── chatui/
│   ├── hooks/
│   └── provider/
├── apps/
│   ├── all-molecule-example/
│   └── bot-app/
├── node_modules/
├── package.json
├── turbo.json
└── CONTRIBUTION.md


```
 
- `packages/`: Contains shared libraries and modules.
- `apps/`: Contains the different applications.
- `node_modules/`: Automatically generated directory containing installed dependencies.
- `package.json`: Contains metadata about the project and dependencies.
- `turbo.json`: Configuration file for Turborepo.
- `CONTRIBUTION.md`: Contribution guidelines.




## Resources

- **[Website](https://stencil-ui-templates.vercel.app/)**: Overview of the product.
- **[Docs](https://stencil-docs.vercel.app/)**: Our Comprehensive documentation on the product.
- **[Discord](https://discord.gg/)**: Support and discussions with the community and the team.

 
## Contributing

The Stencil-UI code is open-source. We are committed to a transparent development process and highly appreciate any contributions. Whether you are helping us fix bugs, proposing new features, improving our documentation, or spreading the word - we would love to have you as a part of the Samagra community.  

- **Bug Report**: If you see an error message or encounter an issue while using Stencil-UI, please create a [bug report]( https://github.com/SamagraX-Stencil/stencil-web/issues/new).

- **Feature Request**: If you have an idea or if there is a capability that is missing and would make development easier and more robust, please submit a [feature request]( https://github.com/SamagraX-Stencil/stencil-web/issues/new).

- **Documentation Request**: If you're reading the Stencil-UI docs and feel like you're missing something, please submit a [documentation request](https://github.com/SamagraX-Stencil/stencil-web/issues/new).

Not sure where to start? Join our discord and we will help you get started!


## How to Create a New Molecule
---

All the new Molecules are created via the `packages` folder in the repo.

stencil-ui/
stencil-ui/
├── packages/
│   ├── molecules/
│   ├── pages/
│   ├── config-manager/
│   ├── chatui/
│   ├── hooks/
│   └── provider/

Any kind of new molecule is create inside the `packages/molecule/src` folder that will house multiple other packages that can be used anywhere.
 
 Each Molecule should come with it's StoryBook and Unit.
 
 > Checkout the `packages/molecule/src/list` for a example Molecule Structure

### Step 1: Creating a new Molecule

1. **Navigate** to the `packages` directory

    ```bash 
    cd packages/molecule/src
    ```

2. **Create** a new directory for your molecule.
    ```bash
        mkdir new-molecule
        cd molecules/new-molecule
    ```

3. **Setup** the folder structure for your molecule.


4. **Implement** your molecule.
   - Create a `index.tsx` file for your molecule.
    ```tsx
    import React from 'react';

    interface NewMoleculeProps {
      items: string[];
    }

    const NewMolecule: React.FC<NewMoleculeProps> = ({ items }) => (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );

    export default NewMolecule;
    ```

### Step 2: Writing the Test Cases

1. **Install testing dependencies** (if not already installed):
    ```bash
    yarn add --dev jest @testing-library/react @testing-library/jest-dom
    ```
2. **Create** a test file for your component:

- Create a  `index.test.tsx` for the test file
  

    ```tsx
    import React from 'react';
    import { render } from '@testing-library/react';
    import '@testing-library/jest-dom/extend-expect';
    import NewMolecule from './NewMolecule';

    test('renders list items', () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];
      const { getByText } = render(<NewMolecule items={items} />);

      items.forEach(item => {
        expect(getByText(item)).toBeInTheDocument();
      });
    });
    ```
3. **Run** the tests:

    ```bash
    yarn test
    ```

### Step 3: Add to Storybook

1. **Install** Storybook dependencies (if not already installed):

    ```bash
    yarn dlx sb init
    ```

2. **Create** a Storybook file for your component

- Create a `index.stories.tsx` for your component
  

    
     ```tsx
    import React from 'react';
    import { Meta, Story } from '@storybook/react';
    

    export default {
      title: 'Molecules/NewMolecule',
      component: NewMolecule,
    } as Meta;

    const Template: Story<NewMoleculeProps> = (args) => <NewMolecule {...args} />;

    export const Default = Template.bind({});
    Default.args = {
      items: ['Item 1', 'Item 2', 'Item 3'],
    };
    ```

3. **Run** Storybook:
    ```bash
    yarn storybook
    ```


## Conclusion
You have now created a new molecule, written test cases for it, and added it to Storybook. Great job! If you have any questions or need further assistance, feel free to reach out to the team. Happy coding! 👾

## License

This project is licensed under the MIT License.  

---

Thank you for using Stencil-UI. If you have any questions or feedback, feel free to open an issue.

 
