# Práctica 6 - Controllers, Services y Modules

**Materia:** Tópico de Aplicaciones Web  
**Institución:** Instituto Tecnológico de Sonora (ITSON)  
**Programa:** Ingeniería en Software  

Este repositorio contiene la implementación de la Práctica 6, cuyo objetivo fue separar la API en Controller, Service y Module, y conectarla al dominio de inscripciones mediante inyección de dependencias con token.

---

## Respuestas al Cuestionario

### 1. ¿Qué pasaría si el módulo no quedara registrado en la raíz?
Si no se registra el módulo (por ejemplo, en `AppModule`), el contenedor de inyección de dependencias no sabrá que existe. Las rutas del controlador no se expondrán en la API y cualquier intento de acceder a esos endpoints devolverá un error 404, además de que otros módulos no podrán usar sus servicios.

### 2. ¿Por qué los métodos del repositorio devuelven promesas si los datos van a estar en memoria?
La interfaz establece un contrato abstracto pensado para el mundo real. Eventualmente esto se conectará a una base de datos real (cuyas consultas son inherentemente asíncronas). Usar Promesas desde ahora garantiza que el servicio no tendrá que reescribirse cuando se cambie la implementación en memoria por la base de datos definitiva.

### 3. ¿Qué error apareció al cambiar a la interfaz, y por qué la clase sí se había resuelto sola?
Aparece un error indicando que NestJS no puede resolver las dependencias del servicio (`Nest can't resolve dependencies...`). Esto ocurre porque las clases de TypeScript se conservan como objetos en el JavaScript compilado, permitiendo su resolución automática. Las interfaces, en cambio, desaparecen completamente en tiempo de ejecución al compilar, dejando al inyector sin una referencia.

### 4. ¿Por qué el servicio necesita un token para el repositorio, pero el controlador no lo necesita para el servicio?
El controlador inyecta el servicio utilizando una clase concreta, la cual sobrevive a la compilación y sirve como su propio identificador. El servicio inyecta el repositorio basándose en una interfaz; al no existir en tiempo de ejecución, requiere un token constante y explícito (como `@Inject(INSCRIPCION_REPOSITORY)`) para saber qué objeto debe instanciar.

### 5. ¿Cuál es la diferencia entre un 400 y un 409?
Un código `400 Bad Request` significa un error de sintaxis: el cliente envió datos incompletos o mal formados, por lo que el servidor rechaza la petición antes de analizar la lógica. Un `409 Conflict` significa que la petición está perfectamente estructurada, pero ejecutarla violaría las reglas de negocio actuales del sistema (como sobrepasar el cupo máximo de un horario o intentar una inscripción duplicada).

### 6. ¿Por qué cambió el código de estado de esa última petición?
Porque el estado de la aplicación mutó. Al cancelar una inscripción previa, se alteró la condición que provocaba el choque con las reglas de negocio (se liberó un espacio en el cupo o se eliminó la restricción del registro duplicado). Al ya no haber conflicto con la regla de negocio, la petición original ahora es válida y procesada exitosamente.