# 01_learn_angular

Proyecto inicial para aprender Angular leyendo los archivos principales.

Esta app fue creada con Angular CLI y usa Angular 20, componentes standalone,
routing y configuracion para SSR.

## Como correr el proyecto

Instala dependencias si todavia no existen:

```bash
npm install
```

Levanta el servidor de desarrollo:

```bash
npm start
```

Despues abre:

```text
http://localhost:4200
```

## Archivos principales

### `package.json`

Define el nombre del proyecto, los comandos disponibles y las dependencias.

Comandos importantes:

- `npm start`: inicia Angular en modo desarrollo.
- `npm run build`: compila la aplicacion.
- `npm test`: ejecuta pruebas unitarias.

Dependencias importantes:

- `@angular/core`: base del framework.
- `@angular/router`: sistema de rutas.
- `@angular/forms`: herramientas para formularios.
- `@angular/ssr`: soporte para server-side rendering.
- `typescript`: lenguaje usado por Angular.

### `angular.json`

Es la configuracion principal del workspace de Angular.

Aqui Angular sabe:

- Cual es el archivo de entrada de la app: `src/main.ts`.
- Donde estan los estilos globales: `src/styles.css`.
- Donde estan los assets publicos: `public/`.
- Como construir, servir y probar el proyecto.

### `tsconfig.json`

Configura TypeScript para todo el proyecto.

Este archivo controla reglas como:

- Nivel de JavaScript generado.
- Modo estricto de TypeScript.
- Validaciones fuertes para plantillas de Angular.

### `src/main.ts`

Es el punto de entrada del navegador.

Angular arranca la aplicacion con:

```ts
bootstrapApplication(App, appConfig);
```

Eso significa: "crea la aplicacion usando el componente raiz `App` y la
configuracion `appConfig`".

### `src/app/app.ts`

Es el componente raiz de la aplicacion.

En Angular, un componente normalmente tiene:

- Una clase TypeScript.
- Un template HTML.
- Un archivo CSS.
- Un decorador `@Component`.

Este archivo conecta:

- `templateUrl: './app.html'`
- `styleUrl: './app.css'`
- `imports: [RouterLink, RouterLinkActive, RouterOutlet]`

`RouterOutlet` permite mostrar la pagina que corresponda segun la ruta actual.
`RouterLink` y `RouterLinkActive` permiten crear el menu principal de navegacion.

Tambien contiene el `signal` `menuItems`, que guarda las opciones del menu:

```ts
protected readonly menuItems = signal<MenuItem[]>([
  { label: 'Inicio', path: '/', exact: true },
  { label: 'ToDo CRUD', path: '/todo', exact: false },
  { label: 'Contador', path: '/counter', exact: false }
]);
```

Para agregar una opcion nueva al menu, agrega otro objeto a ese arreglo.

### `src/app/app.html`

Es el template del componente raiz.

Actualmente contiene:

```html
<nav>
  @for (item of menuItems(); track item.path) {
    <a [routerLink]="item.path" routerLinkActive="active">
      {{ item.label }}
    </a>
  }
</nav>

<router-outlet />
```

El menu se genera dinamicamente leyendo `menuItems()`. El `router-outlet` es el
espacio donde Angular renderiza las paginas definidas en `app.routes.ts`.

### `src/app/app.css`

Estilos especificos del componente raiz `App`.

Usalo cuando quieras cambiar solo el layout o apariencia del componente
principal, sin afectar toda la aplicacion.

### `src/app/app.config.ts`

Contiene la configuracion global de la aplicacion.

Aqui se registran providers importantes como:

- `provideRouter(routes)`: activa el sistema de rutas.
- `provideZonelessChangeDetection()`: configura deteccion de cambios sin Zone.js.
- `provideClientHydration(...)`: ayuda cuando la app usa SSR.

### `src/app/app.routes.ts`

Define las rutas de la aplicacion.

Ejemplo:

```ts
export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'todo',
    component: TodoPageComponent
  },
  {
    path: 'counter',
    component: CounterPageComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
```

Lectura:

- `/` muestra `HomePageComponent`.
- `/todo` muestra `TodoPageComponent`.
- `/counter` muestra `CounterPageComponent`.
- `**` captura cualquier ruta que no exista y muestra `NotFoundComponent`.

### `src/app/pages/home/`

Carpeta de la pagina inicial.

Archivos:

