# GatewaysFront
This sample project is managing gateways - master devices that control multiple peripheral devices.
This project was made with [Angular](https://angular.io/start) version 12.2.0.

# Pre-requisites
- Install [Angular CLI](https://github.com/angular/angular-cli) version 12.2.15 or higher

# Getting started
- Clone the repository
```
git clone https://github.com/luismi930213/gateways-frontend.git
```
- Install dependencies
```
cd <project_name>
npm install
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` in the browser. The app will automatically reload if you change any of the source files.

## API Connection
This web is intended to run using [Gateways Backend](https://github.com/luismi930213/gateways-backend) project, by default is set to connect in http://localhost:3000 in case of running the server in a diferent location, just change the environment **apiUrl** value in **src/environments** to the new value.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

