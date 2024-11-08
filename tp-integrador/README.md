# MeWEB

Se trata de una aplicación en la que los usuarios podrán crear
páginas y obtener un QR que dirija a esas páginas. Aplica para hacer
QRs de cosas perdidas, de eventos, de páginas web, de redes sociales,
lo que sea. Incluso un QR para identificar a una mascota.

## Alcance y CU

1. Un usuario se puede registrar con Google, o email y contraseña
2. Un usuario se puede loggear con Google, o email y contraseña
3. Un usuario se puede desloggear
3. Un usuario puede crear una o muchas página
4. Un usuario puede obtener un QR de su página
5. Un usuario puede ver el listado de sus páginas
5. Un usuario puede descargar el QR de una página
6. Al crear una página, el usuario puede usar markdown, asignarle un
   título y una imagen. En la descripción iría el markdown.
7. Un usuario puede editar una página
8. Al crear una página, a esta se le deberá asignar un short url,
   para que el QR sea más amigable.
9. Un usuario puede eliminar una página

## Tecnologías
1. Next.js
2. shadcn/ui
3. MongoDB
3. NextAuth.js
4. TailwindCSS
5. Vercel
6. Cloudinary

## Tareas
- [x] Crear el proyecto
- [ ] Crear el layout
- [ ] Conectar NextAuth
- [ ] Hacer entidades y conectarse a MongoDB
- [ ] Crear el formulario de login
- [ ] Crear el formulario de registro
- [ ] Funcionalidad de login con Google
- [ ] Funcionalidad de short url
- [ ] Crear el formulario de creación y edición de página
- [ ] Crear el listado de páginas
- [ ] Crear la página de visualización de página

## Entidades
- User
  - email   
  - password
  - photo
- Page
  - title
  - shortUrl
  - user
  - image
  - markdown
  - isPublic
