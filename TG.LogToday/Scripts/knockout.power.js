/**********************************************************************************
* knockout.power v0.1.0 (http://kodefuguru.com/knockoutpower)
* Copyright 2014 Chris Eargle
* Licensed under http://kodefuguru.com/knockoutpower/license
**********************************************************************************/

(function() {
  var CombinedSubscribable, CombinedSubscription;

  CombinedSubscribable = (function() {
    function CombinedSubscribable(left, right) {
      this.left = left;
      this.right = right;
    }

    CombinedSubscribable.prototype.extend = function(requestedExtenders) {
      this.left.extend(requestedExtenders);
      this.right.extend(requestedExtenders);
      return this;
    };

    CombinedSubscribable.prototype.notifySubscribers = function(valueToWrite, event) {
      this.left.notifySubscribers(valueToWrite, event);
      return this.right.notifySubscribers(valueToWrite, event);
    };

    CombinedSubscribable.prototype.getSubscriptionsCount = function() {
      return this.left.getSubscriptionsCount() + this.right.getSubscriptionsCount();
    };

    CombinedSubscribable.prototype.once = function(callback, target, event) {
      var composed, subscription;
      composed = function(newValue) {
        subscription.dispose();
        return callback(newValue);
      };
      return subscription = new CombinedSubscription(this.left.once(composed, target, event), this.right.once(composed, target, event));
    };

    CombinedSubscribable.prototype.or = function(other) {
      return new CombinedSubscribable(this, other);
    };

    CombinedSubscribable.prototype.subscribe = function(callback, target, event) {
      var a, b;
      a = this.left.subscribe(callback, target, event);
      b = this.right.subscribe(callback, target, event);
      return new CombinedSubscription(a, b);
    };

    return CombinedSubscribable;

  })();

  CombinedSubscription = (function() {
    function CombinedSubscription(left, right) {
      this.left = left;
      this.right = right;
    }

    CombinedSubscription.prototype.dispose = function() {
      this.left.dispose();
      return this.right.dispose();
    };

    return CombinedSubscription;

  })();

  ko.subscribable.fn['once'] = function(callback, target, event) {
    var composed, subscription;
    composed = function(newValue) {
      subscription.dispose();
      return callback(newValue);
    };
    return subscription = this.subscribe(composed, target, event);
  };

  ko.subscribable.fn['or'] = function(other) {
    return new CombinedSubscribable(this, other);
  };

}).call(this);

//# sourceMappingURL=knockout.power.js.map
