<div align="center">
    <img alt="nestjs-starter" width="250" height="auto" src="https://camo.githubusercontent.com/c704e8013883cc3a04c7657e656fe30be5b188145d759a6aaff441658c5ffae0/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f5f746578742e737667" />
    <h1>NestJS Starter</h1>
</div>

<p align="center">
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=Node&message=v14.15.4&labelColor=339933&color=757575&logoColor=FFFFFF&logo=Node.js" alt="Node.js"/>
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=Npm&message=v6.14.10&labelColor=CB3837&logoColor=FFFFFF&color=757575&logo=npm" alt="Npm"/>
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=NestJs&message=v9.2.1&labelColor=E0234E&logoColor=FFFFFF&color=757575&logo=Nestjs" alt="NestJs"/>
    <a href="https://github.com/rudemex/nestjs-starter/releases/latest">
        <img alt="Last Release" src="https://img.shields.io/github/v/tag/rudemex/nestjs-starter?label=release">
    </a>
    <a href="./license.md">
        <img alt="GitHub license" src="https://img.shields.io/github/license/rudemex/nestjs-starter?style=flat">
    </a>
    <br>
    <a href="https://github.com/rudemex/nestjs-starter/actions/workflows/master.yml" target="_blank">
        <img alt="GitHub Workflow Status" src="https://github.com/rudemex/nestjs-starter/actions/workflows/master.yml/badge.svg?branch=master">
    </a>
    <a href="https://app.codecov.io/gh/rudemex/nestjs-starter/" target="_blank">
        <img alt="Codecov" src="https://img.shields.io/codecov/c/github/rudemex/nestjs-starter?logoColor=FFFFFF&logo=Codecov&labelColor=#F01F7A">
    </a>
    <a href="https://sonarcloud.io/summary/new_code?id=rudemex_nestjs-starter" target="_blank">    
        <img src="https://sonarcloud.io/api/project_badges/measure?project=rudemex_nestjs-starter&metric=alert_status" alt="sonarcloud">
    </a>    
    <a href="https://snyk.io/test/github/rudemex/nestjs-starter" target="_blank">
        <img src="https://snyk.io/test/github/rudemex/nestjs-starter/badge.svg" alt="Snyk">
    </a>
    <br/> 
</p>

<p>NestJS es un framework progresivo de Node.js para la creación de aplicaciones eficientes, confiables y escalables del
lado del servidor, el cual está construido y es completamente compatible con TypeScript y JavaScript, combinando
elementos de la programación orientada a objetos, programación funcional y programación reactiva funcional.</p>
<br>
<div>
    <a href="https://railway.app/new/template/BOGqHd?referralCode=mfmi1X" target="_blank">
        <img src="https://railway.app/button.svg" alt="Deploy to Railway"/>
    </a>
</div>

## Glosario

