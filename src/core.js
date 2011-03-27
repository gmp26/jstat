/**
 * @fileOverview
 * jStat - Statistical Library
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 */
(function(Math, window, undefined) {

/**
 * javascript statistical package
 * @version 0.2
 */
var jstat = {

	/**
	 * sum of an array
	 * @return {Number}
	 * @param {Array} arr
	 * @example
	 * jstat.sum([1,2,3])
	 */
	sum : function(arr) {
		var sum = 0,
			i = arr.length;
		while (--i >= 0) {
			sum += arr[i];
		};
		return sum;
	},

	/**
	 * minimum value of an array
	 * @return {Number}
	 * @param {Array} arr
	 * @example
	 * jstat.min([1,2,3])
	 */
	min : function(arr) {
		return Math.min.apply(null, arr);
	},

	/**
	 * maximum value of an array
	 * @return {Number}
	 * @param {Array} arr
	 * @example
	 * jstat.max([1,2,3])
	 */
	max : function(arr) {
		return Math.max.apply(null, arr);
	},

	/**
	 * mean value of an array
	 * @return {Number}
	 * @param {Array} arr
	 * @example
	 * jstat.mean([1,2,3])
	 */
	mean : function(arr) {
		return jstat.sum(arr) / arr.length;
	},

	/**
	 * median of an array
	 * @return {Number}
	 * @param {Array} arr
	 * @example
	 * jstat.median([1,2,3,4,5,6])
	 */
	median : function(arr) {
		var arrlen = arr.length,
			_arr = arr.slice().sort(arrSortF);

		// check if array is even or odd, then return the appropriate
		return !(arrlen & 1) ? (_arr[(arrlen / 2) - 1] + _arr[(arrlen / 2)]) / 2 : _arr[Math.floor(arrlen / 2)];
	},

	/**
	 * mode of an array
	 * @return {Number}
	 * @param {Array} arr
	 * @example
	 * jstat.mode([1,2,2,3,3,3,3])
	 */
	mode : function(arr) {
		var arrLen = arr.length,
			_arr = arr.slice().sort(arrSortF),
			count = 1,
			maxCount = 0,
			numMaxCount = 0,
			i = 0,
			maxNum;
		for (; i < arrLen; i++) {
			if (_arr[i] === _arr[i + 1]) {
				count++;
			} else {
				if (count > maxCount) {
					maxNum = _arr[i];
					maxCount = count;
					count = 1;
					numMaxCount = 0;
				} else {
					// are there multiple max counts
					if (count === maxCount) {
						numMaxCount++;
					// count is less than max count, so reset values
					} else {
						count = 1;
					};
				};
			};
		};
		
		return (numMaxCount === 0) ? maxNum : false;
	},

	/**
	 * range of an array
	 * @return {Number}
	 * @param {Array} arr
	 * @example
	 * jstat.range([1,6,5,3,8,6])
	 */
	range : function(arr) {
		var _arr = arr.slice().sort(arrSortF);
		return _arr[_arr.length - 1] - _arr[0];
	},

	/**
	 * variance of an array
	 * @return {Number}
	 * @param {Array} arr
	 * @example
	 * jstat.variance([1,6,8,5,4,9,5,3])
	 */
	variance : function(arr) {
		var mean = jstat.mean(arr),
			stSum = 0,
			i = arr.length - 1;
		for(; i >= 0; i--){
			stSum += Math.pow((arr[i] - mean), 2);
		};
		return stSum / (arr.length - 1);
	},

	/**
	 * standard deviation of an array
	 * @return {Number}
	 * @param {Array} arr
	 * @example
	 * jstat.stdev([4,5,9,7,5,3,4])
	 */
	stdev : function(arr) {
		return Math.sqrt(jstat.variance(arr));
	},

	/**
	 * mean deviation (mean absolute deviation) of an array
	 * @return {Number}
	 * @param {Array} arr
	 * @example
	 * jstat.meandev([4,9,8,6,5,3,7,5])
	 */
	meandev : function(arr) {
		var devSum = 0,
			mean = jstat.mean(arr),
			i = arr.length - 1;
		for (; i >= 0; i--) {
			devSum += Math.abs(arr[i] - mean);
		};
		return devSum / arr.length;
	},

	/**
	 * median deviation (median absolute deviation) of an array
	 * @return {Number}
	 * @param {Array} arr
	 * @example
	 * jstat.meddev([4,9,8,6,5,3,7,5])
	 */
	meddev : function(arr) {
		var devSum = 0,
			median = jstat.median(arr),
			i = arr.length - 1;
		for (; i >= 0; i--) {
			devSum += Math.abs(arr[i] - median);
		};
		return devSum / arr.length;
	},

	/**
	 * factorial of n
	 * @return {Number}
	 * @param {Number} n
	 * @example
	 * jstat.factorial(5)
	 */
	factorial : function(n) {
		var fval = 1;
		if (n < 0) return NaN;
		if (n != Math.floor(n)) return jstat.gamma(n + 1);
		for(; n > 0; n--){
			fval *= n;
		};
		return fval;
	},

	/**
	 * combinations of n,m
	 * @return {Number}
	 * @param {Number} n
	 * @param {Number} m
	 * @example
	 * jstat.combination(10,4)
	 */
	combination : function(n, k) {
		return (jstat.factorial(n) / jstat.factorial(k)) / jstat.factorial(n - k);
	},

	/**
	 * permutations of n,m
	 * @return {Number}
	 * @example
	 * jstat.permutation(10,4)
	 */
	permutation : function(n ,r) {
		return jstat.factorial(n) / jstat.factorial(n - r);
	},

	/**
	 * gamma of x
	 * @return {Number}
	 * @param {Number} x
	 * @example
	 * jstat.gamma(.5)
	 */
	gamma : function(x) {
		var v = 1,
			w;
		if (x == Math.floor(x)) return jstat.factorial(x - 1);
		while(x < 8){
			v *= x;
			x++;
		};
		w = 1 / (x * x);
		return Math.exp((((((((-3617 / 122400 * w + 7 / 1092) * w - 691 / 360360) * w + 5 / 5940) * w - 1 / 1680)  * w + 1 / 1260) * w - 1 / 360) * w + 1 / 12) / x + 0.5 * Math.log(2 * Math.PI) - Math.log(v) - x + (x - 0.5) * Math.log(x));
	},

	/**
	 * quartiles of an array
	 * @return {Array}
	 * @param {Array} arr
	 * @example
	 * jstat.quartiles([1,2,3,6,9,3,1,2,5])
	 */
	quartiles : function(arr) {
		var arrlen = arr.length,
			_arr = arr.slice().sort(arrSortF);
		return [_arr[Math.round((arrlen) / 4) - 1], _arr[Math.round((arrlen) / 2) - 1], _arr[Math.round((arrlen) * 3 / 4) - 1]];
	},

	/**
	 * covariance of two arrays
	 * @return {Number}
	 * @param {Array} arr1
	 * @param {Array} arr2
	 * @example
	 * jstat.covariance([1,2,3,6,9,3,1,2,5],[2,3,5,2,5,7,8,9,6])
	 */
	covariance : function(arr1, arr2) {
		var u = jstat.mean(arr1),
			v = jstat.mean(arr2),
			sq_dev = [],
			arr1Len = arr1.length,
			i = 0;
		for (; i < arr1Len; i++) {
			sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);
		};
		return jstat.sum(sq_dev) / arr1Len;
	},

	/**
	 * correlation coefficient of two arrays
	 * @return {Number}
	 * @param {Array} arr1
	 * @param {Array} arr2
	 * @example
	 * jstat.corrcoeff([1,2,3,6,9,3,1,2,5], [2,3,5,2,5,7,8,9,6])
	 */
	corrcoeff : function(arr1, arr2) {
		return jstat.covariance(arr1, arr2) / jstat.stdev(arr1) / jstat.stdev(arr2);
	},

	/**
	 * probability of (x < .5) of uniform distibution with parameters 0, 2
	 * @return {Number}
	 * @param {Number} a
	 * @param {Number} b
	 * @param {Number} x
	 * @example
	 * jstat.uniformcdf(0, 2, .5)
	 */
	uniformcdf : function(a, b, x) {
		if (x < a) {
			return 0;
		} else if (x < b) {
			return (x - a) / (b - a);
		};
		return 1;
	},

	/**
	 * probability of (x = 2) of binomial distribution of 5 trials with probability 1/2
	 * @return {Number}
	 * @param {Number} n
	 * @param {Number} p
	 * @param {Number} k
	 * @example
	 * jstat.binomial(5, 1/2, 2)
	 */
	binomial : function(n, p, k) {
		return jstat.combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
	},

	/**
	 * probability of (x <= 2) of binomial distribution of 5 trials with probability 1/2
	 * @return {Number}
	 * @param {Number} n
	 * @param {Number} p
	 * @param {Number} x
	 * @example
	 * jstat.binomialcdf(5, 1/2, 2)
	 */
	binomialcdf : function(n, p, x) {
		var binomarr = [],
			k = 0,
			i = 0,
			sum = 0;
		if (x < 0) {
			return 0;
		};
		for (; k < n; k++) {
			binomarr[k] = jstat.binomial(n, p, k);
		};
		if (x < n) {
			for (; i <= x; i++) {
				sum += binomarr[i];
			};
			return sum;
		};
		return 1;
	},

	/**
	 * probability of exactly 1 success before 2nd failure of an event with probability 1/2
	 * @return {Number}
	 * @param {Number} r
	 * @param {Number} p
	 * @param {Number} x
	 * @example
	 * jstat.negbin(2, 1/2, 1)
	 */
	negbin : function(r, p, x) {
		if (x != Math.floor(x)) {
			return false;
		};
		if (x < 0) {
			return 0;
		};
		return jstat.combination(x + r - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, x);
	},

	/**
	 * probability of 1 success or less before 2nd failure of an event with probability 1/2
	 * @return {Number}
	 * @param {Number} n
	 * @param {Number} p
	 * @param {Number} x
	 * @example
	 * jstat.negbincdf(2, 1/2, 1)
	 */
	negbincdf : function(n, p, x) {
		var sum = 0,
			k = 0;
		if (x < 0) {
			return 0;
		};
		for (; k <= x; k++) {
			sum += jstat.negbin(n, p, k);
		};
		return sum;
	},

	/**
	 * probability of selecting 5 items of a type from 50 items in 10 trials if 25 items are of the type
	 * @return {Number}
	 * @param {Number} N Number of total items
	 * @param {Number} m Number of specific item type
	 * @param {Number} n Number of trials
	 * @param {Number} x Number of items selected
	 * @example
	 * jstat.hypgeom(50, 25, 10, 5)
	 */
	hypgeom : function(N, m, n, x){
		return (x != Math.floor(x)) ? false : (x < 0) ? 0 : jstat.combination(m, x) * jstat.combination((N - m), n - x) / jstat.combination(N, n);
	},

	/**
	 * probability of selecting 5 or less items of a type from 50 items in 10 trials if 25 items are of the type
	 * @return {Number}
	 * @param {Number} N Number of total items
	 * @param {Number} m Number of specific item type
	 * @param {Number} n Number of trials
	 * @param {Number} x Number of items selected
	 * @example
	 * jstat.hypgeomcdf(50, 25, 10, 5)
	 */
	hypgeomcdf : function(N, m, n, x) {
		var sum = 0,
			k = 0;
		if (x < 0) {
			return 0;
		};
		for (; k <= x; k++) {
			sum += jstat.hypgeom(N, m, n, k);
		};
		return sum;
	},

	/**
	 * probability an exponentially distributed variable with parameter (l = .5) is less than 2
	 * @return {Number}
	 * @param {Number} l
	 * @param {Number} x
	 * @example
	 * jstat.exponentialcdf(.5, 2)
	 */
	exponentialcdf : function(l, x) {
		return 1 - Math.exp(-x);
	},

	/**
	 * probability a possion variable with parameter (l = 2) is less than or equal to 3
	 * @return {Number}
	 * @param {Number} l
	 * @param {Number} x
	 * @example
	 * jstat.poisson(2, 3)
	 */
	poisson : function(l, x) {
		return Math.pow(l, x) * Math.exp(-l) / jstat.factorial(x);
	},

	/**
	 * calculate cumulative poisson distribution cumulative probability with parameter (l = 2) is less than or equal to 3
	 * @return {Number}
	 * @param {Number} l
	 * @param {Number} x
	 * @example
	 * jstat.poissoncdf(2, 3)
	 */
	poissoncdf : function(l, x) {
		var sum = 0,
			k = 0;
		if (x < 0) {
			return 0;
		};
		for (; k <= x; k++) {
			sum += jstat.poisson(l, k);
		};
		return sum;
	},
	
	/**
	 * calcualte sum of f(x) from a to b
	 * @return {Number}
	 * @param {Function} func
	 * @param {Number} a
	 * @param {Number} b
	 * @example
	 * jstat.sumFunc(function(x) { return x; }, 0, 10)
	 */
	sumFunc : function(func, a, b) {
		var sum = 0;
		while (a <= b) {
			sum += func(a);
			a++;
		};
		return sum;
	}
},

// array sort function
arrSortF = function(a, b) { return a - b; };

// exposing jstat
window.jstat = jstat;

// passing this for Node.js modules compatibility
})(Math, this);