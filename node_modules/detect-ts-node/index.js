var detectTSNode = false;

try {
    if (process[Symbol.for("ts-node.register.instance")]) {
        detectTSNode = true;
    }
} finally {
    module.exports = detectTSNode;
}
