# MeWeb

## Descripción General del Proyecto

MeWeb es una plataforma diseñada para que los usuarios técnicos puedan crear páginas y obtener un sitio web estático. Esta herramienta es ideal para crear páginas de cosas perdidas, eventos, páginas web, redes sociales, entre otros. El objetivo principal del sitio es proporcionar una solución sencilla y eficiente para la generación de sitios web estáticos personalizados.

## Características del Sitio

El sitio ofrece una variedad de funcionalidades clave. Los usuarios pueden registrarse y autenticarse en la plataforma, lo que les permite acceder a un sistema de creación y edición de páginas utilizando markdown. Además, cada página creada puede generar un código QR, que los usuarios pueden descargar para su uso. El sitio también incluye un listado de páginas del usuario y la visualización de páginas públicas en un feed.

## Requerimientos Funcionales Detallados

### Requerimientos de Usuarios (Front-end)

La página de inicio muestra el logo y el eslogan de la empresa, junto con enlaces a las secciones más importantes del sitio. Los usuarios pueden registrarse proporcionando su correo y contraseña. Una vez registrados, pueden crear y editar páginas mediante un formulario que permite ingresar un título, una imagen y contenido en markdown. Cada página recibe automáticamente una URL corta y puede ser categorizada mediante etiquetas. Los usuarios también tienen la opción de previsualizar la página antes de guardarla.

El listado de páginas privadas permite a los usuarios ver todas las páginas que han creado, con opciones para filtrar, buscar, editar y eliminar páginas. Además, cada página puede generar un código QR que los usuarios pueden descargar. Las páginas públicas se pueden visualizar con su contenido en markdown y se puede acceder a ellas mediante las URLs cortas generadas.

## Arquitectura de la Aplicación

La aplicación está construida utilizando Next.js como framework principal, lo que permite una gestión eficiente de las páginas y rutas. Los componentes de la interfaz de usuario están desarrollados con React y estilizados con TailwindCSS para asegurar un diseño responsivo y moderno. La autenticación de usuarios se maneja mediante NextAuth.js, y se utilizan componentes de interfaz de usuario de shadcn/ui.

En el backend, las rutas API de Next.js se utilizan para manejar las solicitudes, mientras que NextAuth.js gestiona el registro, inicio de sesión y cierre de sesión de los usuarios. La base de datos utilizada es MongoDB, que almacena la información de los usuarios y las páginas. Para el almacenamiento y gestión de imágenes, se utiliza Cloudinary.

La aplicación está desplegada en Vercel, una plataforma que facilita el despliegue de aplicaciones Next.js, permitiendo una integración continua y un despliegue eficiente tanto del frontend como del backend.

La estructura de carpetas de la aplicación está organizada de manera que facilita el mantenimiento y la escalabilidad. La carpeta `app` contiene las páginas y componentes principales, mientras que las rutas API se encuentran en la carpeta `api`. La configuración y opciones de autenticación están en la carpeta `auth`, y las páginas públicas accesibles mediante URLs cortas se encuentran en la carpeta `p`. Los componentes reutilizables de la interfaz de usuario están en la carpeta `components`, las utilidades y funciones auxiliares en `utils`, y las definiciones de tipos TypeScript en `types`.

El flujo de datos en la aplicación está claramente definido. La autenticación de usuarios se gestiona en el frontend y se verifica en el backend. Los usuarios pueden crear, editar y eliminar páginas, cada una con una URL corta y un código QR. Las páginas se almacenan en MongoDB y las imágenes en Cloudinary. Las páginas públicas se pueden visualizar mediante URLs cortas, mientras que las páginas privadas se gestionan en el dashboard del usuario.

Esta arquitectura permite una aplicación escalable y mantenible, con una clara separación entre frontend y backend, utilizando tecnologías modernas para la autenticación, gestión de datos y despliegue.

## Desarrollo
El tiempo utilizado para el diseño e implementación de la aplicación fue el siguiente:
- Análisis y diseño: 2 horas
- Implementación de autenticación