- [🥳 Demo](https://nestjs-starter.up.railway.app/v1)
- [🤓 Objetivo](#objective)
- [📝 Requerimientos básicos](#basic-requirements)
- [🛠️ Instalar dependencias](#install-dependencies)
- [⚙️ Configuración](#configurations)
- [💻 Scripts](#scripts)
- [📚 Swagger](#swagger-info)
- [🐳 Docker](#docker)
- [🧰 Toolkit](https://github.com/tresdoce/tresdoce-nestjs-toolkit)
- [📤 Commits](#commits)
- [🏷️ Versionado](#versioning)
- [📄 Changelog](./CHANGELOG.md)
- [📜 License MIT](license.md)

---

<a name="objective"></a>

## 🤓 Objetivo

### Extensibilidad
Gracias a su arquitectura modular, es flexible y nos permite utilizar las otras bibliotecas existentes en nuestro proyecto.

### Arquitectura 
Tiene una arquitectura de proyecto que proporciona capacidad de prueba, escalabilidad y mantenimiento sin mucho esfuerzo.

### Versatilidad
Proporciona un ecosistema adaptable, el cual está desarrollado para crear todo tipo de aplicaciones del lado del servidor.

### Progresividad
Hace uso de las últimas funciones de JavaScript e implementa soluciones maduras y patrones de diseño en el desarrollo de software.

### Transaccionalidad
Orquestación de servicios. El BFF es responsable de orquestar la llamada a los distintos servicios y manejarlos transaccionalmente de manera transparente para el cliente.

### Performance
Reduce envío de datos. Las API's del BFF se diseñó tomando como base los requerimientos de las pantallas y solo se expondrán los datos que requieran las mismas. Sesión de usuario/caché. Puede manejar caché de sesión para la experiencia del frontend.

### Seguridad
Reduce exposición de datos sensibles. El BFF contiene API's que filtran estos datos y solo se exponen los datos necesarios. Gestión de tokens. El BFF es quien se encarga del almacenamiento y gestiona la renovación del access-token.


<a name="basic-requirements"></a>

## 📝 Requerimientos básicos

- Node.js v14.15.4 or higher ([Download](https://nodejs.org/es/download/))
- NPM v6.14.10 or higher
- NestJS v9.2.1 or higher ([Documentación](https://nestjs.com/))

<a name="install-dependencies"></a>

## 🛠️ Instalar dependencias

Cuando tenemos los requisitos básicos, clonamos el repositorio, vamos a la carpeta del proyecto e instalamos sus
dependencias.

```
yarn install
```

```
npm install
```

<a name="configurations"></a>

## ⚙️ Configuración

Este starter viene con el archivo **.env.example** y **.env.test**, el cual contiene las configuraciones básicas para
que funcione la aplicación.

Para el entorno de desarrollo local, es necesario contar con un archivo **.env** del cual se puede utilizar el archivo
de ejemplo para generarlo.

```sh
# SERVER
PORT=8080
API_PREFIX=TD_MY_API
CONTEXT=v1
ORIGINS=http://localhost:3000,http://localhost:8080
ALLOWED_HEADERS=Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin,Cache-Control,Pragma
ALLOWED_METHODS=GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS
CORS_ENABLED=true
CORS_CREDENTIALS=false

# SWAGGER ENVIRONMENTS
SWAGGER_PATH=docs
SWAGGER_ENABLED=true

# PARAMS
TEST_KEY="testKeyEnv-dev"

# SERVICES
RICK_AND_MORTY_API_URL=https://rickandmortyapi.com/api
```

<details>
<summary>💬 Para ver en detalle todas las propiedades de la configuración, hace click acá.</summary>

#### Server

`PORT`: Es el puerto por el cual va a correr el servidor.

- Type: `Number`
- Default: `8080`

`API_PREFIX`: Es el prefijo que hace referencia a la api, y alimenta otros módulos, como es el de los filter exceptions.

- Type: `String`
- Default: `TD_MY_API`

`CONTEXT`: Es el contexto el que se puede acceder a la API del servidor, de esta manera no se exponen los endpoints en
la ruta principal de la aplicación. Se escribe sin el `/` (slash).

- Type: `String`
- Default: `v1`

`ORIGINS`: Es una whitelist para que la aplicación sólo pueda ser consumida por urls confiables y evitar cualquier tipo
de solicitudes no deseadas y maliciosas. Debes escribir las urls separadas por una coma.

- Type: `String`
- Default: `http://localhost:3000,http://localhost:8080`

`ALLOWED_HEADERS`: Parámetros que va a recibir por el header en los request.

- Type: `String`
- Default: `Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin,Cache-Control,Pragma`

`ALLOWED_METHODS`: Métodos http disponibles para el cors

- Type: `String`
- Default: `GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS`

`CORS_ENABLED`: Habilita o deshabilita el uso de CORS en el servidor.

- Type: `Boolean`
- Default: `false`

`CORS_CREDENTIALS`: Habilita o deshabilita el uso de las credenciales en las peticiones CORS en el servidor.

- Type: `Boolean`
- Default: `false`

#### Swagger

`SWAGGER_PATH`: Define la ruta de la documentación **Swagger**, se escribe sin el `/` (slash).

- Type: `String`
- Default: `docs`

`SWAGGER_ENABLED`: Habilitar o deshabilitar la documentación **Swagger** de los endpoints del servidor.

- Type: `Boolean`
- Default: `true`

#### Params, Services y Otros environments

A modo de ejemplo, se pueden cargar todas las variables de entorno que requieras, es importante seguir con el esquema
de `key:value` para configurarlas.

```
# PARAMS
TEST_KEY="testKeyEnv-dev"

# SERVICES
RICK_AND_MORTY_API_URL=https://rickandmortyapi.com/api
```

</details>

Este proyecto utiliza el módulo `@nestjs/config`, el cual centraliza todas las variables de entorno en un solo lugar y
te permite consumirlas como **typing** para evitar errores de typo, como asi también evitar usar el **process.env** en
todo el proyecto, lo que te permite darle soporte más fácil si se requiere cambiar el **KEY** de la variable de entorno.

También cuenta con un validador de variables de entorno, que nos permite validar el tipo de dato, si es requerido o no
dicha variable, y muchas validaciones más.

Todos estos features los podemos encontrar en la carpeta **./src/config**, en dicha carpeta podemos encontrar el archivo
**environments.ts** que es un manejador de env files dependiendo el **NODE_ENV** que tenga nuestra aplicación.

<a name="scripts"></a>

## 💻 Scripts

Inicia la aplicación en modo desarrollo

```
yarn start:dev
```
```
npm run start:dev
```

Inicia los test con coverage

```
yarn test
```
```
npm run test
```

Realiza el build de la aplicación

```
yarn build
```
```
npm run build
```

Inicia la aplicación en modo productivo

```
yarn start
```
```
npm run start
```

#### Otros scripts

Formatea el código

```
yarn format
```
```
npm run format
```

Eslintea el código

```
yarn lint
```
```
npm run lint
```

<a name="swagger-info"></a>

## 📚 Swagger

El proyecto cuenta con un **Swagger** (OpenAPI 3.0.0) que tiene documentado los endpoints con sus
definiciones. [Demo Swagger](https://nestjs-starter.up.railway.app/v1/docs/)

Para expandir la documentación, es importante aplicar los decoradores correspondientes a la
aplicación. [NestJS OpenApi](https://docs.nestjs.com/openapi/introduction)

Esta documentación puede ser activada o desactivada desde la configuración por medio las variables de entorno del
proyecto.

```sh
SWAGGER_PATH=docs
SWAGGER_ENABLED=true
```

#### URL

Acceso a la documentación y testeo de los endpoints: `http://localhost:8080/v1/docs`

#### Scheme

```
<http|https>://<server_url><:port>/<app-context>/<swagger-path>
```

#### Exportar el swagger en JSON

Se puede exportar la documentación a un **JSON** agregando el sufijo **-json** al path
definido. [Demo Swagger JSON](https://nestjs-starter.up.railway.app/v1/docs-json)

- Default: `http://localhost:8080/v1/docs-json`
- Schema: `<http|https>://<server_url><:port>/<app-context>/<swagger-path>-json`

<a name="docker"></a>

## 🐳 Docker

El proyecto cuenta con un `dockerfile` y un `docker-compose.yml` de base, listo para utilizar y expandir sus capacidades.

### Docker Build

Schema: `docker build . -t <user-docker>/<app-name>`

Schema: `docker run -d -p 8080:8080 --name <container-name> --env-file <.env> <user-docker>/<app-name>`

### Ejemplo

```
docker build -t nestjs-starter .
```
```
docker run -d -p 8080:8080 --name nestjs-starter-app --env-file .env.prod nestjs-starter
```

<a name="commits"></a>

## 📤 Commits

Para los mensajes de commits se toma como
referencia [`conventional commits`](https://www.conventionalcommits.org/en/v1.0.0/#summary).

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

- **type:** chore, docs, feat, fix, refactor (más comunes)
- **scope:** indica la página, componente, funcionalidad
- **description:** comienza en minúsculas y no debe superar los 72 caracteres.

### Ejemplo

```
git commit -m "docs(readme): add documentantion to readme"
```

<a name="versioning"></a>

## 🏷️ Versionado

Este starter cuenta con la posibilidad de auto versionarse por medio del workflow de GitHub Actions (`./github/workflows/release.yml`), 
ya que utiliza la dependencia [standard-version](https://github.com/conventional-changelog/standard-version) y los 
`conventional commits` del repo. Actualmente, está configurado para incrementar la version en un archivo custom y no en el package.json.

Para poder realizar el versionado correcto en su proyecto, siga estos pasos.

- Asegurarse de que la version del `package.json` este en un valor inicial y los datos de la aplicación editados. Ej. `1.0.0`.
- Correr el siguiente script para borrar cualquier posible tag local o remoto: <br>`git tag -d $(git tag -l) && git push origin --delete $(git tag -l)`
- Borrar los archivos `CHANGELOG.md` y `version.txt`

```json
//__.versionrc.js
{
  "header": "<div align=\"center\"><h1>📝 Changelog</h1><p>All changes of this project will be documented in this file.</p></div>\n\n---\n",
  "path": "./",
  "releaseCommitMessageFormat": "ci(release): bumped version to {{currentTag}}",
  "types": [
    { "type": "feat", "section": "✨ Features", "hidden": false },
    { "type": "fix", "section": "\uD83D\uDC1B Bug Fixes", "hidden": false },
    { "type": "chore", "section": "👨‍💻 Chores", "hidden": false },
    { "type": "docs", "section": "\uD83D\uDCDD Docs", "hidden": false },
    { "type": "refactor", "section": "♻️Refactors", "hidden": false },
    { "type": "test", "section": "🧪 Tests", "hidden": true },
    { "type": "build", "section": "🛠 Build", "hidden": true },
    { "type": "perf", "hidden": true },
    { "type": "style", "hidden": true },
    { "type": "ci", "hidden": true },
    { "type": "revert", "hidden": true }
  ],
  "issuePrefixes": ["#"]
}
```

## 📄 Changelog

All notable changes to this project will be documented in [Changelog](./CHANGELOG.md) file.

---

<div align="center">
    <a href="mailto:mdelgado@tresdoce.com.ar" target="_blank" alt="Send an email">
        <img src="./.readme-static/logo-mex-red.svg" width="120" alt="Mex" />
    </a><br/>
    <!--<a href="mailto:mdelgado@tresdoce.com.ar" target="_blank" alt="Send an email">
        <img src="https://img.shields.io/static/v1.svg?style=flat-square&label=&message=Sr.%20Fullstack%20Developer&labelColor=1A1A1A&color=999999&logo=hackaday" alt="Mex Delgado" />
    </a><br/><br/>-->
    <p>Made with ❤</p>
</div>
