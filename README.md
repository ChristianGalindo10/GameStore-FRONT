# E-Commerce Gamer Front-end
***
*[Documentación de diseño y arquitectura](https://github.com/ChristianGalindo10/GameStore-BACK/blob/main/Dise_o_de_Software.pdf)*

El proyecto consiste en la elaboración de una plataforma web que implementa el comercio electrónico o e-commerce como es mayormente conocido, en el ámbito del mercado de los videojuegos. Para el desarrollo backend se utiliza un lenguaje core Java haciendo uso del framework Spring Boot, y para el desarrollo frontend (HTML,CSS y Scripting) se utiliza el framework Angular.

El proyecto tiene tres grandes componentes: Una base de datos, una aplicación Spring Boot y la aplicación Angular. La base de datos guarda la información de la tienda online, como lo es la información de los clientes, pedidos y productos además de realizar las funciones básicas CRUD. El sistema de gestión de base de datos utilizado es MySQL.

La aplicación Spring Boot(framework para desarrollo de aplicaciones java), es la intermediaria entre el sistema gestor de base de datos y la aplicación Angular. Se encarga de consultar la base de datos para obtener la información que se necesita mostrar en el lado del cliente. Además de procesar las peticiones que la aplicación Angular realice, como las funciones básicas CRUD relacionadas con clientes,administradores o productos.

Por último la aplicación Angular(framework para desarrollo de aplicaciones web, su principal lenguaje de programación es TypeScript), es la encargada de la interacción con el usuario, esta se encarga de desplegar la interfaz gráfica y atender las peticiones, comunicándolas a la aplicación Spring Boot. Luego de recibir una respuesta del lado servidor, la aplicación Angular procesa dicha respuesta para mostrarla en el lado cliente, obteniendo así una buena interacción con el usuario.

![Comportamiento](https://github.com/ChristianGalindo10/GameStore-FRONT/blob/master/Readme_assets/Comportamiento.png)


## Tecnologías utilizadas
***
* [Angular CLI](https://angular.io/cli): Versión 10.0.7
* [Spring Boot](https://spring.io/projects/spring-boot): Versión 2.3.4
* [MySQL](https://dev.mysql.com/doc/): Versión 8.0.23

## Conexión con base de datos
***
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=****
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.platform=mysql
spring.datasource.initialization-mode=always
spring.jpa.hibernate.ddl-auto=update
spring.jackson.serialization.fail-on-empty-beans=false
```

## Resultado
***
![Resultado](https://github.com/ChristianGalindo10/GameStore-FRONT/blob/master/Readme_assets/VideoFinal.gif)

## Instrucciones Angular
***
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.7.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
