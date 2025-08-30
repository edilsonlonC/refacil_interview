# Proyecto de Entrevista - Refacil

Este repositorio contiene un backend API desarrollado con Node.js, Express y TypeScript. El proyecto sigue principios de Arquitectura Limpia para separar las preocupaciones y mantener un código desacoplado, escalable y fácil de mantener. Utiliza TypeORM para la gestión de la base de datos PostgreSQL y está completamente dockerizado para un despliegue y entorno de desarrollo consistentes.

## Tecnologías Principales

- **Node.js**: Entorno de ejecución para JavaScript.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Express**: Framework web para la creación de la API.
- **PostgreSQL**: Base de datos relacional.
- **TypeORM**: ORM para interactuar con la base de datos.
- **Docker & Docker Compose**: Para la contenerización de la aplicación y sus servicios.
- **Jest**: Framework para pruebas unitarias y de integración.
- **ESLint & Prettier**: Para el formateo y la calidad del código.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión especificada en `.nvmrc`)
- [NVM](https://github.com/nvm-sh/nvm) (Recomendado para gestionar la versión de Node.js)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)

## Guía de Inicio Rápido

### 1. Clonar el Repositorio

```bash
git clone git@github.com:edilsonlonC/refacil_interview.git
cd refacil_interview
```

### 2. Configurar Variables de Entorno

Copia el archivo de ejemplo `.env.example` y renómbralo a `.env`.

```bash
cp .env.example .env
```

Abre el archivo `.env` y añade las siguientes variables necesarias para la conexión a la base de datos y la configuración de la aplicación. Asegúrate de que coincidan con las credenciales de tu base de datos definidas en `docker-compose.yml`.

```env
# Aplicación
PORT=3000

# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=refacil
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Levantar la Base de Datos

Utiliza el Makefile para iniciar el contenedor de la base de datos con Docker.

```bash
make run-database
```

### 5. Ejecutar las Migraciones

Para crear la estructura de tablas en la base de datos, ejecuta el script de migración.

```bash
npm run migrate
```

### 6. Iniciar la Aplicación en Modo Desarrollo

Una vez que la base de datos esté corriendo y las dependencias instaladas, puedes iniciar el servidor de desarrollo.

```bash
npm run start:dev
```

La API estará disponible en `http://localhost:3000`.

## Scripts Disponibles

- `npm run start:dev`: Inicia el servidor en modo desarrollo con recarga automática.
- `npm test`: Ejecuta la suite de pruebas con Jest.
- `npm run lint`: Analiza el código en busca de errores de estilo.
- `npm run build`: Compila el código TypeScript a JavaScript.
- `npm run migrate`: Aplica las migraciones de la base de datos.
- `npm run revert:migration`: Revierte la última migración aplicada.

## Endpoints de la API

### Health Check

- **GET** `/health`
  - **Descripción**: Verifica el estado de salud de la aplicación.
  - **Respuesta Exitosa (200 OK)**:
    ```json
    {
      "status": "OK",
      "ok": true
    }
    ```

### Usuarios

- **POST** `/user`
  - **Descripción**: Crea un nuevo usuario.
  - **Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
    "password": "password123",
    }
    ```

- **GET** `/user/:id`
  - **Descripción**: Obtiene los detalles de un usuario por su ID.

### Transacciones

- **POST** `/transaction`
  - **Descripción**: Crea una nueva transacción (crédito o débito).
  - **Body**:
    ```json
    {
      "userId": "uuid-del-usuario",
      "type": "WITHDRAW", // o "DEPOSIT"
      "amount": 100.50
    }
    ```

- **GET** `/transaction/:userId`
  - **Descripción**: Obtiene el historial de transacciones para un usuario específico.

## Estructura del Proyecto

El proyecto sigue una Arquitectura Limpia con tres capas principales:

- `src/domain`: Contiene los modelos de negocio, interfaces (puertos) y errores de dominio. Es el núcleo de la aplicación y no depende de ninguna capa externa.
- `src/application`: Contiene los casos de uso que orquestan la lógica de negocio. Depende únicamente de la capa de dominio.
- `src/infrastructure`: Contiene las implementaciones concretas de los puertos definidos en el dominio, como los controladores de la API, los repositorios de base de datos (TypeORM), y otros servicios externos.
