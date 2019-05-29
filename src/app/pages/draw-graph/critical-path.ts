/*
* Author: Erick Jassiel Blanco
*/
export class CriticalPath {
  nodes: any[] = [];
  start: any;
  end: any;
  edges: any[] = [];

  constructor(cy) {
    this.classifyElements(cy);
    this.getConnections();
    this.getStartAndEndNodes();
    this.processData();
  }

  classifyElements(graph) {
    for (let item of graph._private.elements) {
      const data = item._private.data;
      // There are two cases
      if (data.name) {
        // Case 1: Element is a node
        this.nodes.push({
          name: data.name, weight: data.weight
        });
      } else {
        // Case 2: Element is an edge
        this.edges.push({
          source: data.source, target: data.target
        })
      }
    };
  }

  private getConnections() {
    this.nodes.forEach(node => {
      node.successors = this.getSuccessors(node);
      node.predecessors = this.getPredecessors(node);
    })
  }

  private getPredecessors(node) {
    const tag = node.name;
    const predecessors = [];
    this.edges.forEach(item => {
      if (item.target === tag) {
        const source = this.findNodeByNameTag(item.source);
        predecessors.push(source);
      }
    })
    return predecessors;
  }

  private getSuccessors(node) {
    const tag = node.name;
    const successors = [];
    this.edges.forEach(item => {
      if (item.source === tag) {
        const target = this.findNodeByNameTag(item.target);
        successors.push(target);
      }
    })
    return successors;
  }

  private findNodeByNameTag(tag: string) {
    for (let node of this.nodes) {
      if (node.name === tag) return node;
    }
  }

  private getStartAndEndNodes() {
    this.start = {
      name: "start",
      weight: 0,
      successors: [],
      predecessors: []
    }
    this.end = {
      name: "end",
      weight: 0,
      successors: [],
      predecessors: []
    }
    this.nodes.forEach((node) => {
      // If the node is not succeeded by another node
      // then we connect it to the end node
      if (node.successors.length === 0) {
        node.successors.push(this.end);
        this.end.predecessors.push(node);
      }
      // If the node is not preceded by another node
      // then we connect it to the start node
      if (node.predecessors.length === 0) {
        node.predecessors.push(this.start);
        this.start.successors.push(node);
      }
    })
    this.nodes.push(this.start, this.end);
  }

  private processData() {
    this.calculateForward(this.end);
    this.calculateBackward(this.start);
  }

  private calculateForward(node): number {
    let max = 0;
    for (let i of node.predecessors) {
      const c = i.tp || this.calculateForward(i);
      max = max > c ? max : c;
    }
    node.ip = max;
    node.tp = node.ip + node.weight;
    // In the end node we need to manually complete the "cross"
    if (node.name === "end") {
      node.tl = node.il = max;
    }
    return node.tp;
  }

  private calculateBackward(node): number {
    let min = 1000000000;
    for (let i of node.successors) {
      const c = i.il || this.calculateBackward(i);
      min = min < c ? min : c;
    }
    node.tl = min;
    node.il = node.tl - node.weight;
    // We will need the slack time of each node later
    node.h = node.il - node.ip;
    return node.il;
  }

  public getCriticalPaths() {
    let paths: string[] = [];
    let route: any[] = [];
    const search = function(cp, node) {
      if (node.h !== 0) return;
      if (cp.isEndNode(node)) {
        paths.push(cp.routeToString(route));
      } else {
        for (let child of node.successors) {
          route.push(child);
          search(cp, child);
          route.pop();
        }
      }
    }

    search(this, this.start);
    return paths;
  }

  private isEndNode(node) {
    return node.successors.length === 1 && node.successors[0].name === "end";
  }

  private routeToString(route: any[]) {
    return route.map(item => {
      return item.name;
    }).join(" → ");
  }

  public getSlackTimes() {
    return this.nodes.filter(node => {
      return node.h > 0;
    }).map(node => {
      return `${node.name} → h: ${node.h}`;
    })
  }
}
