const loaderUtils = require('loader-utils')
const fs = require('fs')
const path = require('path')

 
module.exports = function (remainingRequest, precedingRequest, data) {
	this.clearDependencies();
	return "module.export = " + remainingRequest;
}
