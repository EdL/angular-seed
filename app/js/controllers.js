'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
	controller('NavBarCtrl', ['$scope', '$location', function($scope, $location, $http) {
		$scope.isCollapsed = true;

		$scope.isActive = function (viewLocation) { 
	        return viewLocation === $location.path();
	    }
	}])
	.controller('MyCtrl1', ['$scope', '$http', '$log', function($scope, $http, $log) {
		$scope.url = 'http://www.url.com/';
		$scope.jsonpUrl = 'http://angularjs.org/greet.php?callback=JSON_CALLBACK&name=Super%20Hero';
		$scope.param = 'param1'
		$scope.id = '123';

		$scope.buttonClickGet = function() {
			$log.info('buttonClickGet()');

			$http({method: 'GET', url: $scope.url})
				.success(function(data, status) {
					$scope.statusGet = status;
					$scope.dataGet = data;
					$log.info('SUCCESS');
				})
				.error(function(data, status) {
					$scope.dataGet = data || "Request failed";
					$scope.statusGet = status;
					$log.error('ERROR');
				});
		};

		$scope.buttonClickJsonp = function() {
			$log.info('buttonClickJsonp()');

			$http({method: 'JSONP', url: $scope.jsonpUrl})
				.success(function(data, status) {
					$scope.statusJsonp = status;
					$scope.dataJsonp = data;
					$log.info('SUCCESS');
				})
				.error(function(data, status) {
					$scope.dataJsonp = data || "Request failed";
					$scope.statusJsonp = status;
				});
		};

		$scope.buttonClickGetArray = function() {
			$log.info('buttonClickGetArray()');

			$http({method: 'GET', url: $scope.url})
				.success(function(data, status) {
					$scope.statusArray = status;
					$scope.dataArray = data;
					$log.info('SUCCESS');
				})
				.error(function(data, status) {
					// $scope.dataArray = data || "Request failed";
					$log.error('ERROR');
					$scope.statusArray = status;
					$log.error('ERROR',data);
				});
		};

		// $scope.buttonClickPost = function() {
		// };

		// $scope.buttonClickDelete = function() {
		// };

	}])
	.controller('MyCtrl2', ['$scope', '$timeout', '$http', '$log', function($scope, $timeout, $http, $log) {
		$scope.pollingStarted = false;
		$scope.url = 'http://angularjs.org/greet.php?callback=JSON_CALLBACK&name=Super%20Hero';//'api.url.com';
		$scope.symbol = 'AAPL';
		
		$scope.webSocketStarted = false;
		$scope.message = 'Hello!';
		$scope.messageReceived = '';
		$scope.webSocket = null;
		$scope.webSocketUrl = 'ws://echo.websocket.org';

		$scope.buttonClickStartPolling = function() {
			$log.info('buttonClickStartPolling()');
			$scope.pollingStarted = true;
			$scope.poll();
		};

		$scope.poll = function() {
			if ($scope.pollingStarted) {
				$http({method: 'JSONP', url: $scope.url})
					.success(function(data, status) {
						$scope.status = status;
						$scope.data = data;
						$log.info('SUCCESS');
						$timeout($scope.poll, 3000);
					})
					.error(function(data, status) {
						$scope.error = data || "Request failed";
						$log.error('ERROR');
						$scope.statusArray = status;
						$log.error('ERROR',$scope.error);
					});
			};
		};


		$scope.buttonClickStopPolling = function() {
			$log.info('buttonClickStopPolling()');
			$scope.pollingStarted = false;
		};


		$scope.buttonClickStartWebSocket = function() {
			$log.info('buttonClickStartWebSocket()');
			$scope.webSocketStarted = true;
			$scope.webSocket = new WebSocket($scope.webSocketUrl);

			$scope.webSocket.onopen = function() {
				$log.info('onopen - Socket established');
				$scope.$apply();
			}

			$scope.webSocket.onmessage = function(message) {
				$log.info('onmessage - message received: ', message.data);
				$scope.messageReceived = message.data;
				$scope.$apply();
			}

			$scope.webSocket.onerror = function() {
				$log.error('onerror');
				$scope.$apply();
			}

			$scope.webSocket.onclose = function() {
				$log.info('onclose - Socket closed');
				$scope.webSocketStarted = false;
				$scope.$apply();
			}
		};


		$scope.buttonClickStopWebSocket = function() {
			$log.info('buttonClickStopWebSocket()');
			$scope.webSocket.close();
		};

		$scope.buttonClickSendMessageWebSocket = function() {
			$log.info('buttonClickSendMessageWebSocket(): ' + $scope.message);
			$scope.webSocket.send($scope.message);
		};

		

		
	}]);


