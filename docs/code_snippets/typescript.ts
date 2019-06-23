type Tuple<T> = [T, T];
type NumTuple = Tuple<number>;

function fail(message: string): never {
  throw new Error(message);
}

type GetNameFunction =
  (first: string, last: string, mid?: string) => string;

const getName: GetNameFunction = (first, last, mid?) => {
  if (!first || !last) {
    return fail('First and last name are required');
  }
  if (mid === undefined) {
    return `${first} ${last}`;
  }
  return `${first} ${mid[0]}. ${last}`;
}

interface IPerson {
  name: string;
  age: number;
  doesNameMatch(first: string, last: string): boolean;
}

function areTheSameAge(p1: IPerson, p2: IPerson): boolean {
  return p1.age === p2.age;
}

class Person implements IPerson {
  name: string;
  age: number;
  birthDate: Date;

  constructor(name: string, birthDate: Date) {
    this.name = name;
    this.birthDate = birthDate;
  
    const t: Date = new Date();
    this.age = t.getFullYear() - birthDate.getFullYear();

    const [tMonth, tDate]: NumTuple = [t.getMonth(), t.getDate()];
    const mDiff: number = tMonth - birthDate.getMonth();
    if (mDiff < 0 || (mDiff === 0 && tDate < birthDate.getDate())) {
      this.age--;
    }
  }

  doesNameMatch(first: string, last: string): boolean {
    const otherName = getName(first, last);
    return this.name === otherName;
  }
}
