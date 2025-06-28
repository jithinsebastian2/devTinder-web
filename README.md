# DevTinder-web
 - Create a Vite + React application
 - Remove unnecessary code and create a Hello word app
 - Install tailwind CSS and Daisy UI
 - Add NavBar component ti App.jsx
 - Create NabBar.jsx separate file
 - Install react-router-dom
 - Create BrowserRouter > Routes > Route
 - Create and Outlet in your body component
 - Create a Footer component
 - Create a Login page
 - Install axios
 - CORS - install cors in BE => add middleware to with configuration: origin, credentials: true
 - Whenever you are making API call so pass axios => { withCredentials: true }
 - Install react-redux + @reduxjs/toolkit
 - configureStore => Provider => createSlice and add reducer to store
 - Add redux devtools in chrome
 - Login and see if your data is coming properly in the store
 - Navbar should update as soon as user logs in
 - Refactor the code to add constants file + create a components folder
 - You should not access other routes without login
 - If token is not present, redirect user to login page
 - Logout feature
 - Get the feed and add the feed in the store
 - build the user card on feed
 - Edit profile feature
 - Show toast message on save of profile
 - New page - view all my connections
 - New page - See all my connection requests
 - Feature - Accept/reject connection requests
 - Send/Ignore the user card from the feed


 # Deployment

 - SignUp to AWS
 - Launch Ec2 instance
 - chmod 400 <secret>.pem
 - Connect to the EC2 instance machine to the below command:
   ssh -i "devTinder-secret.pem" ubuntu@ec2-13-53-46-214.eu-north-1.compute.amazonaws.com
 - Install node by using the CURL command from node.js website (Install the same local node version on the Ec2 machine. Else it might cause version mismatch issues)
 - Then exit/stop the machine using 'exit' command and run the EC2 connect command again
 - Clone the devTinder-web and devTinder to the EC2 machine by using terminal git clone <repository url> command
 - FrontEnd
   - npm install
   - npm run build
   - sudo apt update - for Update the Ec2 ubuntu machine
   - sudo apt install nginx - to install nginx on ubuntu, it will provide an http server on cloud
   - sudo systemctl start nginx
   - sudo systemctl enable nginx 
   - copy code from dist(build files) to nginx http server(/var/www/html/)
   - command: sudo scp -r dist/* /var/www/html/
   - Enable port 80 on your EC2 instance for running the app on nginx server










# React + Vite

<!-- This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->
