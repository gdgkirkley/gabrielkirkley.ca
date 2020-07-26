export class ListNode {
  _next;
  _value;

  constructor(value) {
    this.value = value;
  }

  get next() {
    return this._next;
  }

  set next(node) {
    this._next = node;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}
