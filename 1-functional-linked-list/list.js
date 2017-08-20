'use strict';

// This will come in handy when you implement ListNode.prototype.id
const getSha1 = require('../getSha1');

function ListNode (value, next) {
  this.value = value
  this.next = next || null
  this.listLength = this.length()
}

ListNode.prototype.toString = function () {
  if (this.next) return String(this.value) + ' ' + this.next.toString()
  else return String(this.value)
}

ListNode.prototype.id = function () {
  return getSha1(this.toString())
}

ListNode.prototype.length = function () {
  if (this.listLength) { return this.listLength }
  while (this.next) {
    this.listLength = 1 + this.next.length()
    return this.listLength
  }
  this.listLength = 1
  return this.listLength
}

ListNode.prototype.prepend = function (value) {
  return new ListNode(value, this)
}

ListNode.prototype.prependList = function (listNode) {
  return listNode.next
    ? new ListNode(ListNode.value, this.prependList(listNode.next))
    : new ListNode(listNode.value, this)
}

ListNode.prototype.append = function (listNode) {
  if (!this.next) { return new ListNode(this.value, listNode) }
  else {
    return new ListNode(
      this.value,
      this.next.append(listNode)
    )
  }
}

ListNode.prototype.remove = function (id) {
  return this.id() === id
    ? this.next
    : new ListNode(this.value, this.next && this.next.remove(id))
}

ListNode.prototype.splitAt = function (id) {
  return this.id() === id
    ? null
    : new ListNode(this.value, this.next && this.next.splitAt(id))
}

ListNode.prototype.find = function (id) {
  return this.id() === id
    ? this
    : (this.next && this.next.find(id)) || null
}

ListNode.prototype.findWhere = function (predicate) {
  return predicate(this, this.next)
    ? this
    : this.next && this.next.findWhere(predicate) || null
}

ListNode.prototype.insertAt = function (id, listNode) {
  return this.id() === id
    ? listNode.append(this)
    : new ListNode(this.value, this.next && this.next.insertAt(id, listNode))
}

ListNode.prototype.intersection = function (listNode) {
  const found = listNode.find(this.id())
  return found ? found : this.next && this.next.intersection(listNode)
}

ListNode.prototype.forEach = function (fn) {
  fn(this, this.next)
  if (this.next) {
    this.next.forEach(fn)
  }
}

/*
 * ES2015 Class Version:
 */

// class ListNode {
//   constructor (value, next = null) {
//     this.value = value;
//     this.next = next;
//   }

//   toString () {
//     return !this.next ? '' + this.value : this.value + ' ' + this.next.toString();
//   }

//   id () {
//     return getSha1(this.toString());
//   }

//   length () {
//     return !this.next ? 1 : 1 + this.next.length();
//   }

//   prepend (value) {
//     return new ListNode(value, this);
//   }

//   append (ln) {
//     return !this.next ? new ListNode(this.value, ln) : new ListNode(this.value, this.next.append(ln));
//   }

//   remove (id) {
//     return this.id() === id ? this.next : new ListNode(this.value, this.next && this.next.remove(id));
//   }

//   splitAt (id) {
//     return this.id() === id ? null : new ListNode(this.value, this.next && this.next.splitAt(id));
//   }

//   find (id) {
//     return this.id() === id ? this : this.next ? this.next.find(id) : null;
//   }

//   insertAt (id, ln) {
//     return this.id() === id
//       ? ln.append(this)
//       : new ListNode(this.value, this.next ? this.next.insertAt(id, ln) : null);
//   }

//   intersection (ln) {
//     const found = ln.find(this.id());
//     return found ? found : this.next ? this.next.intersection(ln) : null;
//   }

// }

module.exports = ListNode;