- `home-page.component.ts`: define el componente de inicio.
- `home-page.component.html`: muestra enlaces y temas de aprendizaje.
- `home-page.component.css`: estilos de la pagina inicial.

Esta pagina es buena para aprender:

- Navegacion con `routerLink`.
- Como separar una pantalla en su propia carpeta.
- Como una ruta apunta a un componente.

### `src/app/pages/todo/`

Carpeta de la pagina ToDo CRUD.

Archivos:

- `todo-page.component.ts`: logica, signals, CRUD y localStorage.
- `todo-page.component.html`: formulario, filtros y lista de tareas.
- `todo-page.component.css`: estilos de la pagina ToDo.

Esta pagina es buena para aprender:

- `signal`: estado reactivo editable.
- `computed`: datos derivados como tareas pendientes y completadas.
- `@if` y `@for`: control flow moderno en templates Angular.
- Eventos: `(submit)`, `(input)`, `(click)`, `(change)`.
- CRUD:
  - Create: `createTodo()`.
  - Read: `visibleTodos()`.
  - Update: `toggleTodo()` y `saveEdit()`.
  - Delete: `deleteTodo()` y `deleteCompleted()`.
- Persistencia en el navegador con `localStorage`.

### `src/app/pages/counter/`

Carpeta de la pagina del contador.

Archivos:

- `counter-page.component.ts`: logica del contador.
- `counter-page.component.html`: vista que ve el usuario.
- `counter-page.component.css`: estilos de esa pagina.

Esta pagina es buena para aprender:

- Interpolacion: `{{ count }}`
- Eventos: `(click)="increment()"`
- Propiedades de clase: `count`
- Metodos del componente: `increment`, `decrement`, `reset`

### `src/app/pages/not-found/`

Carpeta de la pagina 404.

Archivos:

- `not-found.component.ts`: logica para navegar al inicio.
- `not-found.component.html`: mensaje de pagina no encontrada.
- `not-found.component.css`: estilos de la pagina 404.

Esta pagina es buena para aprender:

- Inyeccion de dependencias con `Router`.
- Navegacion desde codigo con `router.navigate(...)`.
- Manejo de rutas desconocidas.

### `src/styles.css`

Estilos globales de toda la aplicacion.

Usalo para reglas base como:

- Fuente principal.
- Reset de margenes.
- `box-sizing`.
- Variables CSS globales.

No conviene poner aqui estilos de una pagina especifica; para eso usa el CSS
del componente correspondiente.

### `src/index.html`

HTML base que carga Angular.

Normalmente no se edita mucho. Lo mas importante es:

```html
<app-root></app-root>
```

Ese tag coincide con el selector del componente raiz definido en `app.ts`.

### Archivos de SSR

Estos archivos existen porque el proyecto tiene soporte para server-side
rendering:

- `src/main.server.ts`
- `src/server.ts`
- `src/app/app.config.server.ts`
- `src/app/app.routes.server.ts`

SSR permite renderizar la app desde el servidor antes de que el navegador tome
control. Si estas empezando con Angular, primero entiende `main.ts`, `app.ts`,
`app.html`, `app.routes.ts` y las paginas dentro de `src/app/pages/`.

### `public/`

Carpeta para archivos estaticos publicos.

Ejemplo actual:

- `public/favicon.ico`

Aqui puedes poner imagenes, iconos u otros archivos que se deban servir tal cual.

## Orden recomendado para estudiar

1. `package.json`
2. `angular.json`
3. `src/main.ts`
4. `src/app/app.config.ts`
5. `src/app/app.ts`
6. `src/app/app.html`
7. `src/app/app.routes.ts`
8. `src/app/pages/home/home-page.component.html`
9. `src/app/pages/todo/todo-page.component.ts`
10. `src/app/pages/todo/todo-page.component.html`
11. `src/app/pages/counter/counter-page.component.ts`
12. `src/app/pages/counter/counter-page.component.html`
13. `src/app/pages/not-found/not-found.component.ts`
14. `src/styles.css`
15. Archivos SSR, cuando ya entiendas lo anterior

## Ideas para practicar

1. Agrega una ruta `/home`.
2. Cambia el contador para que no baje de cero.
3. Crea una pagina nueva con `ng generate component pages/about`.
4. Agrega un enlace desde `app.html` hacia `/counter`.
5. Crea una propiedad en un componente y muestrala con `{{ }}`.
6. En el ToDo, agrega una prioridad: baja, media o alta.
7. Cambia la persistencia de `localStorage` a IndexedDB.
