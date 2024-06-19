/** Paradigma de Prototipos 
 * Funcion constructora: 
 *  permite crear objetos a partir de su invocacion 
 *  dmite el uso de NEW para la creacion de instancias
 *  la palabra THIS devuelve la misma funcion que se ejecuta
 * 
*/
function Person({name, age}){
    this.name = name;
    this.age = age;
}
/** Metodos Publicos
 *  comumente se asignan al prototipo ya que son iguales para cada instancia a diferencia de los atributos.
 *  Al asignar la funcion al protoipo evitamos el consumo innecesario de memoria.
 *  utilizamos funciones clasicas para acceder al contexto, ya que una funcion lambda devuelve el objeto invocador.
 */
Person.prototype.hello = function(){
    return "Hi, mi name is " + this.name
}
Person.prototype.introduction = function () {
    return "Hello, mi name is " + this.name + " and I have " + this.age + " years old";
}

/** Programacion Orientada a Objetos 
 * Javascript convierte el codigo mostrado a continuacion 
 * a paradigma de prototipos
 * Es gracias EcmaScript que podemos utilizar esta sintaxis
*/
class Persona{
    constructor({name, age}){
        this.name = name;
        this.age = age;
    }
    hello(){
        return "Hi, mi name is " + this.name;
    }
    introduction(){
        return "Hello, mi name is " + this.name + " and I have " + this.age + "years old";
    }
}
// Instancias de Prototipo
const user = new Person({
    age: 33,
    name: "cristian",
})
console.log(user)