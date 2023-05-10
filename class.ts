class Puppy {
  id: number;
  breed: string;
  name: string;
  birthdate: string;

  constructor(id: number, breed: string, name: string, birthdate: string) {
    this.id = id;
    this.breed = breed;
    this.name = name;
    this.birthdate = birthdate;
  }

  bark() {
    console.log(`${this.name} says woof!`)
  }
}