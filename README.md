# Inventory Management - Amir

Este proyecto es una aplicación web  para la gestión de inventario (CRUD), diseñada para fines de tenerla en mi portfolio. Permite a los usuarios registrarse, iniciar sesión y administrar un inventario de productos a través de un panel de control interactivo. Fue desarrollada con un enfoque en la arquitectura moderna de Next.js, la eficiencia de la base de datos y una experiencia de usuario fluida.

## Demo en Vivo

El sitio está desplegado en Vercel. Puedes verlo en acción aquí:

[**https://inventory-management-lilac-nine.vercel.app/**](https://inventory-management-lilac-nine.vercel.app/)

---

## ✨ Tecnologías Utilizadas

La aplicación fue construida utilizando un stack moderno, modular y eficiente:

* **[Next.js](https://nextjs.org/)**: Framework de React para construir aplicaciones web rápidas con renderizado híbrido (Server y Client Components).
* **[Prisma](https://www.prisma.io/)**: ORM de última generación para TypeScript y Node.js que facilita la interacción con la base de datos.
* **[Neon](https://neon.tech/)**: Base de datos PostgreSQL serverless, optimizada para despliegues en plataformas como Vercel.
* **[Stack Auth](https://stack-auth.com/)**: Solución completa de autenticación de usuarios, integrada para manejar el registro, inicio de sesión y gestión de perfiles.
* **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS "utility-first" para un diseño rápido, moderno y responsivo.
* **[TanStack Query (React Query)](https://tanstack.com/query/latest)**: Para la gestión del estado asíncrono, caching y la sincronización de datos entre el cliente y el servidor.
* **[shadcn/ui](https://ui.shadcn.com/)**: Colección de componentes de UI reutilizables y accesibles construidos sobre Tailwind CSS.
* **[TypeScript](https://www.typescriptlang.org/)**: Para un desarrollo más robusto y con tipado estático.
* **[Vercel](https://vercel.com/)**: Plataforma para el despliegue y hosting del proyecto.

---

## 🛠️ Cómo Ejecutarlo en Local

Para explorar o modificar el proyecto en tu propio equipo, sigue estos sencillos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/amirhurtado/inventory-management.git](https://github.com/amirhurtado/inventory-management.git)
    ```

2.  **Navega al directorio del cliente:**
    ```bash
    cd inventory-management/client
    ```

3.  **Instala las dependencias:**
    Ejecuta el siguiente comando para instalar todos los paquetes necesarios.
    ```bash
    npm install
    ```

4.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del directorio `client` y añade las claves necesarias para la base de datos y la autenticación.
    ```env
    # Prisma/Neon Database URL
    DATABASE_URL="TU_URL_DE_CONEXION_DE_NEON"

    # Stack Auth Keys (Consíguelas en tu dashboard de Stack Auth)
    STACK_API_KEY="TU_API_KEY_DE_STACK_AUTH"
    STACK_PUBLIC_KEY="TU_PUBLIC_KEY_DE_STACK_AUTH"
    STACK_SECRET_SERVER_KEY="TU_PRIVATE_KEY_DE_STACK_AUTH"
    ```

5.  **Sincroniza la base de datos:**
    Aplica las migraciones de Prisma para configurar el esquema de tu base de datos.
    ```bash
    npx prisma db push
    ```

6.  **Inicia el servidor de desarrollo:**
    Una vez instaladas las dependencias y configurado el entorno, puedes iniciar el proyecto.
    ```bash
    npm run dev
    ```

¡Y listo! Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación funcionando.
