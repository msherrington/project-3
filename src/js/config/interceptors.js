angular
 .module('skillsApp')
 .config(Interceptors);

Interceptors.$inject = ['$httpProvider'];
function Interceptors($httpProvider){
  $httpProvider.interceptors.push('ErrorHandler');
}
