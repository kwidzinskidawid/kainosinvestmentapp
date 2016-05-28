'use strict';

invApp
	.controller('ImportCtrl', function(RateService, $scope) {

		$scope.authorize = function() {
			RateService.authorize({}, $scope.password, function (res) {
				$scope.authorized = true;
				$scope.msg = undefined;
			}, function (error) {
				$scope.msg = "Bad password.";
			});
		};
		
		$scope.upload = function () {
			if ($("#upload").val() == '') {
				$scope.msg = "Please select file.";
				return;
			}
			
			var patt = new RegExp(".csv$");
			if(!patt.test($("#upload").val())){
				$scope.msg = "Only .csv files are accepted.";
				return;
			}

			$scope.msg = undefined;
			$scope.importing = true;
			RateService.uploadRates({}, new FormData($("#uploadFileForm")[0]), function (res) {
				$scope.importing = false;
				$scope.msg = "Data successfully imported.";
			}, function (error) {
				$scope.importing = false;
				$scope.msg = "Error while importing data.";
			});
		}
		
	});