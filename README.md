<p align="center">
    <img alt="nestjs-starter" width="100%" height="auto" src="https://socialify.git.ci/rudemex/nestjs-starter/image?language=1&pattern=Signal&theme=Light" />
</p>

<p align="center">
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=Node&message=v14.15.4&labelColor=339933&color=757575&logoColor=FFFFFF&logo=Node.js" alt="Node.js"/>
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=Npm&message=v6.14.10&labelColor=CB3837&logoColor=FFFFFF&color=757575&logo=npm" alt="Npm"/>
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=NestJs&message=v8.0.6&labelColor=E0234E&logoColor=FFFFFF&color=757575&logo=Nestjs" alt="NestJs"/>
    <img alt="GitHub Workflow Status" src="https://github.com/rudemex/nestjs-starter/actions/workflows/build.yml/badge.svg?branch=master">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/rudemex/nestjs-starter?logoColor=FFFFFF&logo=Codecov&labelColor=#F01F7A">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=rudemex_nestjs-starter&metric=alert_status" alt="sonarcloud">
    <img alt="GitHub license" src="https://img.shields.io/github/license/rudemex/nestjs-starter?style=flat">
    <br/> 
</p>

## Glosario

- [📝 Requerimientos básicos](#basic-requirements)
- [🛠️ Instalar dependencias](#install-dependencies)
- [⚙️ Configuración](#configurations)
- [💻 Scripts](#scripts)
- [📚 Swagger](#swagger-info)
- [📤 Commits](#commits)
- [📜 License MIT](license.md)

---

<a name="basic-requirements"></a>

## 📝 Requerimientos básicos

- Node.js v14.15.4 or higher ([Download](https://nodejs.org/es/download/))
- NPM v6.14.10 or higher

<a name="install-dependencies"></a>

## 🛠️ Instalar dependencias

Cuando tenemos los requisitos básicos, clonamos el repositorio, vamos a la carpeta del proyecto e instalamos sus
dependencias.

```
 npm install
```

<a name="configurations"></a>

## ⚙️ Configuración

Este starter viene con el archivo **.env.example** y **.env.test**, el cual contiene las configuraciones básicas para que funcione la aplicación.

Para el entorno de desarrollo local, es necesario contar con un archivo **.env** del cual se puede utilizar el archivo de ejemplo para generarlo.

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

`IGNORE_ENV_FILE`: Habilita o deshabilita el uso de variables de entorno por archivo para consumir las expuestas por el SO.

- Type: `Boolean`
- Default: `false`

#### Swagger

`SWAGGER_PATH`: Define la ruta de la documentación **Swagger**, se escribe sin el `/` (slash).

- Type: `String`
- Default: `docs`

`SWAGGER_ENABLED`: Habilitar o deshabilitar la documentación **Swagger** de los endpoints del servidor.

- Type: `Boolean`
- Default: `true`

#### Params, Services y Otros enviroments

A modo de ejemplo, se pueden cargar todas las variables de entorno que requieras, es importante seguir con el esquema de `key:value` para configurarlas.

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

También cuenta con un validador de variables de entorno, que nos permite validar el tipo de dato y si es requerido o no dicha variable.

Todos estos features los podemos encontrar en la carpeta **./src/config**.

<a name="scriptsr"></a>

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

El proyecto cuenta con un **Swagger** (OpenAPI 3.0.0) que tiene documentado los endpoints con sus definiciones.

Para expandir la documentación, es importante aplicar los decoradores correspondientes a la aplicación. [NestJS OpenApi](https://docs.nestjs.com/openapi/introduction)

Esta documentación puede ser activada o desactivada desde la configuración por medio las variables de entorno del proyecto.

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

Se puede exportar la documentación a un **JSON** agregando el sufijo **-json** al path definido.

- Default: `http://localhost:8080/docs-json`
- Schema: `<http|https>://<server_url><:port>/<swagger-path>-json`

<a name="commits"></a>

## 📤 Commits

Para los mensajes de commits se toma como referencia [`conventional commits`](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary).

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

- **type:** chore, docs, feat, fix, refactor (más comunes)
- **scope:** indica la página, componente, funcionalidad
- **description:** comienza en minúsculas y no debe superar los 72 caracteres.

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
