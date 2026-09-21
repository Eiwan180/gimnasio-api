# Práctica 6 - Controllers, Services y Modules

**Materia:** Tópico de Aplicaciones Web  
**Institución:** Instituto Tecnológico de Sonora (ITSON)  
**Programa:** Ingeniería en Software  

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

## Práctica 7 - Módulo Miembros

### 1. ¿Por qué la interfaz `MiembroRepository` no menciona Express, NestJS ni memoria?
Porque pertenece a la capa de **Dominio**. Siguiendo los principios de la Arquitectura Limpia, el dominio contiene únicamente los contratos y entidades del negocio, por lo que debe mantenerse totalmente agnóstico e independiente de frameworks web y de los detalles de persistencia.

### 2. ¿Qué palabra de la clase `MiembroMemoriaRepository` promete cumplir la interfaz del paso anterior?
La palabra clave **`implements`**. En TypeScript, `implements` obliga a la clase a cumplir con la estructura y los contratos definidos por la interfaz `MiembroRepository`.

### 3. ¿Por qué el Service no sabe qué es una petición HTTP?
Porque la responsabilidad del **Service** es la lógica de negocio, no la comunicación web. El **Controller** es la única capa encargada de recibir las peticiones HTTP, validar los datos entrantes y estructurar la respuesta, manteniendo el servicio desacoplado y reutilizable en otros entornos.

### 4. ¿Por qué el Service se inyecta sin token en el Controller, y el repositorio sí necesita uno?
Porque el Service es una **clase** (`MiembrosService`), la cual conserva su tipo en tiempo de ejecución para que NestJS la identifique directamente. Por el contrario, el repositorio es una **interfaz** (`MiembroRepository`), y como las interfaces desaparecen al compilar de TypeScript a JavaScript, NestJS requiere un **Token de Inyección** (como `'MIEMBRO_REPOSITORY'`) para asociarle la implementación concretas.

### 5. ¿Qué prueba, en los hechos, que agregar Miembros no rompió nada de Inscripciones?
Se prueba al ejecutar de nuevo las peticiones HTTP del módulo de **Inscripciones** y confirmar que siguen respondiendo correctamente con los mismos datos y códigos de estado de la Práctica 6. Esto demuestra la efectividad de la arquitectura modular de NestJS al aislar las responsabilidades de cada módulo.

## Asignación 1 - Módulo Horarios

### 1. ¿Por qué el Service se inyecta sin token en el Controller, y el repositorio sí necesita uno?
El **Service** se inyecta directamente por tipo de clase (`HorariosService`), ya que en JavaScript las clases continúan existiendo como funciones constructoras en tiempo de ejecución, permitiendo a NestJS identificarlas como su propio token. 

Por el contrario, el **repositorio** está definido como una interfaz (`HorariosRepository`). Dado que TypeScript elimina las interfaces al compilar a JavaScript, NestJS pierde esa referencia en ejecución y requiere obligatoriamente un **Token de Inyección** (como `'HORARIO_REPOSITORY'`) para saber qué clase concreta instanciar en su lugar.

### 2. Si mandas un `claseId` que no es número, ¿qué código de estado esperarías, y por qué este Controller no lo detecta?
El código de estado esperado para un tipo de dato inválido en la petición es **`400 Bad Request`**. 

El Controller no lo detecta automáticamente porque las interfaces de TypeScript (como `CrearHorarioDto`) solo ofrecen tipado estático durante el desarrollo y desaparecen al compilar. En tiempo de ejecución, el cuerpo del JSON se procesa como JavaScript puro; por lo tanto, a menos que se implementen manualmente validaciones en el controlador o se configuren pipes de validación en NestJS (como `ValidationPipe` con `class-validator`), el framework deja pasar los datos sin validar sus tipos de entrada.