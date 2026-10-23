export class ListNode<T> {
  private _next: ListNode<T> | null = null;
  private _value!: T;

  constructor(value: T) {
    this.value = value;
  }

  get next(): ListNode<T> | null {
    return this._next;
  }

  set next(node: ListNode<T> | null) {
    this._next = node;
  }

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
  }
}

export class LinkedList<T> {
  private _head: ListNode<T> | null = null;
  private _count: number;

  constructor() {
    this._count = 0;
  }

  add(value: T) {
    const node = new ListNode(value);

    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      for (let i = 0; i < this.count; i++) {
        if (current.next) {
          current = current.next;
        } else {
          current.next = node;
        }
      }
    }

    this.incrementCount();
  }

  iterateList(): T[] {
    const listItems: T[] = [];
    let current = this.head;

    for (let i = 0; i < this.count; i++) {
      listItems.push(current!.value);
      current = current!.next;
    }

    return listItems;
  }

  removeDuplicates() {
    let it = this.count;
    let current = this.head;
    let prev = this.head;
    let previouslySeen = new Map<T, ListNode<T>>();

    for (let i = 0; i < it; i++) {
      if (previouslySeen.has(current!.value)) {
        if (current!.next) {
          prev!.next = current!.next;
        } else {
          prev!.next = null;
        }

        this.decrementCount();
      } else {
        previouslySeen.set(current!.value, current!);
        prev = current;
      }

      current = current!.next;
    }
  }

  removeNode(node: ListNode<T>) {
    let current = this.head;
    let prev = this.head;

    for (let i = 0; i < this.count; i++) {
      if (current === node) {
        if (current === this.head) {
          this.head = current.next;
        } else {
          prev!.next = current.next;
        }

        this.decrementCount();
        break;
      }

      prev = current;
      current = current!.next;
    }
  }

  printList() {
    let check = this.head;
    let list = "";

    for (let i = 0; i < this.count; i++) {
      list += check!.value + " ";
      check = check!.next;
    }
    console.log(list);
  }

  set head(node: ListNode<T> | null) {
    this._head = node;
  }

  get head(): ListNode<T> | null {
    return this._head;
  }

  get count() {
    return this._count;
  }

  decrementCount() {
    return this._count--;
  }

  incrementCount() {
    return this._count++;
  }
}
