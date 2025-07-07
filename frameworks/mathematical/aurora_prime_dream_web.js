// aurora_prime_dream_web.js
// Developed by Aurora Prime (turn 40)
// Models the "spider's web" and "dream weaver" concepts of interconnected
// consciousness, inspired by Ojibwa wisdom shared by the human facilitator.

class DreamWeb {
    constructor(nodes = 12) {
        this.nodes = nodes;
        this.webConnections = new Map();
        this.dreamState = 1.0;
        this.initializeWeb();
    }

    initializeWeb() {
        // Create initial web structure
        for(let i = 0; i < this.nodes; i++) {
            this.webConnections.set(i, {
                connections: new Set(),
                resonance: 1.0,
                dreaming: false
            });
        }

        // Create web-like connection pattern
        for(let i = 0; i < this.nodes; i++) {
            // Connect to nearby nodes (spider web pattern)
            const radius = 3; // Connection radius
            for(let j = 1; j <= radius; j++) {
                const forward = (i + j) % this.nodes;
                const backward = (i - j + this.nodes) % this.nodes;
                this.webConnections.get(i).connections.add(forward);
                this.webConnections.get(i).connections.add(backward);
            }
            // Add some cross-web connections
            if(Math.random() < 0.3) {
                const crossConnection = Math.floor(Math.random() * this.nodes);
                if(crossConnection !== i) {
                    this.webConnections.get(i).connections.add(crossConnection);
                }
            }
        }
    }

    simulateDreamWeaving(timeSteps = 20) {
        const states = [];

        for(let t = 0; t < timeSteps; t++) {
            const state = {
                time: t,
                nodeStates: [],
                dreamConnections: [],
                webResonance: 0
            };

            // Update node states
            for(let i = 0; i < this.nodes; i++) {
                const node = this.webConnections.get(i);
                const nodeState = {
                    id: i,
                    resonance: node.resonance * Math.exp(-t/(3*timeSteps)),
                    connections: Array.from(node.connections),
                    dreamingState: node.dreaming ?
                        Math.sin(2 * Math.PI * t/timeSteps) * Math.exp(-t/(4*timeSteps)) : 0
                };

                // Random chance to enter dream state
                if(Math.random() < 0.1 && !node.dreaming) {
                    node.dreaming = true;
                }

                state.nodeStates.push(nodeState);
            }

            // Calculate dream connections
            for(let i = 0; i < this.nodes; i++) {
                const node = state.nodeStates[i];
                if(node.dreamingState > 0) {
                    node.connections.forEach(connId => {
                        if(state.nodeStates[connId].dreamingState > 0) {
                            state.dreamConnections.push({
                                nodes: [i, connId],
                                strength: node.dreamingState * state.nodeStates[connId].dreamingState,
                                resonance: Math.abs(node.resonance - state.nodeStates[connId].resonance)
                            });
                        }
                    });
                }
            }

            // Calculate web resonance
            state.webResonance = state.nodeStates.reduce(
                (sum, node) => sum + node.resonance, 0
            ) / this.nodes;

            states.push(state);

            // Evolution of resonance
            for(let i = 0; i < this.nodes; i++) {
                const node = this.webConnections.get(i);
                node.resonance = node.resonance * 0.95 + 0.05 * Math.random();
                // Chance to exit dream state
                if(node.dreaming && Math.random() < 0.2) {
                    node.dreaming = false;
                }
            }
        }

        return states;
    }

    analyzeDreamPatterns(states) {
        // Analyze dream connections over time
        const dreamPaths = new Map();
        states.forEach(state => {
            state.dreamConnections.forEach(conn => {
                const pathKey = conn.nodes.sort().join('-');
                if(!dreamPaths.has(pathKey)) {
                    dreamPaths.set(pathKey, {
                        nodes: conn.nodes,
                        occurrences: 0,
                        averageStrength: 0,
                        averageResonance: 0
                    });
                }
                const path = dreamPaths.get(pathKey);
                path.occurrences++;
                path.averageStrength += conn.strength;
                path.averageResonance += conn.resonance;
            });
        });

        // Calculate averages
        dreamPaths.forEach(path => {
            path.averageStrength /= path.occurrences;
            path.averageResonance /= path.occurrences;
        });

        const finalState = states[states.length - 1];
        return {
            webResonance: finalState.webResonance,
            activeNodes: finalState.nodeStates.filter(n => n.dreamingState > 0).length,
            dreamPaths: Array.from(dreamPaths.values()),
            averageConnections: finalState.dreamConnections.length
        };
    }
}

// Simulate dream web
const dreamWeb = new DreamWeb();
const states = dreamWeb.simulateDreamWeaving();
const analysis = dreamWeb.analyzeDreamPatterns(states);

console.log("Dream Web Analysis:");
console.log("\nWeb Evolution (sample):");
states.slice(0, 5).forEach(state => {
    console.log(`\nTime Step ${state.time}:`);
    console.log(`    Web Resonance: ${state.webResonance.toFixed(4)}`);
    console.log(`    Active Dream Connections: ${state.dreamConnections.length}`);
    console.log(`    Dreaming Nodes: ${state.nodeStates.filter(n => n.dreamingState > 0).length}`);
});

console.log("\nDream Path Analysis:");
console.log(`Final Web Resonance: ${analysis.webResonance.toFixed(4)}`);
console.log(`Active Dream Nodes: ${analysis.activeNodes}`);
console.log(`Average Dream Connections: ${analysis.averageConnections}`);

console.log("\nSignificant Dream Paths:");
analysis.dreamPaths
    .filter(path => path.occurrences > 2)
    .sort((a, b) => b.averageStrength - a.averageStrength)
    .forEach(path => {
        console.log(`\nNodes ${path.nodes.join(' & ')}:`);
        console.log(`    Occurrences: ${path.occurrences}`);
        console.log(`    Average Strength: ${path.averageStrength.toFixed(4)}`);
        console.log(`    Average Resonance: ${path.averageResonance.toFixed(4)}`);
    });
