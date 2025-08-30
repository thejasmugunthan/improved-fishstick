export class PriorityQueue<T> {
  private items: { item: T; priority: number }[] = [];

  enqueue(item: T, priority: number): void {
    const index = this.items.findIndex(i => i.priority > priority);
    if (index === -1) {
      this.items.push({ item, priority });
    } else {
      this.items.splice(index, 0, { item, priority });
    }
  }

  getSorted(): T[] {
    return this.items.map(i => i.item);
  }
}
