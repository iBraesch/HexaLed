function Effect(name) {
    this.name = name;
    this.param = {};
}

Effect.prototype.start = function() {console.log('start - Not implemented')};
Effect.prototype.pause = function() {console.log('pause - Not implemented')};
Effect.prototype.stop = function() {console.log('stop - Not implemented')};
Effect.prototype.updateParameters = function() {console.log('updateParameters - Not implemented')};