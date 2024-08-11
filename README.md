# Z4nOS - Z4nterox Personal Website

An interactive CLI in a simulated, customized (and most importantly: fake) Linux distribution called ZanOS. This project was created mainly as a fun side project.

You can see it in action at [Z4nterox.dev](https://z4nterox.dev).

## Project Overview

Z4nOS does not rely on any of the NextJS server features, allowing it to export static HTML pages. This makes it ideal for deployment on simple web servers without the need for server-side rendering.

## Setup

Follow these steps to set up and run the project locally:

1. **Install Dependencies:**
   Run the following command to install all necessary npm packages:
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   Launch the development server with:
   ```bash
   npm run dev
   ```
   Then, open your browser and go to [`http://localhost:3000/`](http://localhost:3000/) to see the website in action. If you make any changes, press `Ctrl + R` to reload the page if the changes are not reflected automatically through hot reload.

3. **Build for Production:**
   To generate static HTML pages for deployment, run:
   ```bash
   npm run build
   ```
   Once the build process is complete, you can find the generated files in the `out` folder, ready for deployment on your web server.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues) if you have any questions or ideas.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

