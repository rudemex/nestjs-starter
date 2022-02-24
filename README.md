<div align="center">
    <img alt="nestjs-starter" width="250" height="auto" src="https://camo.githubusercontent.com/c704e8013883cc3a04c7657e656fe30be5b188145d759a6aaff441658c5ffae0/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f5f746578742e737667" />
    <h1>NestJS Starter</h1>
</div>

<p align="center">
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=Node&message=v14.15.4&labelColor=339933&color=757575&logoColor=FFFFFF&logo=Node.js" alt="Node.js"/>
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=Npm&message=v6.14.10&labelColor=CB3837&logoColor=FFFFFF&color=757575&logo=npm" alt="Npm"/>
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=NestJs&message=v8.2.6&labelColor=E0234E&logoColor=FFFFFF&color=757575&logo=Nestjs" alt="NestJs"/>
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

## Glosario

- [🥳 Demo](https://rudemex-nestjs-starter.herokuapp.com/api)
- [📝 Requerimientos básicos](#basic-requirements)
- [🛠️ Instalar dependencias](#install-dependencies)
- [⚙️ Configuración](#configurations)
- [💻 Scripts](#scripts)
- [📚 Swagger](#swagger-info)
- [🐳 Docker](#docker)
- [🧰 Toolkit](#toolkit)
- [📤 Commits](#commits)
- [🏷️ Versionado](#versioning)
- [📄 Changelog](./CHANGELOG.md)
- [📜 License MIT](license.md)

---

<a name="basic-requirements"></a>

## 📝 Requerimientos básicos

- Node.js v14.15.4 or higher ([Download](https://nodejs.org/es/download/))
- NPM v6.14.10 or higher
- NestJS v8.2.0 or higher ([Documentación](https://nestjs.com/))

<a name="install-dependencies"></a>

## 🛠️ Instalar dependencias

Cuando tenemos los requisitos básicos, clonamos el repositorio, vamos a la carpeta del proyecto e instalamos sus
dependencias.

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
CONTEXT=api
ORIGINS=http://localhost:3000,http://localhost:8080
ALLOWED_HEADERS=Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin,Cache-Control,Pragma
ALLOWED_METHODS=GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS
CORS_ENABLED=true
CORS_CREDENTIALS=false
IGNORE_ENV_FILE=false

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

`CONTEXT`: Es el contexto el que se puede acceder a la API del servidor, de esta manera no se exponen los endpoints en
la ruta principal de la aplicación. Se escribe sin el `/` (slash).

- Type: `String`
- Default: `api`

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

`IGNORE_ENV_FILE`: Habilita o deshabilita obtener las variables de entorno desde un archivo `.env`.

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

También cuenta con un validador de variables de entorno, que nos permite validar el tipo de dato y si es requerido o no
dicha variable.

Todos estos features los podemos encontrar en la carpeta **./src/config**, en dicha carpeta podemos encontrar el archivo
**environments.ts** que es un manejador de env files dependiendo el **NODE_ENV** que tenga nuestra aplicación.

<a name="scripts"></a>

## 💻 Scripts

Inicia la aplicación en modo desarrollo

```
npm run start:dev
```

Inicia los test con coverage

```
npm run test
```

Realiza el build de la aplicación

```
npm run build
```

Inicia la aplicación en modo productivo

```
npm run start
```

#### Otros scripts

Formatea el código

```
npm run format
```

Eslintea el código

```
npm run lint
```

<a name="swagger-info"></a>

## 📚 Swagger

El proyecto cuenta con un **Swagger** (OpenAPI 3.0.0) que tiene documentado los endpoints con sus
definiciones. [Demo Swagger](https://rudemex-nestjs-starter.herokuapp.com/docs/)

Para expandir la documentación, es importante aplicar los decoradores correspondientes a la
aplicación. [NestJS OpenApi](https://docs.nestjs.com/openapi/introduction)

Esta documentación puede ser activada o desactivada desde la configuración por medio las variables de entorno del
proyecto.

```sh
SWAGGER_PATH=docs
SWAGGER_ENABLED=true
```

#### URL

Acceso a la documentación y testeo de los endpoints: `http://localhost:8080/docs`

#### Scheme

```
<http|https>://<server_url><:port>/<swagger-path>
```

#### Exportar el swagger en JSON

Se puede exportar la documentación a un **JSON** agregando el sufijo **-json** al path
definido. [Demo Swagger JSON](https://rudemex-nestjs-starter.herokuapp.com/docs-json)

- Default: `http://localhost:8080/docs-json`
- Schema: `<http|https>://<server_url><:port>/<swagger-path>-json`

<a name="docker"></a>

## 🐳 Docker

El proyecto cuenta con un `dockerfile` y un `docker-compose.yml` de base, listo para utilizar y expandir sus capacidades.

### Docker Build

Schema: `docker build . -t <user-docker>/<app-name>`

### Docker Compose

Schema: `docker run -d -p 8080:8080 --env-file <.env> <user-docker>/<app-name>`

### Ejemplo

```
docker build -t nestjs-starter .
docker run -d -p 8080:8080 --env-file .env.prod nestjs-starter
```

<a name="toolkit"></a>

## 🧰 Toolkit

Los módulos de la siguiente lista, están pensados para ser consumidos para la arquitectura de este starter, o
arquitectura similar siguiendo los lineamientos de `schematics`.

| Package                                                                        | Descripción                                | Versión                                                                                                                               | Changelog                                                                           |
| ------------------------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`@tresdoce/nestjs-archetype`](https://github.com/tresdoce/nestjs-archetype)   | Módulo de información del proyecto         | [![version](https://img.shields.io/npm/v/@tresdoce/nestjs-archetype.svg)](https://www.npmjs.com/package/@tresdoce/nestjs-archetype)   | [changelog](https://github.com/tresdoce/nestjs-archetype/blob/master/CHANGELOG.md)  |
| [`@tresdoce/nestjs-commons`](https://github.com/tresdoce/nestjs-commons)       | Configuración centralizada                 | [![version](https://img.shields.io/npm/v/@tresdoce/nestjs-commons.svg)](https://www.npmjs.com/package/@tresdoce/nestjs-commons)       | [changelog](https://github.com/tresdoce/nestjs-commons/blob/master/CHANGELOG.md)    |
| [`@tresdoce/nestjs-health`](https://github.com/tresdoce/nestjs-health)         | Módulo de health check: liveness/readiness | [![version](https://img.shields.io/npm/v/@tresdoce/nestjs-health.svg)](https://www.npmjs.com/package/@tresdoce/nestjs-health)         | [changelog](https://github.com/tresdoce/nestjs-health/blob/master/CHANGELOG.md)     |
| [`@tresdoce/nestjs-database`](https://github.com/tresdoce/nestjs-database)     | Módulo conexión a base de datos Mongo      | [![version](https://img.shields.io/npm/v/@tresdoce/nestjs-database.svg)](https://www.npmjs.com/package/@tresdoce/nestjs-database)     | [changelog](https://github.com/tresdoce/nestjs-database/blob/master/CHANGELOG.md)   |
| [`@tresdoce/nestjs-httpclient`](https://github.com/tresdoce/nestjs-httpclient) | Módulo http con axios y axios-retry        | [![version](https://img.shields.io/npm/v/@tresdoce/nestjs-httpclient.svg)](https://www.npmjs.com/package/@tresdoce/nestjs-httpclient) | [changelog](https://github.com/tresdoce/nestjs-httpclient/blob/master/CHANGELOG.md) |

<a name="commits"></a>

## 📤 Commits

Para los mensajes de commits se toma como
referencia [`conventional commits`](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary).

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

- **type:** chore, docs, feat, fix, refactor (más comunes)
- **scope:** indica la página, componente, funcionalidad
- **description:** comienza en minúsculas y no debe superar los 72 caracteres.

### Ejemplo

`git commit -m "docs(readme): add documentantion to readme"`

<a name="versioning"></a>

## 🏷️ Versionado

Este starter cuenta con la posibilidad de auto versionarse por medio del workflow de GitHub Actions (`./github/workflows/release.yml`), ya que utiliza la dependencia [standard-version](https://github.com/conventional-changelog/standard-version) y los `conventional commits` del repo. Actualmente está configurado para incrementar la version en un archivo custom y no en el package.json.

Para poder realizar el versionado correcto en su proyecto, siga estos pasos.

- Asegurarse de que la version del `package.json` este en un valor inicial. Ej. `0.0.1` o `1.0.0`.
- Correr el siguiente script para borrar cualquier posible tag local o remoto: <br>`git tag -d $(git tag -l) && git push origin --delete $(git tag -l)`
- Borrar los archivos `CHANGELOG.md` y `version.txt`
- Editar el archivo `.versionrc` borrando la configuración del **bumpFile**, y editando él `owner` y el nombre del `repo`.

```json
// .versionrc
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
  "issuePrefixes": ["#"],
  "commitUrlFormat": "https://github.com/<owner>/<repo-name>/commit/{{hash}}",
  "compareUrlFormat": "https://github.com/<owner>/<repo-name>/compare/{{previousTag}}...{{currentTag}}",
  "issueUrlFormat": "https://github.com/<owner>/<repo-name>/issues/{{id}}",
  "skip": {
    "bump": false,
    "commit": false,
    "tag": false
  }
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
