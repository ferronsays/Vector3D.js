Vector3D = (function() {
    var name, _fn, _i, _len, _ref;
    _ref = ['add', 'subtract', 'multiply', 'divide'];
    _fn = function(name) {
        return Vector3D[name] = function(a, b) {
            return a.copy()[name](b);
        };
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        _fn(name);
    }

    function Vector3D(x, y, z) {
        var _ref;
        if (x == null) {
            x = 0;
        }
        if (y == null) {
            y = 0;
        }
        if (z == null) {
            z = 0;
        }
        _ref = [x, y, z], this.x = _ref[0], this.y = _ref[1], this.z = _ref[2];
    }
    Vector3D.prototype.copy = function() {
        return new Vector3D(this.x, this.y, this.z);
    };
    Vector3D.prototype.magnitude = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    Vector3D.prototype.normalize = function() {
        var m;
        m = this.magnitude();
        if (m > 0) {
            this.divide(m);
        }
        return this;
    };
    Vector3D.prototype.limit = function(max) {
        if (this.magnitude() > max) {
            this.normalize();
            return this.multiply(max);
        } else {
            return this;
        }
    };
    Vector3D.prototype.heading = function() {
        return -1 * Math.atan2(-1 * this.y, this.x);
    };
    Vector3D.prototype.eucl_distance = function(other) {
        var dx, dy, dz;
        dx = this.x - other.x;
        dy = this.y - other.y;
        dz = this.z - other.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };
    Vector3D.prototype.distance = function(other, dimensions) {
        var dx, dy, dz;
        if (dimensions === null) {
            dimensions = false;
        }
        dx = Math.abs(this.x - other.x);
        dy = Math.abs(this.y - other.y);
        dz = Math.abs(this.z - other.z);
        if (dimensions) {
            dx = dx < dimensions.width / 2 ? dx : dimensions.width - dx;
            dy = dy < dimensions.height / 2 ? dy : dimensions.height - dy;
        }
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };
    Vector3D.prototype.subtract = function(other) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    };
    Vector3D.prototype.add = function(other) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    };
    Vector3D.prototype.divide = function(n) {
        var _ref;
        _ref = [this.x / n, this.y / n, this.z / n], this.x = _ref[0], this.y = _ref[1], this.z = _ref[2];
        return this;
    };
    Vector3D.prototype.multiply = function(n) {
        var _ref;
        _ref = [this.x * n, this.y * n, this.z * n], this.x = _ref[0], this.y = _ref[1], this.z = _ref[2];
        return this;
    };
    Vector3D.prototype.dot = function(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    };
    Vector3D.prototype.projectOnto = function(other) {
        return other.copy().multiply(this.dot(other));
    };
    Vector3D.prototype.wrapRelativeTo = function(location, dimensions) {
        var a, d, key, map_d, v, _ref;
        v = this.copy();
        _ref = {
            x: "width",
            y: "height"
        };
        for (a in _ref) {
            key = _ref[a];
            d = this[a] - location[a];
            map_d = dimensions[key];
            if (Math.abs(d) > map_d / 2) {
                if (d > 0) {
                    v[a] = (map_d - this[a]) * -1;
                } else {
                    v[a] = this[a] + map_d;
                }
            }
        }
        return v;
    };
    Vector3D.prototype.invalid = function() {
        return (this.x === Infinity) || isNaN(this.x) || this.y === Infinity || isNaN(this.y) || this.z === Infinity || isNaN(this.z);
    };
    return Vector3D;
})();
